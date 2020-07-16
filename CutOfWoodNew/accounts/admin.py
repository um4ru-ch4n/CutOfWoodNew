from django.contrib import admin

from .models import Account


@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ("id", "email", "username")
    list_display_links = ("id", "email")
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
