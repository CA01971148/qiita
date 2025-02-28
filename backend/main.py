from flask import Flask, jsonify,request, make_response
from flask_cors import CORS
from flask_mysqldb import MySQL
import jwt
import datetime  
from functools import wraps
import json
from functools import lru_cache

app = Flask(__name__)
SECRET_KEY = "sadjfljsiejfoj"
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})

# MySQL接続情報を設定
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'jugon' 
app.config['MYSQL_PASSWORD'] = '8520'
app.config['MYSQL_DB'] = 'qiita'

mysql = MySQL(app)


# セッション
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
# セッション名前の返答
@lru_cache(maxsize=128)
def decode_jwt(token):
    return jwt.decode(token, SECRET_KEY, algorithms=['HS256'])

def token(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get('myapp_token')
        
        if not token:
            return jsonify({'error': 'Token is missing!'}), 405

        try:
            data = decode_jwt(token)
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired!'}), 403
        except Exception as e:
            return jsonify({'error': 'Token is invalid!', 'details': str(e)}), 403

        name = data.get('user')
        id = data.get('id') 
        return f(name=name, id=id, *args, **kwargs)
    
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
    cur.execute("""
    SELECT 
        c.cardid,
        c.name,
        c.detail,
        c.tag,
        c.heart,
        c.time,
        c.userid,
        a.user AS username
    FROM 
        card c
    JOIN 
        account a ON c.userid = a.userid
    ORDER BY 
        c.time DESC;  -- timeの降順で並べる
    """)
    data = cur.fetchall()
    cur.close()
    return jsonify(data)

@app.route("/order/trend",methods=['GET'])
def get_order_trend():
    cur = mysql.connection.cursor()
    cur.execute("""
    SELECT 
        c.cardid,
        c.name,
        c.detail,
        c.tag,
        c.heart,
        c.time,
        c.userid,
        a.user AS username
    FROM 
        card c
    JOIN 
        account a ON c.userid = a.userid
    ORDER BY heart DESC
    """)
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
    user = data.get("user")
    pw = data.get("pw")
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
    print(tag)
    userid = data.get('userid')
    cur.execute('INSERT INTO card(name,detail,tag,userid) VALUES (%s,%s,%s,%s)',(name,detail,tag,userid))
    mysql.connection.commit()
    if cur.rowcount == 1:
        return jsonify({'succeess':True,'name':name}),200
    else:
        return jsonify({'success':False}),210
    
@app.route('/login', methods=['POST'])
def login():
    cur = mysql.connection.cursor()
    data = request.json
    
    try:
        if request.method == 'POST':
            user = data.get('name')
            pw = data.get('password')

            cur.execute("SELECT user, pas, userid FROM account WHERE user = %s", (user,))
            data2 = cur.fetchall()
            cur.close()

            if data2:
                if data2[0][1] == pw:
                    if not user or not pw:
                        return jsonify({'error': 'user and pw are required.'}), 400

                    # JWTを作成 (有効期限を10秒に設定)
                    id = data2[0][2]  # idを取得
                    payload = {
                        'user': user,
                        'id': id,  # idをペイロードに追加
                        'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=10000000)  # 現在時刻 +
                    }
                    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

                    if isinstance(token, bytes):
                        token = token.decode('utf-8')

                    response = make_response(jsonify({'message': 'Token created', 'success': True}))
                    response.set_cookie('myapp_token', token, httponly=True, secure=False)

                    return response
                else:
                    return jsonify({'success': False}), 202
    except Exception as e:
        return jsonify({'error': str(e), 'success': False}), 500


@app.route('/special', methods=['GET'])
@token_required
def special():
    return jsonify({'message': 'This is a special page for logged-in users!'})

@app.route('/confirmation_name', methods=['GET'])
@token
def required(name,id):
    return jsonify({'name': name,'id':id})

@app.route('/logout', methods=['POST'])
def logout():
    try:
        response = make_response(jsonify({'message': 'Logged out successfully', 'success': True}))
        response.set_cookie('myapp_token', '', expires=0, httponly=True, secure=False)
        return response
    except Exception as e:
        return jsonify({'error': str(e), 'success': False}), 500

@app.route('/mypage', methods=['GET'])
def get_mypage():
    try:
        # クエリパラメータからデータを取得
        name = request.args.get('name')
        user_id = request.args.get('id')

        if not name or not user_id:
            return jsonify({"error": "入力が無効です"}), 400

        cur = mysql.connection.cursor()
        
        # 投稿数とheartの合計を取得
        query = """
            SELECT COUNT(name) AS sum, COALESCE(SUM(heart), 0) AS total_heart
            FROM card
            WHERE userid = (
                SELECT userid
                FROM account
                WHERE user = %s AND userid = %s
            );
        """
        cur.execute(query, (name, user_id))
        
        # データの取得
        result = cur.fetchone()
        cur.close()
        
        # 結果をJSON形式で返す
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"error": "サーバーエラーが発生しました", "details": str(e)}), 500

