from .serializers import UserSerializer, UserMiniSerializer
from .models import User, Follow
from rest_framework.decorators import action
from rest_framework import viewsets, generics, filters, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import permissions, status
from rest_framework import generics, viewsets
from django.http import HttpResponseRedirect
from .serializers import ProfileSerializer, UserSerializer
from .models import Profile


# DRF


# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # lookup_field = 'name' # pk以外で検索したい場合

    # @action(detail=True)
    # def test():
    #     pass

    # 多分OK?
    @action(detail=True)
    def follow(self, request, pk):
        owner = request.user
        follow_target = self.get_object()

        if owner == follow_target:
            return Response({'errors': ['You cannot follow your account']}, status=status.HTTP_400_BAD_REQUEST)

        obj, created = Follow.objects.get_or_create(
            owner=owner, follow_target=follow_target)

        if (created):
            return Response({'data': ['Follow successfully']})
        else:
            return Response({'errors': ['You already follow']}, status=status.HTTP_400_BAD_REQUEST)

    # 多分OK?
    @action(detail=True)
    def unfollow(self, request, pk):
        owner = request.user
        follow_target = self.get_object()

        if owner == follow_target:
            return Response({'errors': ['You cannot unfollow your account']}, status=status.HTTP_400_BAD_REQUEST)

        if not Follow.objects.filter(owner=owner, follow_target=follow_target).exists():
            return Response({'errors': {"You aren't following that account"}})

        Follow.objects.get(owner=owner, follow_target=follow_target).delete()
        return Response({'data': ['Unfollow successfully']}, )

    # フォローしている人を取得
    # TODO 分からない

    @action(detail=True)
    def followings(self, request, pk):
        users = self.get_object().get_followings()
        serializer = UserMiniSerializer(
            users, many=True, context={'request': request})

        return Response(serializer.data)

    # フォロワーを取得(使う予定はないかも)
    # @action(detail=True)
    # def followers(self, request, pk):
    #     users = self.get_object().get_followers()
    #     serializer = UserMiniSerializer(users, many=True, context={'request': request})

    #     return Response(serializer.data)

# 認証系


class UserList(viewsets.ModelViewSet):

    permission_classes = (permissions.AllowAny,)

    def create(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
