from django.shortcuts import get_object_or_404
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import Category, Product, Photo, Cart, OrderStatus, Order
from .serializers import CategoryListSerializer, CategoryDetailSerializer, ProductSerializer, PhotoSerializer, CartSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_serializer_class(self):
        if self.action == 'list':
            return CategoryListSerializer
        elif self.action == 'retrieve':
            return CategoryDetailSerializer

    def list(self, request):
        queryset = Category.objects.all()
        serializer = self.get_serializer_class()(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Category.objects.all()
        category = get_object_or_404(queryset, id=pk)
        serializer = self.get_serializer_class()(category)
        return Response(serializer.data)


class ProductViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = ProductSerializer

    queryset = Product.objects.all()


class PhotoViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = PhotoSerializer

    queryset = Photo.objects.all()

class CartViewSet(viewsets.ModelViewSet):
    def get_permissions(self):
        if self.action == 'list':
            # permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

    serializer_class = CartSerializer

    def list(self, request):
        queryset = Cart.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Cart.objects.all()
        cart = get_object_or_404(queryset, id=request.user.cart.id)
        serializer = self.serializer_class(cart)
        return Response(serializer.data)

    # TODO: Не изменяется цена и дата последнег изменения корзины
    def update(self, request, pk=None):
        queryset = Cart.objects.all()
        instance = get_object_or_404(queryset, id=request.user.cart.id)
        price = sum([Product.objects.get(id=prodPrice).price for prodPrice in request.data["products"]])
        updatedCart = self.serializer_class(instance=instance, data=request.data, partial=True)
        updatedCart.is_valid(raise_exception=True)
        cart = updatedCart.save(price=price)

        return Response(CartSerializer(cart, context=self.get_serializer_context()).data)