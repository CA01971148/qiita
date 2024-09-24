## Mysqlスキーマ定義
```
CREATE TABLE account (
    userid INT AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(255) NOT NULL,
    pas VARCHAR(255) NOT NULL
);


CREATE TABLE card (
    cardid INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    detail TEXT,
    tag JSON,  
    heart INT DEFAULT 0,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    userid INT,
    FOREIGN KEY (userid) REFERENCES account(userid) 
);

```

## 仮想環境を構築
```
py -3 -m venv venv
```
## 仮想環境上に移動
```
venv\Scripts\activate
```
## flaskをインストール
```
pip install Flask
```


## 環境変数を定義
```
$env:FLASK_APP = "main"
```

## flaskを起動
```
flask run
```
