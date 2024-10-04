from flask import Flask, jsonify,request, make_response
from flask_cors import CORS
from flask_mysqldb import MySQL
import jwt
import datetime  # 追加
from functools import wraps
import json

app = Flask(__name__)
SECRET_KEY = "sadjfljsiejfoj"
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:3000"}})

# MySQL接続情報を設定
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root' 
app.config['MYSQL_PASSWORD'] = 'Shoma0517!'
app.config['MYSQL_DB'] = 'qiita'

mysql = MySQL(app)



def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get('myapp_token')

        if not token:
            return jsonify({'error': 'Token is missing!'}), 403

        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired!'}), 403
        except Exception as e:
            return jsonify({'error': 'Token is invalid!', 'details': str(e)}), 403

        return f(*args, **kwargs)
    
    return decorated





@app.route("/")
def index():
    return """
    <h1>Welcome!</h1>
    <div><a href='http://127.0.0.1:5000/order/time'>タイム</a></div>
    <a href='http://127.0.0.1:5000/order/trend'>トレンド</a>
    """


@app.route("/order/time",methods=['GET'])
def get_order_time():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM card ORDER BY time DESC')
    data = cur.fetchall()
    cur.close()
    return jsonify(data)

@app.route("/order/trend",methods=['GET'])
def get_order_trend():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM card ORDER BY heart DESC')
    data = cur.fetchall()
    cur.close()
    return jsonify(data)

@app.route('/account/verification',methods = ['POST'])
def account_verification():
    data = request.json
    {'success':False}
    if request.method == 'POST':
        user = data['data'][0]
        pw = data['data'][1]
        
        cur = mysql.connection.cursor()
        
        cur.execute("SELECT user, pas from account where user = %s",(user,))
        data2 = cur.fetchall()
        cur.close()
        if data2:
            if data2[0][1] == pw:
                print(jsonify(data2[0][1]))
                print(pw)
                return jsonify({'success':True,'name':user}),201
            else:
                return jsonify({'success':False}),202
    
@app.route('/account/add',methods = ['POST'])
def account_add():
    cur = mysql.connection.cursor()
    data = request.json
    {'success':False}
    user = data['data'][0]
    pw = data['data'][1]
    cur.execute('INSERT INTO account(user,pas) VALUES(%s,%s)',(user,pw))
    mysql.connection.commit()
    if cur.rowcount == 1:
        return jsonify({'success': True, 'name': user}), 200
    else:
        return jsonify({'success': False}), 210
    
@app.route('/card/add',methods = ['POST'])
def card_add():
    cur = mysql.connection.cursor()
    data = request.json
    {'success':False}
    name = data.get('name')
    detail = data.get('detail')
    tag = json.dumps(data.get('tag'))
    userid = data.get('userid')
    cur.execute('INSERT INTO card(name,detail,tag,heart,userid) VALUES (%s,%s,%s,"0",%s)',(name,detail,tag,userid))
    mysql.connection.commit()
    if cur.rowcount == 1:
        return jsonify({'succeess':True,'name':name}),200
    else:
        return jsonify({'success':False}),210
    
@app.route('/login', methods=['POST'])
def login():
    cur = mysql.connection.cursor()
    data = request.json
    {'success':False}
    try:
        if request.method == 'POST':
            user = data.get('name')
            pw = data.get('password')
            
            cur = mysql.connection.cursor()
            
            cur.execute("SELECT user, pas from account where user = %s",(user,))
            data2 = cur.fetchall()
            cur.close()
            if data2:
                if data2[0][1] == pw:
                    
                    if not user or not pw:
                        return jsonify({'error': 'user and pw are required.'}), 400

                    # JWTを作成 (有効期限を10秒に設定)
                    payload = {
                        'user': user,
                        'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=1)  # 現在時刻 + 10秒
                    }
                    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

                    if isinstance(token, bytes):
                        token = token.decode('utf-8')

                    response = make_response(jsonify({'message': 'Token created','success':True}))
                    response.set_cookie('myapp_token', token, httponly=True, secure=False)

                    return response
                else:
                    return jsonify({'success':False}),202
    except Exception as e:
        return jsonify({'error': str(e),'success':False}), 500

@app.route('/special', methods=['GET'])
@token_required
def special():
    return jsonify({'message': 'This is a special page for logged-in users!'})

if __name__ == "__main__":
    app.run(debug=True)