# spider-downloader
Experimento NodeJs como exercício de programação. Programa para download de páginas HTML usando recursos de concorrência e SOLID/Clean Code.

## O estado atual do código
O código já existia no livro NodeJs Design Patterns. Eu apenas peguei o código inicial e estou tentando aplicar técnicas de programação voltadas para legibilidade e otimização de código.

Nesse primeiro passo, remove o *callback hell*, separando cada funcionalidade num bloco de função. Cada função tem uma única responsabilidade. Optei por não usar classes pois JavaScript é uma linguagem orientada a protótipos e não objetos como Java ou C++.

Apesar de mais organizado, ainda preciso verificar se existe mistura de código síncrono com assíncrono e trocar os *callbacks* por promises. Inicialmente podem ser *promises puras* pra ver o resultado na legibilidade de código, mas acredito que, no final, usar *async/await* será a melhor solução.

## Cuidados para não misturar promises e async/await
Uma das coisas que muitos programadores iniciantes fazem é misturar promises puras com async/await, mostrando que não entenderam muito bem a progressão da tecnologia na resolução de problemas existentes no próprio NodeJs e programaçao assíncrona.

## Interessante adicionar multitarefa
Aqui provavelmente não cabe concorrência de verdade, mas posso usar o *event loop* do node para buscar mais de uma página e gravá-las em disco de forma assíncrona, simulando um concorrência dentro do *event loop*.