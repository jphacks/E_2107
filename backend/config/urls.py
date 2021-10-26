from django.contrib import admin
from django.urls import path, include

# 認証系
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token

urlpatterns = [
    path('admin/', admin.site.urls),

    # api
    path('self_introductions/', include('self_introductions.urls')),

    # 認証系
    path('token-auth/', obtain_jwt_token),
    path('token-verify/', verify_jwt_token),
    path('token-refresh/', refresh_jwt_token),
]
