from django.db import models

# プロフィールのユーザー定義
class User(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    hobby = models.CharField(max_length=100)
    talent = models.CharField(max_length=100) 
    born = models.CharField(max_length=100)
    job = models.CharField(max_length=100)
    twitter = models.CharField(max_length=100)
    instagram = models.CharField(max_length=100)
    facebook = models.CharField(max_length=100)

    def __str__(self):
        return self.name


