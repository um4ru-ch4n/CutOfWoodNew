from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from . import api

from rest_framework import routers

router = routers.DefaultRouter()
router.register('api/categories', api.CategoryViewSet, basename='category'),
router.register('api/products', api.ProductViewSet, basename='product'),
router.register('api/photos', api.PhotoViewSet, basename='photo'),
router.register('api/carts', api.CartViewSet, basename='cart'),

urlpatterns = [
    path('', include(router.urls)),
    path('api/cart/', api.CartViewSet.as_view({
        'get': 'retrieve', 
        'post': 'update'
    })),
]
