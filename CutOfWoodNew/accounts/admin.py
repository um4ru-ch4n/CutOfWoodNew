from django.contrib import admin

from .models import Account

import sys
sys.path.append('../')
from products.models import Cart, Order

admin.site.site_header = 'CutOfWood'
admin.site.site_title = 'CutOfWood'


class CartInline(admin.StackedInline):
    model = Cart
    extra = 0
    can_delete = False

class OrderInline(admin.TabularInline):
    model = Order
    extra = 0
    fields = ('id', 'products', 'price', 'status', 'order_date')
    readonly_fields = ('order_date',)
    


@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    """ Класс для отображения информации о пользователях в админе """

    list_display = ("id", "email", "username")
    list_display_links = ("id", "email")
    inlines = [CartInline, OrderInline]
    fieldsets = (
        ('User info', {
            'fields': ('id', 'email', 'username', ('first_name', 'last_name', 'patronymic'), 'phone_number', 'instagram')
        }),
        ('Advanced options', {
            'classes': ('collapse',),
            'fields': (('date_joined', 'last_login'), ('is_admin', 'is_active', 'is_staff', 'is_superuser')),
        }),
    )
    readonly_fields = ("id", "email", "username", "date_joined", "last_login")
    save_on_top = True
