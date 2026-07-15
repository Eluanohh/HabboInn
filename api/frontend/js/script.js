const btn = document.getElementById("btn");

if (btn) {
    btn.addEventListener("click", () => {
        window.location.href = "verificarDisp.html";
    });
}

const buscar = document.getElementById("buscar");

if (buscar) {
    buscar.addEventListener("click", async () => {

        const checkin = document.getElementById("checkin").value;
        const checkout = document.getElementById("checkout").value;
        const pessoas = document.getElementById("pessoas").value;

        if (!checkin || !checkout || !pessoas) {
            alert("Preencha todos os campos.");
            return;
        }

        try {

            const resposta = await fetch("http://localhost:3031/rooms/disponiveis", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    checkin,
                    checkout,
                    pessoas
                })
            });

            if (!resposta.ok) {
                throw new Error(`Erro ${resposta.status}`);
            }

            const quartos = await resposta.json();

            const container = document.getElementById("container-quartos");

            container.innerHTML = "";

            if (quartos.length === 0) {
                container.innerHTML = "<h2>Nenhum quarto disponível para esse período.</h2>";
                return;
            }

            quartos.forEach(quarto => {

                container.innerHTML += `
                    <div class="caixa">

                        <img src="https://i0.wp.com/blog.brisahoteis.com.br/wp-content/uploads/2024/09/Brisa-Janeiro-2020-KAIO-FRAGOSO-19-Grande.jpeg?resize=1024%2C684&ssl=1" alt="Quarto">

                        <h2>${quarto.nome_quarto}</h2>

                        <p>${quarto.tipo}</p>

                        <p>Capacidade: ${quarto.capacidade} pessoas</p>

                        <p>${quarto.preco_cambios} câmbios</p>

                        <p>⭐ ${quarto.avaliacao}</p>

                        <button onclick="reservar(${quarto.id_quarto})">
                            Reservar
                        </button>

                    </div>
                `;
            });

        } catch (erro) {
            console.error(erro);
            alert("Erro ao buscar quartos.");
        }

    });
}

function reservar(idQuarto) {
    alert("Quarto " + idQuarto + " selecionado!");
}