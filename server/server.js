const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const path = require('path');
const firestore = require('./firebase');
const cors = require('cors');
const socketio = require('socket.io');

const app = express();
const port = 3000;
app.use(cors());

// Carregue o arquivo JSON de chave de serviço do Firebase
const serviceAccount = require('./firebase.json');

// Inicialize o SDK do Firebase com as credenciais
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Exporte a instância do Firestore
const db = admin.firestore();

app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = socketio(server);

app.use(bodyParser.urlencoded({ extended: true }));

// Configurar o middleware express.static para servir os arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.get('/shop', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'shop.html'));
});
app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'cart.html'));
});

app.get('/detail', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'detail.html'));
});
app.get('/404', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', '404.html'));
});

app.get('/terms', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'terms.html'));
});

app.get('/whatsapp', (req, res) => {
    const whatsappLink = 'https://wa.me/5574988274544';
    res.redirect(whatsappLink);
});
// Emitir os dados atualizados para os clientes conectados
const emitDataUpdates = async() => {
    try {
        const produtosSnapshot = await db.collection('MarlosCardosoProdutos').get();
        const produtosDados = [];
        produtosSnapshot.forEach((doc) => {
            produtosDados.push(doc.data());
        });
        io.emit('produtos', produtosDados);

        const categoriasSnapshot = await db.collection('MarlosCardosoCategorias').get();
        const categoriasDados = [];
        categoriasSnapshot.forEach((doc) => {
            categoriasDados.push(doc.data());
        });
        io.emit('categorias', categoriasDados);
    } catch (error) {
        console.error('Erro ao puxar dados:', error);
    }
};

// Evento de conexão do Socket.IO
io.on('connection', socket => {
    console.log('Novo usuário conectado.');

    // Emitir os dados atualizados quando um novo cliente se conectar
    emitDataUpdates();

    socket.on('disconnect', () => {
        console.log('Usuário desconectado.');
    });
});


// Rotas para obter os dados
app.get('/marloscardosoprodutos', async(req, res) => {
    try {
        const snapshot = await db.collection('MarlosCardosoProdutos').get();
        const dados = [];
        snapshot.forEach((doc) => {
            dados.push(doc.data());
        });
        res.json(dados);
    } catch (error) {
        console.error('Erro ao puxar dados:', error);
        res.status(500).json({ error: 'Erro ao puxar dados' });
    }
});

app.get('/marloscardosocategorias', async(req, res) => {
    try {
        const snapshot = await db.collection('MarlosCardosoCategorias').get();
        const dados = [];
        snapshot.forEach((doc) => {
            dados.push(doc.data());
        });
        res.json(dados);
    } catch (error) {
        console.error('Erro ao puxar dados:', error);
        res.status(500).json({ error: 'Erro ao puxar dados' });
    }
});



// Inicie o servidor
server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});