@app.route('/card/detail',methods=['GET'])
def detail():
    try:
        card_id = request.args.get('id')
        if not card_id:
            return jsonify({"error":"入力が無効です"}),400
        cur = mysql.connection.cursor()
        query ="""
        SELECT card.*, account.user
        FROM card
        JOIN account ON card.userid = account.userid
        WHERE card.cardid = %s;
        """
        cur.execute(query,(card_id,))
        result = cur.fetchone()
        cur.close()
        
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": "サーバーエラーが発生しました", "details": str(e)}), 500
@app.route('/mk',methods =['GET'])
def mk():
    try:
        cur = mysql.connection.cursor()
        query ="""
        select detail from card where cardid = 8;
        """
        cur.execute(query)
        result = cur.fetchone()
        cur.close()
        return jsonify(result)
    except Exception as e:
        return jsonify({"error":str(e)}),500
    
@app.route('/user_ranking',methods=['GET'])
def rank():
    try:
        cur = mysql.connection.cursor()
        query = """
        SELECT account.user, SUM(card.heart) AS total_hearts
        FROM card
        JOIN account ON card.userid = account.userid
        GROUP BY account.user
        ORDER BY total_hearts DESC
        LIMIT 3;
        """
        cur.execute(query)
        result = cur.fetchall()
        cur.close()
        
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": "サーバーエラーが発生しました", "details": str(e)}), 500

@app.route('/Getcard',methods=['GET'])
def get():
    card_id = request.args.get('id')
    try:
        cur = mysql.connection.cursor()
        query = """
                    SELECT * 
                    FROM card 
                    WHERE cardid = %s;
                """
        cur.execute(query,(card_id,))
        result = cur.fetchone()
        cur.close()
        
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": "サーバーエラーが発生しました", "details": str(e)}), 500

@app.route('/Fixcard',methods=['PUT'])
def putCard():
    data = request.json
    cur = mysql.connection.cursor()
    try:
        name = data.get('name')
        detail = data.get('detail')
        tag = json.dumps(data.get('tag'))
        cardid = data.get('cardid')
        query = """
                UPDATE card
                SET name = %s, detail = %s, tag = %s
                WHERE cardid = %s
                """
        cur.execute(query,(name,detail,tag,cardid,))
        mysql.connection.commit()
        if cur.rowcount == 1:
            return jsonify({'succeess':True,'name':name}),200
    except Exception as e:
        return jsonify({"error": "サーバーエラーが発生しました", "details": str(e)}), 500
    
@app.route('/like',methods=['GET'])
def like():
    cur = mysql.connection.cursor()
    try:
        userid = request.args.get("userid")
        cardid = request.args.get("cardid")
        query = """
                SELECT * 
                FROM likes
                where userid = %s and cardid = %s
                """
        cur.execute(query,(userid,cardid,))
        if cur.rowcount == 1:
            return jsonify({'success':False,})
        else:
            return jsonify({'success':True,})
    except Exception as e:
        return jsonify({"error": "サーバーエラーが発生しました", "details": str(e)}), 500

@app.route('/like', methods=["POST"])
def likeadd():
    cur = mysql.connection.cursor()
    data = request.json
    try:
        userid = data.get("userid")
        cardid = data.get("cardid")

        # likesテーブルにすでに存在するかを確認
        check_query = "SELECT COUNT(*) FROM likes WHERE userid = %s AND cardid = %s"
        cur.execute(check_query, (userid, cardid))
        like_exists = cur.fetchone()[0]

        if like_exists:
            return jsonify({"error": "既にいいねされています"}), 400

        # トランザクション開始
        mysql.connection.begin()

        # likesテーブルに新しいレコードを挿入
        insert_query = """
            INSERT INTO likes (userid, cardid)
            VALUES (%s, %s)
        """
        cur.execute(insert_query, (userid, cardid,))

        # cardテーブルのheartカウントをインクリメント
        update_query = """
            UPDATE card
            SET heart = heart + 1
            WHERE cardid = %s
        """
        cur.execute(update_query, (cardid,))

        # トランザクションコミット
        mysql.connection.commit()

        return jsonify({"success": True, "message": "いいねが追加されました"}), 200
    except Exception as e:
        # トランザクションロールバック
        mysql.connection.rollback()
        return jsonify({"error": "サーバーエラーが発生しました", "details": str(e)}), 500
    finally:
        cur.close()

