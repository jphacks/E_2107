from django.urls import path
from .views import *

urlpatterns = [
    path('', ListProfile.as_view()),
    path('<int:pk>/', DetailProfile.as_view()),
]
