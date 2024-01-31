# Squad Management App

Uma aplicação Node.js para gerenciamento de squads em uma empresa, persistindo os dados no MongoDB.

## Configuração do Projeto

Certifique-se de ter o Docker instalado antes de prosseguir.

## Clonando o Repositório

```
git clone https://github.com/seu-usuario/squad-management.git
cd squad-management
```

## Iniciando a Aplicação

Para iniciar a aplicação, utilize o seguinte comando:
```
docker-compose up --build
```
Acesse a aplicação em http://localhost:3000.

## Rotas da API

### Listar Squads
```
curl http://localhost:3000/squads
```
### Criar Squad
```
curl -X POST -H "Content-Type: application/json" -d '{"name": "NomeSquad", "description": "Descrição do Squad", "leader": "LíderSquad", "members": [{"name": "Membro1", "position": "Cargo1", "skills": ["Habilidade1", "Habilidade2"]}]}' http://localhost:3000/squads
```
### Atualizar Squad
```
curl -X PUT -H "Content-Type: application/json" -d '{"name": "NovoNome", "description": "Nova descrição", "leader": "Novo líder", "members": [{"name": "NovoMembro", "position": "NovoCargo", "skills": ["NovaHabilidade1", "NovaHabilidade2"]}]}' http://localhost:3000/squads/:id
```

### Excluir Squad

```
curl -X DELETE http://localhost:3000/squads/:id
```
