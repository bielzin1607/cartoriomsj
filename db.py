import sqlite3

# Conecte-se ao banco de dados (será criado se não existir)
conn = sqlite3.connect('cartorio.db')
cur = conn.cursor()

# Crie a tabela protocolos
cur.execute('''
CREATE TABLE IF NOT EXISTS protocolos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT NOT NULL
)
''')

# Adicione alguns dados de exemplo
cur.execute('INSERT INTO protocolos (nome, descricao) VALUES (?, ?)', ("Protocolo 1", "Descrição do Protocolo 1"))
cur.execute('INSERT INTO protocolos (nome, descricao) VALUES (?, ?)', ("Protocolo 2", "Descrição do Protocolo 2"))
conn.commit()

# Feche a conexão
conn.close()
