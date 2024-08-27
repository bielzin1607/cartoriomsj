from flask import Flask, request, jsonify, render_template
import sqlite3

app = Flask(__name__)

def query_database(query):
    conn = sqlite3.connect('cartorio.db')
    cur = conn.cursor()
    cur.execute("SELECT * FROM protocolos WHERE nome LIKE ?", ('%' + query + '%',))
    results = cur.fetchall()
    conn.close()
    return results

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/buscar', methods=['POST'])
def buscar():
    query = request.form['query']
    results = query_database(query)
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get("message")
    
    # Resposta simples
    if "olá" in user_message.lower():
        response = "Olá! Como posso ajudar?"
    else:
        response = "Desculpe, não entendi."
    
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)    
