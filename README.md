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
    - 

</details>
