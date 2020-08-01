from rest_framework import serializers
from .models import Category, Product, Photo, Cart, OrderStatus, Order

from datetime import datetime
import copy


class CategoryListSerializer(serializers.ModelSerializer):
    """ Список всех категорий товаров """

    class Meta:
        model = Category
        fields = ('id', 'title')


class CategoryDetailSerializer(serializers.ModelSerializer):
    """ Информация о конкретной категории """

    products = serializers.SlugRelatedField(
        slug_field="title", read_only=True, many=True)

    class Meta:
        model = Category
        fields = ('id', 'title', 'description', 'products')

# class CategoryCreateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Category
#         fields = '__all__'
#         extra_kwargs = {
#             'description': {
#                 'required': False,
#                 'allow_blank': True
#             }
#         }


class ProductSerializer(serializers.ModelSerializer):
    """ Информация о конкретном товаре """

    category = serializers.SlugRelatedField(slug_field="title", read_only=True)
    photos = serializers.StringRelatedField(read_only=True, many=True)

    class Meta:
        model = Product
        fields = '__all__'


class PhotoSerializer(serializers.ModelSerializer):
    """ Информация о конкретном фото """

    product = serializers.SlugRelatedField(slug_field="title", read_only=True)

    class Meta:
        model = Photo
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    """ Информация о корзинах """

    class Meta:
        model = Cart
        fields = '__all__'

    def update(self, instance, validated_data):
        price = sum([Product.objects.get(id=prodPrice.id).price for prodPrice in validated_data["products"]])
        
        instance.products.set(validated_data.get(
            'products', instance.products))
        instance.price = price
        instance.last_update = datetime.now()
        instance.save()
        return instance

class OrderListSerializer(serializers.ModelSerializer):
    """ Список заказов пользователя """

    status = serializers.SlugRelatedField(slug_field="title", read_only=True)

    class Meta:
        model = Order
        fields = ('id', 'price', 'order_date', 'status')


class OrderDetailSerializer(serializers.ModelSerializer):
    """ Информация о конкретном заказе пользователя """

    status = serializers.SlugRelatedField(slug_field="title", read_only=True)

    class Meta:
        model = Order
        fields = ('id', 'price', 'order_date', 'products', 'status')
        extra_kwargs = {
            'price': {
                'required': False
            }
        }

    def create(self, validated_data):
        price = sum([Product.objects.get(id=prodPrice.id).price for prodPrice in validated_data["products"]])
        newOrderData = {
            "price": price, 
            "order_date": datetime.now(),
            "status": OrderStatus.objects.get(title="В обработке"),
            "user": validated_data["user"]
        }

        newOrder = Order.objects.create(**newOrderData)
        newOrder.products.set(validated_data.get("products", []))
        newOrder.save()

        return newOrder