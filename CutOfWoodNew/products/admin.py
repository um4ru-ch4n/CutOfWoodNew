from django import forms
from django.contrib import admin
from django.utils.safestring import mark_safe
from ckeditor_uploader.widgets import CKEditorUploadingWidget

from .models import Category, Product, Photo, Cart, OrderStatus, Order

class ProductsInline(admin.TabularInline):
    """ Отображение товара внутри другого объекта """
    
    model = Product
    extra = 1   # Пустые поля для добавления нового товара
    fieldsets = (
        (None, {
            'fields': ('id', 'title', 'description')
        }),
        (None, {
            'fields': (('preview', 'get_preview'), )
        }),
        (None, {
            'fields': ('price', 'draft')
        }),
    )   # Группы отображаемых полей
    readonly_fields = ('id', 'get_preview')     # Поля только для чтения
    
    def get_preview(self, obj):
        """ Отображение картинки превью """

        return mark_safe(f'<img src={obj.preview.url} width="100" height="110"')
    
    get_preview.short_description = "Превью"    # title картинки превью


class CategoryAdminForm(forms.ModelForm):
    """ Форма для вывода описания категории с редактором ckeditor """

    description = forms.CharField(label="Описание", widget=CKEditorUploadingWidget())

    class Meta:
        model = Category
        fields = '__all__'

class ProductAdminForm(forms.ModelForm):
    """ Форма для вывода описания товара с редактором ckeditor """

    description = forms.CharField(label="Описание", widget=CKEditorUploadingWidget())

    class Meta:
        model = Product
        fields = '__all__'


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """ Администрирование категорий товаров категорий """

    list_display = ("id", "title")
    list_display_links = ("id", "title")
    save_as = True
    form = CategoryAdminForm
    inlines = [ProductsInline]
    fieldsets = (
        (None, {
            'fields': ('id', 'title', 'description')
        }),
    )
    readonly_fields = ("id",)
    save_on_top = True

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    """ Администрирование товаров """

    list_display = ("id", "title", "get_ava", "price", 'draft')
    list_display_links = ("id", "title")
    list_editable = ('draft', )
    save_as = True
    form = ProductAdminForm
    fieldsets = (
        (None, {
            'fields': ('id', 'title', 'description', 'price')
        }),
        (None, {
            'fields': (('preview', 'get_preview'), )
        }),
        (None, {
            'fields': ('category', 'draft')
        }),
    )
    readonly_fields = ("id", "get_preview")
    save_on_top = True

    def get_preview(self, obj):
        return mark_safe(f'<img src={obj.preview.url} width="100" height="110"')
    
    def get_ava(self, obj):
        return mark_safe(f'<img src={obj.preview.url} width="50" height="60"')
    
    get_preview.short_description = "Превью"
    get_ava.short_description = "Превью"

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)  # Сохраняем модель товара

        if "price" in form.changed_data:        # Если изменили цену товара
            for cart in Cart.objects.all():     # Перебираем все корзины
                if obj in cart.products.all():  # Если данный товар есть в корзине
                    cart.price = sum([prodPrice.price for prodPrice in cart.products.all()])    # Пересчитываем стоимость корзины, перебирая цены товаров (в них входит только что обновленный товар)
                    cart.save() # Сохраняем изменения в корзине

@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    """ Администрирование фото """

    list_display = ("id", "title", "product", "get_ava")
    list_display_links = ("id", "title")
    save_as = True
    fieldsets = (
        (None, {
            'fields': ('id', 'title', 'description')
        }),
        (None, {
            'fields': (('image', 'get_image'), )
        }),
        (None, {
            'fields': ('product',)
        }),
    )
    readonly_fields = ("id", "get_image")
    save_on_top = True

    def get_image(self, obj):
        return mark_safe(f'<img src={obj.image.url} width="200" height="220"')
    
    def get_ava(self, obj):
        return mark_safe(f'<img src={obj.image.url} width="50" height="60"')
    
    get_image.short_description = "Картинка"
    get_ava.short_description = "Картинка"

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    """ Администрирование корзины """

    list_display = ("id", "user", "price", "last_update")
    list_display_links = ("id", "user")
    fieldsets = (
        (None, {
            'fields': ('id', 'products', 'user', 'price', 'last_update')
        }),
    )
    readonly_fields = ("id", "user", "price")

    def save_model(self, request, obj, form, change):
        if "products" in form.changed_data:
            obj.price = sum([Product.objects.get(id=prodPrice.id).price for prodPrice in form.cleaned_data["products"]])
            super().save_model(request, obj, form, change)

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    """ Администрирование заказов """

    list_display = ("id", "user", "price", "order_date", "status")
    list_display_links = ("id", "user")
    fieldsets = (
        (None, {
            'fields': ('id', 'products', 'user', 'price', 'order_date')
        }),
    )
    readonly_fields = ("id", "user", "price", "order_date")

    def save_model(self, request, obj, form, change):
        if "products" in form.changed_data:
            obj.price = sum([Product.objects.get(id=prodPrice.id).price for prodPrice in form.cleaned_data["products"]])
            super().save_model(request, obj, form, change)

admin.site.register(OrderStatus)