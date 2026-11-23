// Servidor simples em Node.js puro (sem frameworks externos)
// - Serve os arquivos estáticos da pasta /public
// - Expõe a API POST /api/imc que calcula o IMC no backend

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
};

// Calcula o IMC e devolve o valor e a classificação
function calcularIMC(peso, altura) {
  const imc = peso / (altura * altura);

  let classificacao;
  if (imc < 18.5) {
    classificacao = 'Magreza';
  } else if (imc <= 24.9) {
    classificacao = 'Normal';
  } else if (imc <= 30) {
    classificacao = 'Sobrepeso';
  } else {
    classificacao = 'Obesidade';
  }

  return { imc: Number(imc.toFixed(2)), classificacao };
}

function servirArquivoEstatico(req, res) {
  let caminho = req.url === '/' ? '/index.html' : req.url;
  caminho = path.join(PUBLIC_DIR, caminho);

  // Evita acessar arquivos fora da pasta public
  if (!caminho.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Acesso negado');
    return;
  }

  fs.readFile(caminho, (err, conteudo) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Arquivo não encontrado');
      return;
    }
    const ext = path.extname(caminho);
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(conteudo);
  });
}

function tratarApiImc(req, res) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
    if (body.length > 1e6) req.destroy(); // proteção simples contra payload gigante
  });

  req.on('end', () => {
    try {
      const dados = JSON.parse(body);
      const peso = Number(dados.peso);
      const altura = Number(dados.altura);

      if (!peso || !altura || peso <= 0 || altura <= 0) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ erro: 'Informe peso (kg) e altura (m) válidos e maiores que zero.' }));
        return;
      }

      const resultado = calcularIMC(peso, altura);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(resultado));
    } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ erro: 'JSON inválido no corpo da requisição.' }));
    }
  });
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/imc') {
    tratarApiImc(req, res);
    return;
  }
  if (req.method === 'GET') {
    servirArquivoEstatico(req, res);
    return;
  }
  res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Método não permitido');
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = { calcularIMC };
