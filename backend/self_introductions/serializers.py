# todos/serializers.py
from rest_framework import serializers
from .models import Profile, User

# 認証系
from rest_framework_jwt.settings import api_settings


# 認証系

class UserMiniSerializer(serializers.ModelSerializer):
    # followings_count = serializers.SerializerMethodField()
    # followers_count = serializers.SerializerMethodField()
    # is_following = serializers.SerializerMethodField()
    class Meta:
        fields = (
            'id',
            'hobby',
            'talent',
            'born',
            'job',
            'twitter',
            'instagram',
            'facebook',
            'followings_count',
            'followers_count',
            # 'is_following',
        )
        model = User

    def get_followings_nums(self, obj):
        return obj.get_followings_nums()

    def get_followers_nums(self, obj):
        return obj.get_followers_nums()

    def get_is_following(self, obj):
        user = self.context['request'].user

        return obj in user.get_followings()
        # if user.is_authenticated:
        #     return obj in user.get_followings()
        # else:
        #     return False


class UserSerializer(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password')

# serializers


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        # APIとして出力するデータ
        fields = '__all__'
        # 参照モデル
        model = Profile
