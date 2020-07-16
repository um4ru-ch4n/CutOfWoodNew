from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class AccountManager(BaseUserManager):
    def create_user(self, username, email, first_name="", last_name="", patronymic="", phone_number="", instagram="", password=None):
        if not email:
            raise ValueError("Users must have an email address")
        if not username:
            raise ValueError("Users must have an username")
        
        user = self.model(
            email=self.normalize_email(email),
            username=username,
            first_name=first_name,
            last_name=last_name,
            patronymic=patronymic,
            phone_number=phone_number,
            instagram=instagram,
            )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            password=password,
            )

        user.is_staff = True
        user.is_superuser = True
        user.is_admin = True
        user.save(using=self._db)
        return user

class Account(AbstractBaseUser):
    # Necessaruy fields
    id = models.AutoField(primary_key=True)
    email = models.EmailField('Email пользователя', max_length=100, unique=True)
    username = models.CharField('Никнейм пользователя', max_length=30, unique=True)
    date_joined = models.DateTimeField('Дата регистрации', auto_now_add=True)
    last_login = models.DateTimeField('Дата последней авторизации', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    # Custom fields
    first_name = models.CharField('Имя пользователя', max_length = 50, blank=True)
    last_name = models.CharField('Фамилия пользователя', max_length = 50, blank=True)
    patronymic = models.CharField('Отчество пользователя', max_length = 50, blank=True)
    phone_number = models.CharField('Номер телефона', max_length=15, blank=True)
    instagram = models.CharField('Instagram', max_length=50, blank=True)
	
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = AccountManager()
    
    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'