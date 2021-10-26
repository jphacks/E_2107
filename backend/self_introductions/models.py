from django.db import models
from django.contrib.auth.models import AbstractUser

# プロフィールのユーザー定義


class User(AbstractUser):
    pass


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    hobby = models.CharField(max_length=50)
    talent = models.CharField(max_length=50)
    born = models.CharField(max_length=50)
    job = models.CharField(max_length=50)
    twitter = models.URLField()
    instagram = models.URLField()
    facebook = models.URLField()

    def __str__(self):
        return self.name
