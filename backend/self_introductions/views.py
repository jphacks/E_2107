from rest_framework import viewsets, generics, filters, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import User, Follow
from .serializers import UserSerializer, UserMiniSerializer

# Create your views here.

# 従来
# class ListUsers(generics.ListCreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
# class DetailUser(generics.RetrieveUpdateDestroyAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

# 最新
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # lookup_field = 'name' # pk以外で検索したい場合

    def follow(self, request):
        owner = request.user
        follow_target = self.get_object()

        if owner == follow_target:
            return Response({'errors': ['You cannot follow your account']}, status=status.HTTP_400_BAD_REQUEST)
        
        obj, created = Follow.objects.get_or_create(owner=owner, follow_target=follow_target)

        if (created):
            return Response({'data': ['Follow successfully']})
        else:
            return Response({'errors': ['You already follow']}, status=status.HTTP_400_BAD_REQUEST)

    
    def unfollow(self, request):
        owner = request.user
        follow_target = self.get_object()

        if owner == follow_target:
            return Response({'errors': ['You cannot unfollow your account']}, status=status.HTTP_400_BAD_REQUEST)
        
        if not Follow.objects.filter(owner=owner, follow_target=follow_target).exists():
            return Response({'errors': {"You aren't following that account"}})

        Follow.objects.get(owner=owner, follow_target=follow_target).delete()
        return Response({'data': ['Unfollow successfully']}, )


    # フォローしている人を取得
    def followings(self, request):
        users = self.get_object().get_followings()
        serializer = UserMiniSerializer(users, many=True, context={'request': request})

        return Response(serializer.data)

    # フォロワーを取得(使う予定はないかも)
    def followers(self, request):
        users = self.get_object().get_followers()
        serializer = UserMiniSerializer(users, many=True, context={'request': request})

        return Response(serializer.data)
