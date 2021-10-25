# todos/serializers.py
from rest_framework import serializers
from .models import User # self_introductions/modelのUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'name',
            'email',
            'hobby',
            'talent',
            'born',
            'job',
            'twitter',
            'instagram',
            'facebook',
        )
        model = User



