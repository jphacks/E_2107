# pipenvでの環境構築

### 前提

- pipenvがコマンドラインから使えること(brewやpipなど)  
記事
(https://qiita.com/y-tsutsu/items/54c10e0b2c6b565c887a)

### backend環境の構築

1. Pipfileがあるフォルダで以下のコマンドを実行
```
 ~/E_2107/backend
>> pipenv install
```

2. 仮想環境内に入る(普通のコマンドで実行できるようになる)
```
 ~/E_2107/backend
>> pipenv shell
```

- backend側でライブラリ追加したい場合は、仮想環境の外で```$ pipenv install ####```を実行してPipfileに記述してバージョンを管理していく。
