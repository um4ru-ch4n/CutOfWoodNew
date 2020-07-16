from rest_framework import serializers
from .models import Account
from django.contrib.auth import authenticate

# Account Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        exclude = ["last_login", "is_admin", "is_active", "is_staff", "is_superuser"]
        

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'patronymic', 'phone_number', 'instagram', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = Account.objects.create_user(
            validated_data['username'], 
            validated_data['email'], 
            validated_data.get('first_name', ""),
            validated_data.get('last_name', ""),
            validated_data.get('patronymic', ""),
            validated_data.get('phone_number', ""),
            validated_data.get('instagram', ""),
            validated_data['password']
        )

        return user


# Login Serializer
class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Неверные учетные данные")