@app.route("/like", methods=["DELETE"])
def likedel():
    cardid = request.args.get("cardid")
    userid = request.args.get("userid")
    try:
        cur = mysql.connection.cursor()
        
        # likesテーブルから指定されたuseridとcardidのレコードを削除
        delete_query = """
                DELETE FROM likes
                WHERE userid = %s AND cardid = %s
        """
        cur.execute(delete_query, (userid, cardid))
        
        # cardテーブルのheartを1減らす
        update_query = """
                UPDATE card
                SET heart = heart - 1
                WHERE cardid = %s
        """
        cur.execute(update_query, (cardid,))
        
        # トランザクションをコミット
        mysql.connection.commit()
        
        return jsonify({"success": True, "message": "いいねが削除されました"}), 200

    except Exception as e:
        # エラーが発生した場合、トランザクションをロールバック
        mysql.connection.rollback()
        return jsonify({"error": "サーバーエラーが発生しました", "details": str(e)}), 500

@app.route('/name_get',methods=['GET'])
def name_get():
    name = request.args.get("user")
    try:
        cur =mysql.connection.cursor()
        query = """
                    SELECT user
                    FROM account
                    where user = %s
                """
        cur.execute(query, (name,))
        if cur.rowcount == 1:
            return jsonify({"success":True}),200
        else:
            return jsonify({"success":False}),201
    except:
        return jsonify({"success":'エラーが発生しました'}),500

@app.route('/book_get',methods=["GET"])
def book_get():
    name = request.args.get("userid")
    try:
        cur = mysql.connection.cursor()
        query = """
                    SELECT *
                    FROM bookmarks
                    where userid = %s
                """
        cur.execute(query, (name,))
        result = cur.fetchall()
        cur.close()
        
        if cur.rowcount >= 1:
            return jsonify({"exit":True,"data":result}),200
        else:
            return jsonify({"exit":False}),201
    except:
        return jsonify({"success":'エラーが発生しました'}),500
        
@app.route('/book_post',methods=["POST"])
def book_post():
    data = request.json
    try:
        userid = data.get("userid")
        cardid = data.get("cardid")
        cur = mysql.connection.cursor()
        query = """
                    INSERT INTO bookmarks(userid,cardid)
                    VALUES(%s,%s)
                """
        cur.execute(query, (userid,cardid,))
        mysql.connection.commit()
        return jsonify({"success":True,"message":"ブックマークに保存しました"})
    except:
        return jsonify({"success":False,"message":"ブックマークに保存できていません"})
    finally:
        cur.close()
        
@app.route("/book_del",methods=["DELETE"])
def book_del():
    cardid = request.args.get("cardid")
    userid = request.args.get("userid")
    try:
        cur = mysql.connection.cursor()
        query = """
                    DELETE FROM bookmarks
                    WHERE userid = %s and cardid = %s
                """
        cur.execute(query,(userid,cardid))
        mysql.connection.commit()
        return jsonify({"success": True, "message": "ブックマークが削除されました"}), 200
    except Exception as e:
        return jsonify({"error": "サーバーエラーが発生しました", "details": str(e)}), 500
    
@app.route("/book_card",methods=["GET"])
def book_book_card():
    userid = request.args.get("userid")
    try:
        cur = mysql.connection.cursor()
        query = """
                    SELECT c.cardid,c.name,c.detail,c.tag,c.heart,c.time, a.user
                    FROM card c
                    JOIN bookmarks b ON c.cardid = b.cardid
                    JOIN account a ON c.userid = a.userid
                    WHERE b.userid = %s
                """
        cur.execute(query, (userid,))
        result = cur.fetchall()
        cur.close()
        
        if cur.rowcount >= 1:
            return jsonify({"exit":True,"data":result}),200
        else:
            return jsonify({"exit":False}),201
    except:
        return jsonify({"success":'エラーが発生しました'}),500
        
if __name__ == "__main__":
    app.run(debug=True)