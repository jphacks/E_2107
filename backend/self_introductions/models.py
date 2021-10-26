from django.db import models
from django.core.validators import MinValueValidator

# プロフィールのユーザー定義
class User(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    hobby = models.CharField(max_length=100, null=True)
    talent = models.CharField(max_length=100, null=True) 
    born = models.CharField(max_length=100, null=True)
    job = models.CharField(max_length=100, null=True)
    twitter = models.CharField(max_length=100, null=True)
    instagram = models.CharField(max_length=100, null=True)
    facebook = models.CharField(max_length=100, null=True)
    followings_count = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    followers_count = models.IntegerField(default=0, validators=[MinValueValidator(0)])

    def __str__(self):
        return self.name

    # フォローしている人を取得する関数を定義 
    def get_followings(self):
        return Follow.objects.filter(owner=self.id)

    #フォロー人数を表示するfollow関数を定義
    def get_followings_nums(self):
        return len(Follow.objects.filter(owner=self.id))
    

    # フォロワーを取得する関数を定義
    def get_followers(self):
        return Follow.objects.filter(follow_target=self.id)

    #フォロワー人数を表示するfollower_nums関数を定義
    def get_followers_nums(self):
        return len(Follow.objects.filter(follow_target=self.id))


# フォロー関係テーブルを定義
class Follow(models.Model):
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name = 'do_follow_user'
    )
    follow_target = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name = 'accept_follow_user'
    ) 

#いいねテーブルを定義(必要になったら使う? )
# class Like(models.Model):
#     owner = models.ForeignKey(
#         User,
#         on_delete=models.CASCADE
#     )
#     target_user = models.ForeignKey(
#         User,
#         on_delete=models.CASCADE
#     )


