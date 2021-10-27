from django.core.validators import MinValueValidator
from django.contrib.auth.models import AbstractUser
from django.db import models

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

    # フォローしている人を取得する関数を定義
    # TODO フォロー関係ではなく、フォロー関係の「ユーザ」を返したい (文法があっているか不安)
    def get_followings(self):
        relations = Follow.objects.filter(owner=self.id)
        relations_target_id = []
        for obj in relations:
            relations_target_id.append(obj.get_follow_target())

        followings = User.objects.filter(id__in=relations_target_id)

        return followings

    # フォロー人数を表示するfollow関数を定義
    def get_followings_nums(self):
        return len(Follow.objects.filter(owner=self.id))

    # フォロワーを取得する関数を定義

    def get_followers(self):
        return Follow.objects.filter(follow_target=self.id)

    # フォロワー人数を表示するfollower_nums関数を定義
    def get_followers_nums(self):
        return len(Follow.objects.filter(follow_target=self.id))

    # フォロー関係テーブルを定義
    class Follow(models.Model):
        owner = models.ForeignKey(
            User,
            on_delete=models.CASCADE,
            related_name='do_follow_user'
        )
        follow_target = models.ForeignKey(
            User,
            on_delete=models.CASCADE,
            related_name='accept_follow_user'
        )

        def get_owner(self):
            return self.owner

        def get_follow_target(self):
            return self.follow_target

    # いいねテーブルを定義(必要になったら使う? )
    # class Like(models.Model):
    #     owner = models.ForeignKey(
    #         User,
    #         on_delete=models.CASCADE
    #     )
    #     target_user = models.ForeignKey(
    #         User,
    #         on_delete=models.CASCADE
    #     )
