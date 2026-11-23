const form = document.getElementById('form-imc');
const divResultado = document.getElementById('resultado');
const divErro = document.getElementById('erro');
const spanValorImc = document.getElementById('valor-imc');
const spanClassificacao = document.getElementById('classificacao');

form.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  divResultado.classList.add('escondido');
  divErro.classList.add('escondido');

  const peso = parseFloat(document.getElementById('peso').value);
  const altura = parseFloat(document.getElementById('altura').value);

  try {
    const resposta = await fetch('/api/imc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ peso, altura }),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      divErro.textContent = dados.erro || 'Erro ao calcular o IMC.';
      divErro.classList.remove('escondido');
      return;
    }

    spanValorImc.textContent = `${dados.imc} kg/m²`;
    spanClassificacao.textContent = dados.classificacao;
    divResultado.classList.remove('escondido');
  } catch (e) {
    divErro.textContent = 'Não foi possível conectar à API.';
    divErro.classList.remove('escondido');
  }
});
