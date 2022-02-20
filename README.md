# Catálogo de aulas por módulos

Este é um desafio para a vaga Fullstack na Verzel. Abaixo segue o passo-a-passo para avaliação, instalação e uso do backend.

## Requisitos

- [Mysql Community](https://dev.mysql.com/downloads/mysql/) ***v8.0.27***
- [Node](https://nodejs.org/pt-br/download/) ***v16.13.2***
- [Git](https://git-scm.com/downloads)


Você pode obter o node e o npm usando o [nvm](https://pip.pypa.io/en/stable/) (Node version manager) seguindo a [documentação](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)


## Instalação

Após a instalação e configuração do Mysql server, em posse do usuário e senha gerado na configuração, poderemos dar prosseguimento. Precisamos primeiramente criar um schema para nossa aplicação e faremos isso manualmente seguindo o exemplo abaixo.

```bash
$ mysql -u [usuário] -p
```

Logo após o comando você terá que inserir sua senha de acesso. Após o login no mysql podemos criar nosso schema:

```bash
> CREATE DATABASE class_modules;
> quit

```
Com nossa dase de dados criada podemos baixar o projeto e instalar as dependências e começar a usar nossa aplicação.

```bash
# Download do projeto
$ git clone https://github.com/jeffersson-abreu/class-modules-backend.git

# Instalando as dependências
$ cd class-modules-backend && npm install
```

Após a instalação das dependências, procure um arquivo nomeado `.env` na raiz do projeto. Este arquivo contém as informações pertinentes a nossa aplicação e algumas dessas informações não deveriam ser compartilhadas fora do contexto desse desafio.

Com um editor de textos altere as informações de usuário e senha de acordo com as configurações feitas na instalação do mysql server. O arquivo ficará semelhante a este:

```bash
# Database informations -------
DB_NAME='class_modules'
DB_HOST='localhost'
DB_USER='[usuário]'  <--- Substitua pelo seu usuário
DB_PASS='[senha]'    <--- Substitua pela sua senha ou deixe em branco
DB_PORT=3306

# Auth token informations
SECRET_KEY='o8043$^*0s&^d-&^smjammkz@qh8h4yh^^khfhb(whb@&=5_1t'
JWT_TOKEN_EXPIRES="1d"
```
Pronto! Agora podemos iniciar nossa aplicação.
```bash
$ npm start
```

Agora nossa aplicação está pronta para receber requisições locais do nosso front-end.