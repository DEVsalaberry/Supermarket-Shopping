const prompt = require("prompt-sync")()


const produtos = []
const precos = []

console.log("Informe os produtos ou 'Fim' para Sair")


    do {

    const x = prompt("Produto: ")
    if (x.toUpperCase() == "FIM") {
    break
}


const y = Number(prompt("Preço R$: "))

produtos.push(x)
precos.push(y)


}    while (true)

    console.log("\nRelação dos Produtos Comprados")
    console.log("-".repeat(40))
    let total = 0
    

    for (let i = 0; i < produtos.length; i++) {
console.log(`${produtos[i].padEnd(20, ".")} R$: ${precos[i].toFixed(2).padStart(6)}`)
total = total + precos[i]
}
console.log("-".repeat(40))
console.log(`Total das Compras... R$: ${total.toFixed(2).padStart(6)}`)