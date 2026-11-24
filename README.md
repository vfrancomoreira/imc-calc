# Calculadora de IMC (Web + API)

**Autores:** Limber Jhonathan e Vinicius Franco

## Objetivo do projeto
Projeto acadêmico que calcula o Índice de Massa Corporal (IMC) de um usuário.
O frontend coleta peso e altura e envia os dados para uma API, que realiza o
cálculo no backend e retorna o resultado com a classificação correspondente.

Fórmula utilizada: `IMC = Peso / Altura²`

Classificação:
- Magreza: IMC < 18,5 kg/m²
- Normal: 18,5 ≤ IMC ≤ 24,9 kg/m²
- Sobrepeso: 24,9 < IMC ≤ 30 kg/m²
- Obesidade: IMC > 30 kg/m²

## Tecnologias utilizadas
- **Node.js** (módulo `http` nativo, sem frameworks) — servidor e API
- **HTML5, CSS3 e JavaScript** (puro) — interface web

Nenhuma dependência externa é necessária (`node_modules` vazio).

## Pré-requisitos
- Node.js instalado (versão 14 ou superior)

## Instruções de instalação e execução
1. Entre na pasta do projeto:
   ```
   cd imc-calculadora
   ```
2. Execute o servidor:
   ```
   node server.js
   ```
3. Acesse no navegador:
   ```
   http://localhost:3000
   ```

## Funcionalidades
- Formulário web para inserir peso (kg) e altura (m).
- API `POST /api/imc` que recebe `{ "peso": number, "altura": number }` e
  retorna `{ "imc": number, "classificacao": string }`.
- Cálculo do IMC feito inteiramente no backend (o frontend só exibe o resultado).
- Validação de entradas (peso/altura ausentes, zerados ou negativos).

## Estrutura de arquivos
```
imc-calculadora/
├── server.js          # Servidor HTTP + API de cálculo do IMC
├── public/
│   ├── index.html      # Página principal (formulário)
│   ├── style.css        # Estilos da interface
│   └── script.js        # Lógica do frontend (chamada à API)
└── README.md
```

## Contribuidores
- **Limber Jhonathan** — Co-autor
- **Vinicius Franco** — Co-autor
