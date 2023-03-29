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
async function createMessage(message) {
    //creamos el elemento div
    const div = document.createElement("div");
    //le agregamos la clase message
    div.classList.add("message");
    //creamos el elemento p
    const p = document.createElement("p");
    //le agregamos el texto del mensaje
    p.innerHTML = '<strong>Tú:</strong> ' + message;
    //añadimos clases de bootstrap para dar estilos
    p.classList.add("text-white", "bg-secondary", "rounded-2", "p-2");
    //agregamos el elemento p al div
    div.appendChild(p);
    // agregamos el elemento al div con id messages
    document.getElementById("chat").appendChild(div);
    //creamos una animación para simular que el bot esta escribiendo
    const p1 = document.createElement("p");
    p1.innerHTML = '<strong>ChatGPT:</strong> <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Cargando...';
    p1.classList.add("text-white", "bg-primary", "rounded-2", "p-2");
    div.appendChild(p1);
    //llamamos a la funcion para obtener la respuesta
    const res = await chatGPT(message);
    //quitamos la animación
    div.removeChild(p1);
    const p2 = document.createElement("p");
    (res.error) ? p2.innerHTML = '<strong>ChatGPT:</strong> ' + JSON.stringify(res.error.message)
        : p2.innerHTML = '<strong>ChatGPT:</strong> ' + JSON.stringify(res.choices[0].message.content);
    p2.classList.add("text-white", "bg-primary", "rounded-2", "p-2");
    div.appendChild(p2);
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

//funcion para consumir api de chatgpt
async function chatGPT(message) {
    const enviar = {
        "model": "gpt-3.5-turbo",
        "messages": JSON.stringify([{ "role": "user", "content": message }]),
        "temperature": 0.7
    }
    //creamos el objeto de configuracion
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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",
            "OpenAI-Organization": "org-HeswipgtHVXT7VNBA16QCDkc"
        },
        body: JSON.stringify(enviar),
    };
    //consumimos la api
    const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        config
    );
    //obtenemos la respuesta en json
    const data = await response.json();
    //retornamos la respuesta
    return data;
}

