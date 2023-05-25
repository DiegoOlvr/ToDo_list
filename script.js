const formulario = document.getElementById("formulario");
const entrada = document.getElementById("entrada");
const lista_tarefas = document.getElementById("tarefas");

const caches = JSON.parse(localStorage.getItem("tarefas"));

if (caches) {
    caches.forEach((cache) => {
        adicionar_tarefa(cache)
    })
}


formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e)
    
    adicionar_tarefa();
}
);

function adicionar_tarefa(cache) {
    let texto_tarefa = entrada.value;

    if (cache) {
        texto_tarefa = cache.text;
    }

    if (texto_tarefa) {
        const elemento_tarefa = document.createElement("li");
        if (cache && cache.completed) {
            elemento_tarefa.classList.add("completed");
        }
        elemento_tarefa.innerText = texto_tarefa;
        lista_tarefas.appendChild(elemento_tarefa);

        elemento_tarefa.addEventListener("click", () => {
            // toggle = interruptor
            elemento_tarefa.classList.toggle("completed");
            atualizar_lista_cache();
        })

        elemento_tarefa.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            elemento_tarefa.remove();
            atualizar_lista_cache();
        })


        entrada.value = "";
        atualizar_lista_cache();
        
    }
}

function atualizar_lista_cache(){
    const elemento_tarefa = document.querySelectorAll("li");

    const tarefas = []
    
    elemento_tarefa.forEach((elemento) => {
        tarefas.push({
            text: elemento.innerText,
            completed: elemento.classList.contains("completed"),
        });
    });

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}
