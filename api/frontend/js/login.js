const btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener("click", async (event) => {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (!email || !senha) {
        alert("Preencha todos os campos.");
        return;
    }

    try {

        const resposta = await fetch("http://localhost:3030/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                senha
            })

        });

        const dados = await resposta.json();

        if (!dados.success) {
            alert(dados.message);
            return;
        }

        localStorage.setItem("usuario", JSON.stringify(dados.usuario));

        alert("Login realizado com sucesso!");

        window.location.href = "index.html";

    } catch (erro) {

        console.log(erro);

        alert("Erro ao conectar ao servidor.");

    }

});