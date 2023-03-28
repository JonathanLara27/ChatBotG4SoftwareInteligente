//funcion para obtener el input del usuario
function getInputValue() {
    //seleccionamos el input
    const input = document.getElementById("message");
    //obtenemos el valor del input
    const inputValue = input.value;
    //borramos el valor del input
    input.value = "";
    //retornamos el valor del input
    createMessage(inputValue);
}

//funcion para crear el mensaje
function createMessage(message) {
    //creamos el elemento div
    const div = document.createElement("div");
    //le agregamos la clase message
    div.classList.add("message");
    //creamos el elemento p
    const p = document.createElement("p");
    //le agregamos el texto del mensaje
    p.innerHTML = '<strong>Tú:</strong> ' + message;
    //agregamos el elemento p al div
    div.appendChild(p);
    // agregamos el elemento al div con id messages
    document.getElementById("chat").appendChild(div);
}

//tenemos el form message-form
const form = document.getElementById("message-form");
//cuando se envia el form
form.addEventListener("submit", (e) => {
    //evitamos que se recargue la pagina
    e.preventDefault();
    //obtenemos el valor del input
    getInputValue();
});
