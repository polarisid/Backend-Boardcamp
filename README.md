## BoadCamp Backend  
[![wakatime](https://wakatime.com/badge/user/a9d56b74-8de5-409a-8823-893706115b81/project/067ff684-7058-48dc-bd34-089d4ca0846c.svg)](https://wakatime.com/badge/user/a9d56b74-8de5-409a-8823-893706115b81/project/067ff684-7058-48dc-bd34-089d4ca0846c)     
Back-end para um sistema de gestão de uma locadora de jogos de tabuleiro!
### Features
- [x] CRUD - CATEGORIAS
- [x] CRUD - JOGOS
- [x] CRUD - CLIENTES
- [x] CRUD - ALUGUE

### Categorias 
- #### GET - /categories
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
- #### POST - /categories
  O body deve ser no seguinte formato
  
  ```
  {
  name: 'Investigação'
  }
  ```
