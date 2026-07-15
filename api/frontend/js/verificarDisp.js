window.addEventListener("DOMContentLoaded", async () => {
  const checkin = sessionStorage.getItem("checkin");
  const checkout = sessionStorage.getItem("checkout");
  const pessoas = sessionStorage.getItem("pessoas");

  if (!checkin || !checkout || !pessoas) {
    alert("Faça a pesquisa primeiro.");
    window.location.href = "index.html";
    return;
  }

  document.getElementById("checkin").value = checkin;
  document.getElementById("checkout").value = checkout;
  document.getElementById("pessoas").value = pessoas;

  buscarQuartos(checkin, checkout, pessoas);
});

async function buscarQuartos(checkin, checkout, pessoas) {
  try {
    const resposta = await fetch("http://localhost:3031/rooms/disponiveis", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        checkin,
        checkout,
        pessoas,
      }),
    });

    if (!resposta.ok) {
      throw new Error("Erro ao buscar quartos.");
    }

    const quartos = await resposta.json();

    const container = document.getElementById("container-quartos");

    container.innerHTML = "";

    if (quartos.length === 0) {
      container.innerHTML = "<h2>Nenhum quarto disponível.</h2>";
      return;
    }

    quartos.forEach((quarto) => {
      container.innerHTML += `
    <div class="caixa">

    <img src="https://i0.wp.com/blog.brisahoteis.com.br/wp-content/uploads/2024/09/Brisa-Janeiro-2020-KAIO-FRAGOSO-19-Grande.jpeg?resize=1024%2C684&ssl=1" alt="Quarto">

    <h2>${quarto.nome_quarto}</h2>

    <p>🏨 <strong>Tipo:</strong> ${quarto.tipo}</p>

    <p>👥 <strong>Capacidade:</strong> ${quarto.capacidade} hóspedes</p>

    <p>💰 <strong>${quarto.preco_cambios} câmbios / noite</strong></p>

    <p>⭐ ${quarto.avaliacao}</p>

    <button onclick="reservar(${quarto.id_quarto})">
        Reservar Agora
    </button>

    </div>
    `;
    });
  } catch (erro) {
    console.log(erro);

    alert("Erro ao buscar quartos.");
  }
}

function reservar(idQuarto) {
  alert("Quarto " + idQuarto + " selecionado!");
}
