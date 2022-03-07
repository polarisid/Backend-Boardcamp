## BoadCamp Backend  
[![wakatime](https://wakatime.com/badge/user/a9d56b74-8de5-409a-8823-893706115b81/project/067ff684-7058-48dc-bd34-089d4ca0846c.svg)](https://wakatime.com/badge/user/a9d56b74-8de5-409a-8823-893706115b81/project/067ff684-7058-48dc-bd34-089d4ca0846c)     
Back-end para um sistema de gestão de uma locadora de jogos de tabuleiro!
### Features
- [x] CRUD - CATEGORIAS
- [x] CRUD - JOGOS
- [x] CRUD - CLIENTES
- [x] CRUD - ALUGUE
  <details>
      <summary>Categorias  - Cread/Read</summary>

  - #### GET - /categories - Listar categorias
      Lista todas as categorias no seguinte formato

      ```
      [
        {
          id: 1,
          name: 'Estratégia',
        },
        {
          id: 2,
          name: 'Investigação',
        }
      ]
      ```
      ---
  - #### POST - /categories - Inserir categoria
      O body deve ser no seguinte formato
          
        ```
        {
        name: 'Investigação'
        }
        ```
      - 201 - OK, Created
      - 501 - Erro interno
      - Caso ocorra algum erro retornara um Status Code e uma mensagem no formato ```{message:"Erro ocorrido}```
      - Obs 1: ```name``` não pode estar vazio ⇒ nesse caso, deve retornar status 400
      - Obs 2: ```name``` não pode ser um nome de categoria já existente ⇒ nesse caso deve retornar status 409
  </details>
  <details>
    <summary>Jogos - Cread/Read</summary>
    
  - #### GET - /games - Listar jogos encontrados       
    
      Lista os jogos encontrados, seguindo o formato abaixo (incluindo o nome da categoria conforme destacado)
      ```
        [
        {
          id: 1,
          name: 'Banco Imobiliário',
          image: 'http://',
          stockTotal: 3,
          categoryId: 1,
          pricePerDay: 1500,
          categoryName: 'Estratégia'
        },
        {
          id: 2,
          name: 'Detetive',
          image: 'http://',
          stockTotal: 1,
          categoryId: 2,
          pricePerDay: 2500,
          categoryName: 'Investigação'
        },
        ]
      ```
      - Caso seja passado um parâmetro ```name``` na query string da requisição, os jogos devem ser filtrados para retornar somente os que começam com a string passada (case insensitive)
    ---
  - #### POST - /games - Adiconar um jogo
      Para criar um jogo devemos fazer um post com o body no seguinte formato
      ```
      {
        name: 'Banco Imobiliário',
        image: 'http://',
        stockTotal: "3",
        categoryId: 1,
        pricePerDay: "1500",
      }
      ```  
  </details>
  <details>
    <summary>Clientes - Cread/Read/Update</summary>

  - #### GET /customers - Listar Clientes
    Nesta rota é possivel obter todos os clientes no seguinte formato
    ```
    [
      {
        id: 1,
        name: 'João Alfredo',
        phone: '21998899222',
        cpf: '01234567890',
        birthday: '1992-10-05'
      },
      {
        id: 2,
        name: 'Maria Alfreda',
        phone: '21998899221',
        cpf: '12345678910',
        birthday: '1994-12-25'
      },
    ]
    ```
    - È possivel também pesquisar pelo CPF via query string ```/customers?cpf=31``` retornando um array com os clientes que possuem um cpf começando com os numeros passados.
    - Você também pode pesquisar um cliente por "id" na rota```/customers/:id``` passando o id como parâmetro. O resultado,caso exista, será o seguinte objeto abaixo,caso contrario retornara o status 404
    ```
    {
    id: 1,
    name: 'João Alfredo',
    phone: '21998899222',
    cpf: '01234567890',
    birthday: '1992-10-05'
    }
    ```
    - Observe que ao pesquisar por id é retornado um objeto diferente da pesquisa geral que retorna um array.
  ---
  - #### POST /customers - Inserir um cliente
    O body da requisição deve estar no seguinte formato
    ```
    {
      name: 'João Alfredo',
      phone: '21998899222',
      cpf: '01234567890',
      birthday: '1992-10-05'
    }
    ```
    Status Code
    - 409 - CPF já cadastrado
    - 400 - Formato da requisição invalida 
      CPF deve ter 11 caracteres
      Phone deve ter de 10 a 11 caracteres
      birthday deve ser uma data valida
    - 500 - Erro interno
  ---
  - #### PUT /customers/:id - Atualizar um cliente
    O body da requisição deve estar no seguinte formato
    ```
    {
    name: 'João Alfredo',
    phone: '21998899222',
    cpf: '01234567890',
    birthday: '1992-10-05'
    }
    ```
    - Obs: cpf não pode ser de um cliente já existente ⇒ nesse caso deve retornar status 409

  </details>
  <details>

  <summary>Alugueis - Cread/Read/Update/Delete </summary>

  - #### GET /rentals - Listar alugueis
    Retorna uma lista com todos os aluguéis
    ```
    [
      {
        id: 1,
        customerId: 1,
        gameId: 1,
        rentDate: '2021-06-20',
        daysRented: 3,
        returnDate: null, // troca pra uma data quando já devolvido
        originalPrice: 4500,
        delayFee: null,
        customer: {
        id: 1,
        name: 'João Alfredo'
        },
        game: {
          id: 1,
          name: 'Banco Imobiliário',
          categoryId: 1,
          categoryName: 'Estratégia'
        }
      }
    ]
    ```
    - Caso seja passado o customerId como parametro via query string ```/rentals?customerId=1```
    È retornado um array somente com os aluguéis deste cliente
    - Case seja passado gameId como parametro via query string ```/rentals?gameId=1``` deve retonar somente os alugueis com este jogo
    - Caso seja passado ```status``` como parametro via query string ```/rentals?status=open``` filtra os alugueis abertos (open) e encerrados (close). Sendo status=open - são os abertos, e status=close são os alugueis encerrados.
    - Caso seja passado um parâmetro ```startDate``` na query string da requisição, os aluguéis devem ser filtrados para retornar somente os que foram feitos a partir daquela data. Ex : ```/rentals?startDate=2021-06-10``` deve ser retornado uma array somente com os aluguéis com rentDate maior ou igual a 2021-06-10
    ---
  - #### POST /rentals - Criar aluguel
      O body da requisição deve estar no seguinte formato
    ```
    {
    customerId: 1,
    gameId: 1,
    daysRented: 3
    }
    ```
    - 400 - daysRented deve ser um número maior que 0.
    - 400 - gameId deve ser de um jogo existente.
    - 400 - customerId deve ser de um cliente existente.
    - 400 - Jogo deve possuir saldo em estoque, não deve ter um numero de alugueis na quantidade igual a quantidade em estoque.
    ---
  - #### POST /rentals/:id/return - Finalizar aluguel
    Enviar via query params o Id do aluguel a ser finalizado
    - delayfee, returnDate são calculados automaticamente.
    - 400 - Se o aluguel já fora finalizado
    - 404 - Se não existir o id da consulta no Banco
  - #### DELETE /rentals/:Id
    Exlclui o aluguel passado via query params
    - 404 - caso não exista o id passado.
    - 400 - caso este aluguel ja fora finalizado
  <details>

### Tecnologias utilizadas
  - React
  - PostgresSQL
  - NodeJS
  - ExpressJS
  - Cors
  - Arquitetura em camadas
