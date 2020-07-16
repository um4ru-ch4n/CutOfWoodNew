from django.urls import path, include
from . import api
from knox import views as knox_views


urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', api.RegisterAPI.as_view()),
    path('api/auth/login', api.LoginAPI.as_view()),
    path('api/auth/user', api.UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
]