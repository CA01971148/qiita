from flask import Flask, jsonify,request
from flask_cors import CORS
from flask_mysqldb import MySQL
import json

app = Flask(__name__)
CORS(app)

# MySQL接続情報を設定
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root' 
app.config['MYSQL_PASSWORD'] = 'Shoma0517!'
app.config['MYSQL_DB'] = 'qiita'

mysql = MySQL(app)

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