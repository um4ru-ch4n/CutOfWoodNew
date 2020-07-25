from accounts.models import Account
from django.db import models

from datetime import datetime

import sys
sys.path.append('../')


class Category(models.Model):
    """ Категория товара """

    id = models.AutoField(primary_key=True)
    title = models.CharField('Название категории', max_length=255, unique=True)
    description = models.TextField(
        'Описание категории', default="", blank=True, null=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'


class Product(models.Model):
    """ Товар """

    id = models.AutoField(primary_key=True)
    title = models.CharField('Название товара', max_length=255)
    description = models.TextField(
        'Описание товара', default="", blank=True, null=True)
    price = models.FloatField(
        'Цена товара', help_text="указывать сумму в рублях")
    preview = models.ImageField('Превью', upload_to="productPreviews/")
    category = models.ForeignKey(
        Category, verbose_name="Категория", related_name="products", on_delete=models.SET_NULL, null=True)
    draft = models.BooleanField('Черновик', default=False)
    date_added = models.DateTimeField('Дата добавления', auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'


class Photo(models.Model):
    """ Фото товара """

    id = models.AutoField(primary_key=True)
    title = models.CharField('Название фото', max_length=255)
    description = models.TextField(
        'Описание фото', default="", blank=True, null=True)
    image = models.ImageField('Картинка', upload_to="images/")
    product = models.ForeignKey(
        Product, verbose_name="Товар", related_name="photos", on_delete=models.CASCADE)

    def __str__(self):
        return self.image.url

    class Meta:
        verbose_name = 'Фото товара'
        verbose_name_plural = 'Фото товара'

class Cart(models.Model):
    """ Корзина авторизованного пользователя """

    id = models.AutoField(primary_key=True)
    products = models.ManyToManyField(Product, verbose_name="Товары", related_name="carts", blank=True)
    user = models.OneToOneField(
        Account, verbose_name="Пользователь", on_delete=models.CASCADE)
    price = models.FloatField('Сумма корзины')
    last_update = models.DateTimeField(
        'Последнее изменение', default=datetime.now(), blank=True)

    def __str__(self):
        return self.user.email

    class Meta:
        verbose_name = 'Корзина'
        verbose_name_plural = 'Корзины'

class OrderStatus(models.Model):
    """ Статус заказа """

    id = models.AutoField(primary_key=True)
    title = models.CharField('Название статуса', max_length=255)
    description = models.TextField('Описание статуса', default="", blank=True, null=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Статус'
        verbose_name_plural = 'Статусы'

class Order(models.Model):
    """ Заказ """

    id = models.AutoField(primary_key=True)
    products = models.ManyToManyField(Product, verbose_name="Товары", related_name="orders", blank=True)
    user = models.ForeignKey(Account, verbose_name="Пользователь", related_name="orders", on_delete=models.CASCADE)
    price = models.FloatField('Сумма заказа')
    order_date = models.DateTimeField('Дата заказа', auto_now_add=True)
    status = models.ForeignKey(OrderStatus, verbose_name="Статус заказа", related_name="orders", on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.user.email

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'