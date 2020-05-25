# Desafio Tecnico - ReactJS + NodeJS

Repositório destinado a entrega do projeto de software de gestao de condominio.

## Tecnologias Utilizadas:

- Frontend: ReactJS, HTML5, SCSS, Javascript, Bulma, e NPM (IDE - VSCode);
- Backend: NodeJS eGraphQL (IDE - VSCode);
- Banco de Dados: MongoDB com mongoose;


# Instalaçao

Apos o clone, entre no diretorio do projeto, e com o docker/docker compose instalado, execute o seguinte comando pra baixar as imagens e criar os containers do docker:

```
docker-compose up
```

Quando finalizado, o sistema pode ser acessado no browser pelo endereço http://localhost:3000/

Os containers as vezes apresentam problemas na detecção de versões do sistema, na instalação do npm modules, compatibilidade com scss, etc.
No caso de qualquer erro na montagem do container do frontend pelo docker-compose, ele pode ser resolvido acessando o container do front-end, deletando a pasta node_modules e dando o comando npm install.
Exemplo de erro :

```
Error: Missing binding /frontend/node_modules/node-sass/vendor/linux_musl-x64-83/binding.node
Node Sass could not find a binding for your current environment: Linux/musl 64-bit with Node.js 14.x

```

Nesse caso, siga as seguinte etapas:
1. Identifique o id do container do frontend com `docker ps -a`
2. Vá até o repositório do projeto dê start no container do frontend com `docker start <frontend_container_id>`
3. Rode os seguintes comandos:

```
docker exec -it <frontend_container_id> rm -R node_modules
docker exec -it <frontend_container_id> npm rebuild node-sass
docker exec -it <frontend_container_id> npm install
docker-compose up
```
