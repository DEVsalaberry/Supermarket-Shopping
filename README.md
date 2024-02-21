SINOPSE
Um prompt de sincronização para Node. Muito simples. Sem bindings em C++ e sem scripts bash.

Funciona no Linux, OS X e Windows.

MODO BÁSICO

javascript
Copy code
var prompt = require('prompt-sync')();
//
// Obter entrada do usuário.
//
var n = prompt('Quantas vezes mais? ');
COM HISTÓRICO
O histórico é um extra opcional, para usar simplesmente instale o plugin de histórico.

bash
Copy code
npm install --save prompt-sync-history
javascript
Copy code
var prompt = require('prompt-sync')({
  history: require('prompt-sync-history')() //abre arquivo de histórico
});
//obter entrada do usuário
var input = prompt()
prompt.history.save() //salvar histórico de volta ao arquivo
Consulte o módulo prompt-sync-history para opções ou bifurque-o para comportamento personalizado.

API

javascript
Copy code
require('prompt-sync')(config) => prompt
Retorna uma instância da função de prompt. Aceita opções de configuração com as seguintes propriedades possíveis:

sigint: O padrão é falso. Um ^C pode ser pressionado durante o processo de entrada para abortar a entrada de texto. Se sigint for falso, o prompt retorna null. Se sigint for verdadeiro, o ^C será tratado da maneira tradicional: como um sinal SIGINT, fazendo com que o processo saia com o código 130.

eot: O padrão é falso. Um ^D pressionado como o primeiro caractere de uma linha de entrada faz com que o prompt-sync ecoe a saída e saia do processo com o código 0.

autocomplete: Uma função de completer que será chamada quando o usuário digitar TAB para permitir a autocompletar. Ele recebe uma string como argumento e retorna uma matriz de strings que são possíveis correspondências para a conclusão. Uma matriz vazia é retornada se não houver correspondências.

history: Aceita um objeto que fornece uma "interface de histórico", veja prompt-sync-history para um exemplo.

javascript
Copy code
prompt(ask, value, opts)
ask é o rótulo do prompt, value é o valor padrão na ausência de uma resposta.

O argumento opts também pode estar na primeira ou segunda posição do parâmetro.

Opts pode ter as seguintes propriedades:

echo: O padrão é '*'. Se definido, a senha será mascarada com o caractere especificado. Para entrada oculta, defina echo para '' (ou use prompt.hide).

autocomplete: Substitui a função de autocompletar da instância para permitir a autocompletar personalizada de um prompt específico.

value: Mesmo que o parâmetro value, o valor padrão para o prompt. Se opts estiver na terceira posição, essa propriedade não substituirá o parâmetro value.

ask: Mesmo que o parâmetro value, o rótulo do prompt. Se opts não estiver na primeira posição, o parâmetro ask não será substituído por essa propriedade.

javascript
Copy code
prompt.hide(ask)
Método de conveniência para criar um prompt padrão de senha oculta, é o mesmo que prompt(ask, {echo: ''}).

EDIÇÃO DE LINHA
A edição de linha está ativada no modo não oculto. (use setas para cima/baixo para histórico e backspace e setas esquerda/direita para edição)

O histórico não é definido ao usar o modo oculto.

EXEMPLOS

javascript
Copy code
//básico:
console.log(require('prompt-sync')()('conte-me algo sobre você: '))

var prompt = require('prompt-sync')({
  history: require('prompt-sync-history')(),
  autocomplete: complete(['hello1234', 'he', 'hello', 'hello12', 'hello123456']),
  sigint: false
});

var value = 'frank';
var name = prompt('digite o nome: ', value);
console.log('digite a senha *');
var pw = prompt({echo: '*'});
var pwb = prompt('digite a senha oculta (ou não): ', {echo: '', value: '*pwb padrão*'})
var pwc = prompt.hide('digite outra senha oculta: ')
var autocompleteTest = prompt('autocompletar personalizado: ', {
  autocomplete: complete(['bye1234', 'by', 'bye12', 'bye123456'])
});

prompt.history.save();

console.log('\nNome: %s\nSenha *: %s\nSenha oculta: %s\nOutra senha oculta: %s', name, pw, pwb, pwc);
console.log('autocompletar 2: ', autocompleteTest);

function complete(commands) {
  return function (str) {
    var i;
    var ret = [];
    for (i=0; i< commands.length; i++) {
      if (commands[i].indexOf(str) == 0)
        ret.push(commands[i]);
    }
    return ret;
  };
};
