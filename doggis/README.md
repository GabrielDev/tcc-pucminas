![Doggis](https://bitbucket.org/GabrielDev/tcc-pucminas/raw/89c616fc4fa9eddf868951ac9aba12afb89fe95b/docs/doggis.png)

# Doggis

API de serviços do Petshop.


### Recursos

 * Autenticação
 * Manter Perfis
 * Manter Usuários
 * Manter Clientes
 * Manter Pets
 * Manter Produtos
 * Manter Promoçōes
 * Manter Estoque
 * Manter Pedidos
 * Manter Fabricantes
 * Manter Categorias
 * Consulta Estados
 * Consulta Espécies
 * Consulta Raças
 * Consulta Papeis
 * Desenvolvido utilizando Spring Boot

#### Recursos pendentes
 * Manter Serviços
 * Manter Agendamentos
 * Manter Avaliaçōes
 * Relatórios de atendimentos
 * Notificação de agendamento por e-mail
 * Recuperar senha


## Instalação

### Pré-requisitos

Para executar em localhost, instale as seguintes dependências:
 * [https://www.java.com/pt_BR/](Java)
 * [https://maven.apache.org/install.html](Maven)
 * [https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/](MySQL)

#### Banco de dados

Com MySQL instalado, crie um novo banco de dados com o seguinte comando
```
CREATE DATABASE IF NOT EXISTS doggis; USE doggis;
CREATE USER 'doggisApp'@'%' IDENTIFIED BY 'Doggis@2019';
GRANT ALL PRIVILEGES ON doggis.* TO 'doggisApp'@'%';
```

Uma carga inicial será realizada na primeira vez que o projeto for executado.

#### Maven
Após instalar e configurar o Maven, execute o seguinte comando
```
$ mvn install
```

## Como utilizar

Após concluir a instalação execute o seguinte comando

```
$ mvn spring-boot:run
```


## Endpoints
| Recurso      | Função              | Metodo | URI                               |
|--------------|---------------------|--------|-----------------------------------|
| Autenticação | Permissōes          | GET    | /auth/permissao                   |
| Autenticação | Login               | POST   | /auth                             |
| Categoria    | Novo                | POST   | /categoria                        |
| Categoria    | Editar              | PUT    | /categoria/:id                    |
| Categoria    | Todos               | GET    | /categoria                        |
| Categoria    | Obter               | GET    | /categoria/:id                    |
| Categoria    | Excluir             | DELETE | /categoria/:id                    |
| Cliente      | Novo                | POST   | /cliente                          |
| Cliente      | Editar              | PUT    | /cliente/:id                      |
| Cliente      | Todos               | GET    | /cliente                          |
| Cliente      | Todos paginado      | GET    | /cliente/paginado                 |
| Cliente      | Obter               | GET    | /cliente/:id                      |
| Cliente      | Excluir             | DELETE | /cliente/:id                      |
| Cliente      | Avaliaçōes          | GET    | /cliente/:id/avaliacoes           |
| Cliente      | Avaliaçōes pendetes | GET    | /cliente/:id/avaliacoes-pendentes |
| Estado       | Listar              | GET    | /estado                           |
| Estoque      | Novo                | POST   | /estoque                          |
| Estoque      | Todos               | GET    | /estoque                          |
| Estoque      | Obter               | GET    | /estoque/:id                      |
| Estoque      | Excluir             | DELETE | /estoque/:id                      |
| Fabricante   | Novo                | POST   | /fabricante                       |
| Fabricante   | Editar              | PUT    | /fabricante/:id                   |
| Fabricante   | Todos               | GET    | /fabricante                       |
| Fabricante   | Obter               | GET    | /fabricante/:id                   |
| Fabricante   | Excluir             | DELETE | /fabricante/:id                   |
| Pedido       | Novo                | POST   | /pedido                           |
| Pedido       | Todos               | GET    | /pedido                           |
| Pedido       | Obter               | GET    | /pedido/:id                       |
| Pedido       | Excluir             | DELETE | /pedido/:id                       |
| Pedido       | Buscar itens        | GET    | /pedido/buscar?termo=:termo       |
| Pedido       | Pagamentos          | GET    | /pedido/pagamento                 |
| Perfil       | Novo                | POST   | /perfil                           |
| Perfil       | Editar              | PUT    | /perfil/:id                       |
| Perfil       | Todos               | GET    | /perfil                           |
| Perfil       | Obter               | GET    | /perfil/:id                       |
| Perfil       | ObterPapel          | GET    | /perfil/papel/:id                 |
| Perfil       | Papeis              | GET    | /perfil/papel                     |
| Perfil       | Excluir             | DELETE | /perfil/:id                       |
| Pet          | Novo                | POST   | /pet                              |
| Pet          | Editar              | PUT    | /pet/:id                          |
| Pet          | Todos               | GET    | /pet                              |
| Pet          | Todos paginado      | GET    | /pet/paginado                     |
| Pet          | Obter               | GET    | /pet/:id                          |
| Pet          | Excluir             | DELETE | /pet/:id                          |
| Pet          | Espécies            | GET    | /pet/especies                     |
| Pet          | Raças               | GET    | /pet/racas/:idEspecie             |
| Produto      | Novo                | POST   | /produto                          |
| Produto      | Editar              | PUT    | /produto/:id                      |
| Produto      | Todos               | GET    | /produto                          |
| Produto      | Todos paginado      | GET    | /produto/paginado                 |
| Produto      | Obter               | GET    | /produto/:id                      |
| Produto      | Excluir             | DELETE | /produto/:id                      |
| Produto      | Promoção            | GET    | /produto/:id/promocao             |
| Produto      | Histórico de preço  | GET    | /produto/:id/historico            |
| Produto      | Estoque             | GET    | /produto/:id/estoque              |
| Promoção     | Novo                | POST   | /promocao                         |
| Promoção     | Editar              | PUT    | /promocao/:id                     |
| Promoção     | Todos               | GET    | /promocao                         |
| Promoção     | Obter               | GET    | /promocao/:id                     |
| Promoção     | Excluir             | DELETE | /promocao/:id                     |
| Usuário      | Novo                | POST   | /usuario                          |
| Usuário      | Editar              | PUT    | /usuario/:id                      |
| Usuário      | Todos               | GET    | /usuario                          |
| Usuário      | Obter               | GET    | /usuario/:id                      |
| Usuário      | Bloquear            | DELETE | /usuario/:id                      |

### Insomnia
Todos os endpoints estão disponíveis para importação [aqui.](https://bitbucket.org/GabrielDev/tcc-pucminas/src/master/docs/Insomnia.json)

## Autor

[![GabrielDev](https://avatars0.githubusercontent.com/u/5470572?s=115&v=4")](https://github.com/GabrielDev)