Teste técnico REACTJS/GRAPHQL/NODEJS/MONGODB

Work in Progress :))

No caso do seguinte erro na montagem do container do frontend pelo docker-compose

```
Error: Missing binding /frontend/node_modules/node-sass/vendor/linux_musl-x64-83/binding.node
Node Sass could not find a binding for your current environment: Linux/musl 64-bit with Node.js 14.x

```

siga as seguinte etapas:

1. Vá até o repositório do projeto dê start no container do frontend com `docker start <frontend_container_id>`
2. Rode os seguintes comandos

```
docker exec -it <frontend_container_id> rm -R node_modules
docker exec -it <frontend_container_id> npm rebuild node-sass
docker exec -it <frontend_container_id> npm install
docker-compose up
```
