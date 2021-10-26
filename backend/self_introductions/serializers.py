# todos/serializers.py
from rest_framework import serializers
from .models import User # self_introductions/modelのUser

class UserMiniSerializer(serializers.ModelSerializer):
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
            'followings_count',
            'followers_count',
        )
        model = User

class UserSerializer(serializers.ModelSerializer):

    # followings_count = serializers.SerializerMethodField()
    # followers_count = serializers.SerializerMethodField()
    # is_following = serializers.SerializerMethodField()
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



