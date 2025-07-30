let tarefas = []
const inputTarefa = document.getElementById("inputTarefa")
const mensagem = document.getElementById("mensagem")
let tarefa = inputTarefa.value.trim()
mensagem.textContent = "Texto aqui"

function adicionarTarefa() {
    const inputTarefa = document.getElementById("inputTarefa")
    let tarefa = inputTarefa.value.trim()
    const mensagem = document.getElementById("mensagem")

    if (tarefa == "") {
        // Efeito de erro
        mensagem.textContent = "Digite uma tarefa para adicioná-la a sua lista!"
        mensagem.className = "mensagem-erro"
        inputTarefa.className = "input-erro"
        
        // Remover classe de erro após a animação
        setTimeout(() => {
            inputTarefa.className = ""
        }, 500)
        
    } else {
        // Efeito de sucesso
        mensagem.textContent = "Tarefa adicionada com sucesso!"
        mensagem.className = "mensagem-sucesso"
        tarefas.push(tarefa)
        renderizarTarefas()
        
        // Limpar mensagem após 3 segundos
        setTimeout(() => {
            mensagem.textContent = ""
            mensagem.className = ""
        }, 3000)
    }

    inputTarefa.value = ""
}
function adicionarEfeitoRipple(button, event) {
    const ripple = document.createElement("span")
    ripple.className = "ripple"
    
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    ripple.style.width = ripple.style.height = size + "px"
    
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    
    button.appendChild(ripple)
    
    setTimeout(() => {
        ripple.remove()
    }, 600)
}

function renderizarTarefas() {
    const listaTarefas = document.getElementById("listaTarefas")
    listaTarefas.innerHTML = ""

    for (let i = 0; i < tarefas.length; i++){
        let novaTarefa = document.createElement("li")
        novaTarefa.textContent = tarefas[i]
        novaTarefa.className = "tarefa-item tarefa-nova"
        
        let botaoRemover = document.createElement("button")
        botaoRemover.className = "remover btn-ripple"
        botaoRemover.textContent = "Remover"
        botaoRemover.onclick = (event) => {
            adicionarEfeitoRipple(botaoRemover, event)
            setTimeout(() => removerTarefaComAnimacao(i), 100)
        }

        let botaoEditar = document.createElement("button")
        botaoEditar.className = "editar btn-ripple"
        botaoEditar.textContent = "Editar"
        botaoEditar.onclick = (event) => {
            adicionarEfeitoRipple(botaoEditar, event)
            setTimeout(() => editarTarefa(i), 100)
        }
        
        novaTarefa.appendChild(botaoRemover)
        novaTarefa.appendChild(botaoEditar)
        listaTarefas.appendChild(novaTarefa)
        
        setTimeout(() => {
            novaTarefa.classList.remove("tarefa-nova")
            novaTarefa.classList.add("tarefa-visivel")
        }, 50)
    }
}

function removerTarefaComAnimacao(i) {
    const listaTarefas = document.getElementById("listaTarefas")
    const itemTarefa = listaTarefas.children[i]
    
    // Adicionar classe de animação de remoção
    itemTarefa.className = "tarefa-removendo"
    
    // Remover após a animação
    setTimeout(() => {
        tarefas.splice(i, 1)
        renderizarTarefas()
    }, 500)
}
function removerTarefa(i) {
    tarefas.splice(i, 1) // Remove 1 elemento na posição i
    renderizarTarefas()
}
function editarTarefa(i) {
    let tarefaEditada = prompt("Edite a tarefa:")
    if (tarefaEditada.trim() !== "") {
        tarefas[i] = tarefaEditada
        renderizarTarefas()
    }
}
function limparLista() {
    tarefas.length = 0 // Esvazia o array
    renderizarTarefas()
    const mensagem = document.getElementById("mensagem")
    mensagem.textContent = "Lista de tarefas limpa com sucesso!"
}
function atualizarContador() {
    const contador = document.getElementById("contador")
    const total = tarefas.length
    
    // Criar elemento contador se não existir
    if (!contador) {
        const novoContador = document.createElement("div")
        novoContador.id = "contador"
        novoContador.className = "contador"
        document.querySelector(".container").appendChild(novoContador)
    }
    
    const contadorEl = document.getElementById("contador")
    contadorEl.textContent = `Total de tarefas: ${total}`
    
    // Animação de pulse no contador
    contadorEl.style.animation = "pulse 0.1s"
    setTimeout(() => {
        contadorEl.style.animation = ""
    }, 300)
}
// Adicionar ao final do script.js
document.addEventListener('keydown', function(event) {
    // Enter para adicionar tarefa
    if (event.key === 'Enter') {
        const inputTarefa = document.getElementById("inputTarefa")
        if (document.activeElement === inputTarefa) {
            adicionarTarefa()
        }
    }
    
    // Ctrl + L para limpar lista
    if (event.ctrlKey && event.key === 'l') {
        event.preventDefault()
        limparLista()
    }
    
    // Escapar para limpar input
    if (event.key === 'Escape') {
        document.getElementById("inputTarefa").value = ""
        document.getElementById("mensagem").textContent = ""
    }
})

// Adicionar dicas visuais
function adicionarDicasTeclado() {
    const dicas = document.createElement("div")
    dicas.className = "dicas-teclado"
    dicas.innerHTML = `
        <small>💡 Dicas: Enter para adicionar | Ctrl+L para limpar | Esc para cancelar</small>
    `
    document.querySelector(".container").appendChild(dicas)
}

// Chamar após carregamento
window.onload = function() {
    adicionarDicasTeclado()
}
function alternarModoEscuro() {
    document.body.classList.toggle('modo-escuro')
    const botao = document.getElementById('botao-modo-escuro')
    botao.textContent = document.body.classList.contains('modo-escuro') ? '☀️' : '🌙'
}

function adicionarBotaoModoEscuro() {
    const botao = document.createElement('button')
    botao.id = 'botao-modo-escuro'
    botao.textContent = '🌙'
    botao.className = 'botao-modo-escuro'
    botao.onclick = alternarModoEscuro
    document.querySelector('.container').appendChild(botao)
}