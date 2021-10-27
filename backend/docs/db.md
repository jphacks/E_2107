# データベース関連ドキュメント

### 開発環境  

- データベースの更新があった場合は、  
```python manage.py makemigrations```  を実行して、更新をローカルに反映させる。(ここで問題があった場合には、migrations/00XX_auto_XXXXに問題がある。)

- その後問題がなかったら、```python manage.py migrate```ローカルのデータベースにテーブルができるので、データを入れてみて確かめる。  

### 本番環境  