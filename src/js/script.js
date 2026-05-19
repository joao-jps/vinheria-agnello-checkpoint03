/* =========================================================
   Gerenciamento do catálogo de vinhos
   ========================================================= */


/* =========================================================
   1. ARRAY DE OBJETOS — O "banco de dados" dos vinhos
   ---------------------------------------------------------
   Um array é uma lista ordenada. Cada item aqui é um OBJETO,
   que é uma estrutura com propriedades (chave: valor).
   Os dados já vêm preenchidos no código (sem prompt()).
   ========================================================= */
const vinhos = [
  { nome: "Château Agnello Reserva",  tipo: "Tinto",  safra: 2019, estoque: 12 },
  { nome: "Branco Flor de Pedra",     tipo: "Branco", safra: 2022, estoque:  4 },
  { nome: "Rosé Primavera",           tipo: "Rosé",   safra: 2023, estoque:  7 },
  { nome: "Cabernet Sauvignon Gran",  tipo: "Tinto",  safra: 2018, estoque:  2 },
  { nome: "Chardonnay Ouro",          tipo: "Branco", safra: 2021, estoque: 15 },
  { nome: "Merlot Suave Agnello",     tipo: "Tinto",  safra: 2020, estoque:  3 },
  { nome: "Pinot Noir Altitude",      tipo: "Tinto",  safra: 2021, estoque:  9 },
  { nome: "Moscato Colheita Tardia",  tipo: "Branco", safra: 2023, estoque:  1 },
];


/* =========================================================
   2. FUNÇÃO — Listar todos os vinhos com forEach
   ---------------------------------------------------------
   forEach percorre CADA item do array e executa uma função.
   A variável "vinho" representa o item atual em cada volta.
   ========================================================= */
function listarTodosVinhos() {
  
  console.log("CATÁLOGO COMPLETO DE VINHOS");
  

  vinhos.forEach(function (vinho) {
    // Template literal (``) permite misturar texto e variáveis com ${}
    console.log(
      `• ${vinho.nome} | ${vinho.tipo} | Safra ${vinho.safra} | Estoque: ${vinho.estoque}`
    );
  });
}


/* =========================================================
   3. FUNÇÃO — Estoque baixo com filter
   ---------------------------------------------------------
   filter cria um NOVO array apenas com os itens que passam
   na condição (estoque < 5). O array original não é alterado.
   ========================================================= */
function mostrarEstoqueBaixo() {
  // Filtra vinhos com menos de 5 unidades
  const estoqueBaixo = vinhos.filter(function (vinho) {
    return vinho.estoque < 5;
  });


  console.log("VINHOS COM ESTOQUE ABAIXO DE 5");

  if (estoqueBaixo.length === 0) {
    console.log("Nenhum vinho com estoque crítico.");
  } else {
    estoqueBaixo.forEach(function (vinho) {
      console.log(`• ${vinho.nome} — apenas ${vinho.estoque} unidade(s)`);
    });
  }

  return estoqueBaixo; // retornamos para poder exibir no alert() depois
}


/* =========================================================
   4. FUNÇÃO — Estoque total com reduce
   ---------------------------------------------------------
   reduce "reduz" o array a um único valor.
   Funciona como um acumulador: começa em 0 e vai somando
   o estoque de cada vinho a cada volta.
   ========================================================= */
function calcularEstoqueTotal() {
  const total = vinhos.reduce(function (acumulador, vinho) {
    return acumulador + vinho.estoque; // soma o estoque ao acumulador
  }, 0); // 0 é o valor inicial do acumulador


  console.log(`   📦 ESTOQUE TOTAL DA VINÍCOLA: ${total} unidades`);


  return total;
}


/* =========================================================
   5. FUNÇÃO — Nomes em caixa alta com map
   ---------------------------------------------------------
   map cria um NOVO array transformando cada item.
   Aqui transformamos cada objeto em apenas o nome em maiúsculo.
   toUpperCase() é um método nativo de string do JavaScript.
   ========================================================= */
function exibirNomesEmMaiusculo() {
  const nomesMaiusculos = vinhos.map(function (vinho) {
    return vinho.nome.toUpperCase();
  });

  console.log("\n--------------------------------------------");
  console.log("   🔤 NOMES DOS VINHOS EM CAIXA ALTA        ");
  console.log("--------------------------------------------");

  nomesMaiusculos.forEach(function (nome) {
    console.log("• " + nome);
  });

  return nomesMaiusculos;
}


/* =========================================================
   6. FUNÇÃO — Renderizar cards visuais na página
   ---------------------------------------------------------
   Aqui manipulamos o DOM: buscamos o elemento <div id="cards-vinhos">
   no HTML e preenchemos com um card para cada vinho.
   innerHTML injeta HTML como string dentro do elemento.
   ========================================================= */
function renderizarCards() {
  const container = document.getElementById("cards-vinhos");

  vinhos.forEach(function (vinho) {
    // Verifica se o estoque é baixo para adicionar o badge de aviso
    const badgeBaixo =
      vinho.estoque < 5
        ? '<span class="badge-baixo">⚠ Estoque Baixo</span>'
        : "";

    // Cria o HTML do card e injeta dentro do container
    container.innerHTML += `
      <div class="card-vinho">
        <h3>${vinho.nome}</h3>
        <p><strong>Tipo:</strong> ${vinho.tipo}</p>
        <p><strong>Safra:</strong> ${vinho.safra}</p>
        <p><strong>Estoque:</strong> ${vinho.estoque} unidades</p>
        ${badgeBaixo}
      </div>
    `;
  });
}


/* =========================================================
   7. FUNÇÃO PRINCIPAL — Orquestra tudo e exibe os alerts
   ---------------------------------------------------------
   Chamamos todas as funções em sequência e, ao final,
   usamos alert() para exibir um resumo ao usuário.
   alert() bloqueia a execução até o usuário clicar em OK.
   ========================================================= */
function iniciarSistema() {
  // --- Executa as funções e salva os retornos ---
  listarTodosVinhos();
  const comEstoqueBaixo = mostrarEstoqueBaixo();
  const totalEstoque    = calcularEstoqueTotal();
  const nomesAltos      = exibirNomesEmMaiusculo();

  // --- Renderiza os cards visuais na página HTML ---
  renderizarCards();

  // --- ALERT: Resumo geral ---
  alert(
    "🍷 VINHARIA AGNELLO — Sistema Iniciado!\n\n" +
    `Total de vinhos no catálogo: ${vinhos.length}\n` +
    `Estoque total: ${totalEstoque} unidades\n\n` +
    "Abra o Console (F12) para ver os detalhes completos."
  );

  // --- ALERT: Vinhos com estoque baixo ---
  if (comEstoqueBaixo.length > 0) {
    const listaAlerta = comEstoqueBaixo
      .map((v) => `• ${v.nome} (${v.estoque} un.)`)
      .join("\n");

    alert(
      "⚠️ ATENÇÃO — Vinhos com estoque abaixo de 5:\n\n" + listaAlerta
    );
  }

  // --- ALERT: Nomes em caixa alta ---
  alert(
    "🔤 NOMES DOS VINHOS EM CAIXA ALTA:\n\n" +
    nomesAltos.map((n) => "• " + n).join("\n")
  );
}


/* =========================================================
   8. INICIALIZAÇÃO
   ---------------------------------------------------------
   Esperamos o HTML carregar completamente antes de rodar
   o sistema. DOMContentLoaded é um evento que dispara
   assim que o documento HTML foi lido pelo navegador.
   ========================================================= */
document.addEventListener("DOMContentLoaded", function () {
  iniciarSistema();
});