const btnCadastro = document.getElementById("btnCadastro");

btnCadastro.addEventListener("click", async (event) => {

    event.preventDefault();

    const nome_usuario = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {

        const resposta = await fetch("http://localhost:3031/auth/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nome_usuario,
                email,
                senha
            })

        });

        const dados = await resposta.json();

        alert(dados.message);

        if (dados.success) {
            window.location.href = "login.html";
        }

    } catch (erro) {

        console.log(erro);

        alert("Erro ao cadastrar.");

    }

});