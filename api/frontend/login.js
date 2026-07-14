async function login(){

const email=document.getElementById("email").value;
const senha=document.getElementById("senha").value;

const resposta=await fetch("http://localhost:3031/auth/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

email,
senha

})

});

const dados=await resposta.json();

if(dados.success){

localStorage.setItem("usuario",
JSON.stringify(dados.usuario));

window.location.href="index.html";

}else{

alert(dados.message);

}

}