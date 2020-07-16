from django.urls import path, include
from . import api

from rest_framework import routers

router = routers.DefaultRouter()
# router.register('api/users', api.UsersListView)

urlpatterns = [
    path('', include(router.urls)),
    # path('api/auth/register', api.RegisterAPI.as_view()),
]
