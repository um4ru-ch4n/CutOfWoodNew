from django import forms
from django.contrib import admin
from ckeditor_uploader.widgets import CKEditorUploadingWidget

from .models import Category, Product, Photo, Cart, OrderStatus, Order

class CategoryAdminForm(forms.ModelForm):
    description = forms.CharField(label="Описание", widget=CKEditorUploadingWidget())

    class Meta:
        model = Category
        fields = '__all__'


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "title")
    list_display_links = ("id", "title")
    save_as = True
    form = CategoryAdminForm
    fieldsets = (
        (None, {
            'fields': ('id', 'title', 'description')
        }),
    )
    readonly_fields = ("id",)

admin.site.register(Product)
admin.site.register(Photo)
admin.site.register(Cart)
admin.site.register(OrderStatus)
admin.site.register(Order)