const botaoReserva = document.getElementById("btn-reserva");

if (botaoReserva) {

    botaoReserva.addEventListener("click", () => {

        const checkin = document.getElementById("checkin").value;
        const checkout = document.getElementById("checkout").value;
        const pessoas = document.getElementById("pessoas").value;

        if (!checkin || !checkout || !pessoas) {
            alert("Preencha todos os campos.");
            return;
        }

        sessionStorage.setItem("checkin", checkin);
        sessionStorage.setItem("checkout", checkout);
        sessionStorage.setItem("pessoas", pessoas);

        window.location.href = "verificarDisp.html";

    });

};