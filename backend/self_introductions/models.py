from django.db import models

# プロフィールのユーザー定義
class User(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    hobby = models.CharField(max_length=50)
    talent = models.CharField(max_length=50) 
    born = models.CharField(max_length=50)
    job = models.CharField(max_length=50)
    twitter = models.URLField()
    instagram = models.URLField()
    facebook = models.URLField()

    def __str__(self):
        return self.name


