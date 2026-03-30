# Gerenciador de Aulas

Um projeto prático de front-end feito com **React**.
Essa aplicação não usa nenhum backend ou API - todos os dados são armazenados localmente usando **localStorage**.

## Motivação
Esse projeto foi feito para praticar, mas também para me ajudar a organizar os valores e a quantidade de aulas de inglês que eu tenho no mês.

## Recomendação de uso (Mobile Web App)
Para uma melhor experiência, use esse projeto como um mobile web app adicionando-o á sua Home Screen. Essa ação da uma experiência mais próxima ao app nativo.

Add to Home Screen:
- Iphone (Safari): Share -> Add to Home Screen
- Android (Chrome): Menu -> Add to Home Screen

## Features
- Marcar e desmarcar dia da aula.
- Deletar / alterar dia da aula.
- Buscar mês pelo nome.
- Filtrar mês pelo ano.

## Tecnologias usadas
- React + Vite
- JavaScript
- CSS
- localStorage

## Persistência de dados (localStorage)
Este web app armazena todos os dados dentro do browser do usuário usando **localStorage**.

### Como funciona:
- Rodando pela primeira vez: sem dados armazenados (principalmente na key 'objMesAtual'), o app irá inicializar e criar um array com todos os dias do mês atual, em seguida através desse array gerado irá criar um objeto chamado 'objMesAtual' que armazenará o ano e o mês atual junto com um array chamado 'arrayDias' que armazenará todos os dias previstos para as aulas de inglês no mês correspondente.
- Rodando depois da primeira vez: o app le e converte os valores em JSON armazenados no localStorage e inicializa eles em state.
- Salvar:
 - Ao marcar / desmarcar o dia da aula, o valor do 'objMesAtual' atualiza no localStorage.
 - Ao editar / deletar o dia da aula, o valor do 'objMesAtual' é atualizado no localStorage.
 - Ao fechar o mês, o valor do 'objMesAtual' é salvo dentro do array 'meses' no localStorage, e um novo valor é gerado e salvo no localStorage para o 'objMesAtual'.