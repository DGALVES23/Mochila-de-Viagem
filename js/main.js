const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
// transformando a string enviada ao localStorage e verificando se existe algo no localStorage, se nao houver criar um no Array
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach( (elemento) => {
    criaElemento(elemento);
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    //verificando se um elemento já existe em nossa lista
    const existe = itens.find(elemento => elemento.nome === nome.value)
    
    //tranformando o elemento itemAtual em um objeto, para podermos salvar mais informacoes no localStorage
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }
    
    if (existe) {
        itemAtual.id = existe.id
        
        //funcao para atualizar o elemento caso exista
        atualizaElemento(itemAtual)

        //atualizando
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual

    } else{
        //criando um novo id para o elemento
        itemAtual.id = itens[itens.length -1] ? itens[itens.length-1].id +1 : 0

        //crando um novo elemento
        criaElemento(itemAtual)

        //inserindo itens no Array Itens para salvar no localstorage
        itens.push(itemAtual)

    }  
   

    //registrando um novo elemento no localStorage
    localStorage.setItem("itens", JSON.stringify(itens))

    //apos criar o elemento, apagará o texto do input
    nome.value  = ""
    quantidade.value = ""
    
})

function criaElemento(item) {
    const novoItem = document.createElement('li')
    novoItem.classList.add('item')

    const numeroDoItem = document.createElement('strong')
    numeroDoItem.innerHTML = item.quantidade
    numeroDoItem.dataset.id = item.id    
    novoItem.appendChild(numeroDoItem)

    novoItem.innerHTML += item.nome 

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)
    
}

//funcao para atualizar o elemento caso exista 
function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
        
}

//funcao para criar o botao para deletar um item
function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "Deletar"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)        
    })

    return elementoBotao        
}

// funcao para deletar um elemento
function deletaElemento(tag, id) {
    tag.remove()
    //removendo itens do Array
    itens.splice(itens.findIndex(elemento => elemento.id === id) ,1)
    //atualizando o localSotage
    localStorage.setItem("itens", JSON.stringify(itens))
}