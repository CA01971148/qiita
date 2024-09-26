# API詳細

`http://[自分のローカル実行path]/order/time`
### method = GET
## Response
```
[
  [
    1,
    "Card 1",
    "Detail of card 1",
    "[\"tag1\", \"tag2\"]",
    1,
    "Sun, 22 Sep 2024 14:10:54 GMT",
    1
  ],
  [
    2,
    "Card 2",
    "Detail of card 2",
    "[\"tag1\", \"tag3\"]",
    2,
    "Sun, 22 Sep 2024 14:10:54 GMT",
    2
  ]
]
```

`http://[自分のローカル実行path]/order/trend`
### method = GET
## Response
```
[
  [
    8,
    "Card 8",
    "Detail of card 8",
    "[\"tag5\", \"tag9\"]",
    41,
    "Sun, 22 Sep 2024 14:10:54 GMT",
    8
  ],
  [
    3,
    "Card 3",
    "Detail of card 3",
    "[\"tag2\", \"tag4\"]",
    10,
    "Sun, 22 Sep 2024 14:10:54 GMT",
    3
  ]
]
```
`http://[自分のローカル実行path]/account/verification`
### method = POST
### Request
#### Header
```
Content-Type:application/json
```
#### body
```
{
  "data": ["ユーザー名", "パスワード"]
}
```
### Response
#### 認証成功の場合
```
{
  "name": "user12",
  "success": true
}
```
#### 失敗の場合
```
{
  "success": false
}
```
`http://[自分のローカル実行path]/account/add`
### method = POST
### Request
#### Header
```
Content-Type:application/json
```
#### body
```
{
  "data": ["ユーザー名", "パスワード"]
}
```
### Response
```
{
  "name": "user111",
  "success": true
}
```

`http://[自分のローカル実行path]/card/add`
### method = POST
### Request
#### Header
```
Content-Type:application/json
```
#### body
```
{
    "name": "Example Card",
    "detail": "This is a detailed description of the card.",
    "tag": ["tag1", "tag2", "tag3"],
    "userid": 1
}
```
### Response
```
{
  "name": "Example Card",
  "succeess": true
}
```