# Recicla365 Backend

## Objetivo

O projeto **Recicla365 Backend** é um MVP da aplicação "Recicla 365" desenvolvida no módulo anterior, utilizando Node.js, Express e PostgreSQL. Nela é possível gerenciar pontos de coleta de recicláveis e seus respectivos usuários através de uma API RESTful.

## Tecnologias Utilizadas

- **Node.js**
- **PostgreSQL**
- **Sequelize**

## Organização e escopo

O escopo do backend foi delineado com um diagrama do banco de dados, e o planejamento das etapas foi organizado no Trello.

![image](https://github.com/user-attachments/assets/879d46ff-16ce-4b79-b9bc-37f3b556bac9)
![image](https://github.com/user-attachments/assets/1cf83685-4375-4c3a-9e59-88401d3e9692)


## Rodar o repositório:

1. Clone este repositório:

```bash
git clone https://github.com/renatapulz/recicla365-backend.git
```

2. Instale as dependências:

```bash
cd recicla365-backend
npm install
```

3. Crie um arquivo .env com as variáveis de ambiente necessárias.
   
4. Execute as migrações para configurar o banco de dados:

```bash
npx sequelize-cli db:migrate
```

5. Popule o banco de dados com dados iniciais dos tipos de materiais usando seeders:

```bash
npx sequelize-cli db:seed --seed 20240726040835-categorias-reciclaveis.js
```

6. Inicie o servidor em modo de desenvolvimento:

```bash
npm run start:dev
```

7. Gere a documentação Swagger:

```bash
npm run swagger
```

## Documentação
A documentação da API foi gerada automaticamente usando Swagger, disponível no endpoint '/docs' - http://localhost:3000/docs

![image](https://github.com/user-attachments/assets/522d1b9d-e061-4ea0-a90c-030c76ea19c7)

## Rotas Criadas

- **Usuários**
- POST /usuario/ - Cadastro de um usuário.
- POST /login - Login de um usuário.
- DELETE /usuario/:id - Deletar um usuário.
 
- **Pontos de Coleta**
- GET /local/all - Listagem de todos os pontos de coleta de forma resumida para o acesso de usuários autenticados e não autenticados.
- GET /local - Listagem de todos os pontos de coleta de um usuário.
- GET /local/local_id - Detalhes de um ponto de coleta específico.
- GET /local_id/maps - Obter link do Google Maps de um ponto de coleta.
- POST /local - Cadastro de um ponto de coleta.
- PUT /local/local_id - Atualização de um ponto de coleta.
- DELETE /local/local_id - Deletar um ponto de coleta.

## Tratamento de Erros

A aplicação utiliza o pacote Yup para validação de dados e manipulação de erros, garantindo que as informações fornecidas pelos usuários sejam válidas e que erros sejam tratados de forma adequada, facilitando o desenvolvimento e padronização.

## Bibliotecas Utilizadas

- axios: Biblioteca cliente HTTP para fazer requisições.
- bcryptjs: Biblioteca para hashing de senhas.
- cors: Middleware para habilitar CORS.
- dotenv: Carrega variáveis de ambiente a partir do arquivo .env.
- express: Framework para criação do servidor web.
- jsonwebtoken: Biblioteca para manipulação de JWT (JSON Web Tokens).
- pg: Driver para PostgreSQL.
- pg-hstore: Biblioteca para serializar e deserializar dados JSON no PostgreSQL.
- sequelize: ORM para interagir com o banco de dados PostgreSQL.
- swagger-autogen: Gera a documentação Swagger automaticamente.
- swagger-ui-express: Serve a documentação Swagger.
- yup: Biblioteca para validação de dados.

## Chamadas de APIs Externas

O projeto utiliza duas APIs externas para obter latitude, longitude e links de mapas da localidade:
- Nomination
- Google Maps

## Melhorias que podem ser aplicadas

- Edição e listagem de usuários.
- Inclusão de permissões, para gestão de acessos e controles por perfil.
- Pensando em escalabilidade, criar uma tabela de endereços para associar aos usuários, permitindo que cada usuário possa ter múltiplos endereços (por exemplo, casa e trabalho).
