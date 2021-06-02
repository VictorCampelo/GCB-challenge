# Desafio backend - Grupo GCB
O Grupo GCB é uma holding especializada no mercado financeiro e de capitais, com foco nos segmentos de seguros, investimentos, securitização e consultoria financeira para empresas e pessoas físicas. 

Suas atividades são desempenhadas de forma segregada através das empresas GRCB Capital, Adiante Recebíveis e FMI S.A.

Fundada e administrada por sócios empreendedores, com conhecimentos complementares e diversos. A companhia tem a meritocracia como seu valor primordial e prima por oferecer a seus clientes produtos inovadores, serviços diferenciados e atendimento de excelência.

- http:/www.gcbinvestimentos.com
- http:/www.fmisa.com.br
- https://www.grcbcapital.com.br
- https://adiante.app



O desafio é construir uma API Rest que faça a gestão de cadastros de médicos. 🏥

## Instalação
Copie o arquivo ```.env.example``` para o ```.env```. 
```bash
$ cp .env.example .env
```
Instale as dependências do projeto.
```bash
$ yarn install

# ou

$ npm install
```

Feito isso, edite os valores das variáveis de ambiente para os valores desejados.

## Executar a aplicação e banco de dados dentro do Docker
Para executar todo o projeto dentro do docker, apenas execute, no terminal, o seguinte comando:
```bash
$ docker-compose up -d --build
```
A aplicação será executada por default no modo de desenvolvimento: ``yarn start``
## Executar a aplicação localmente e o banco de dados no Docker
Se você desejar executar a aplicação fora do Docker, siga os seguintes passos:

No arquivo ```.env``` atualize o valor da variavel ```TYPEORM_HOST``` de ``pgsql`` para ``localhost``.

    TYPE_ORM=pgsql -> TYPE_ORM=localhost

Execute o banco de dados:

```bash
# Executar apenas o banco de dados PostgreSql
$ docker-compose up -d --build pgsql
```
Aguarde o download, configuração e execução do banco de dados PostgreSql no Docker. 

Após isso, execute a aplicação no modo desejado:
```bash
# Executar a aplição no modo de desenvolvimento
$ (npm run | yarn) start

# Executar a aplição no modo de desenvolvimento com monitoramento de modificações em arquivos
$ (npm run | yarn) start:dev

# Executar a aplição no modo de produção
$ (npm run | yarn) start:prod
```

# REST API

A especificação da REST API para o desafio proposto está descrita abaixo:

## Documentação
### Essa aplicação foi documentada utilizando o Swagger.

- Para acessar a documentação, em seu navegador, digite:

  - ```http://localhost:3000/api```

# MÉDICO

## Cadastrar um médico


> POST ```/doctor/create```

## Obter médico pelo ID

> GET `/doctor/:id`

## Obter lista de médicos cadastrados utilizando qualquer atributo do médico como parâmetro

> GET `/doctor`

## Atualizar informações do médico
> PUT  ```​/doctor/edit​/{id}```

## Remover um médico temporariamente

> DELETE  ```​/doctor/delete/{id}```

## Recuperar um médico temporariamente deletado

> POST  ```​/doctor/restore/{id}```

## Adicionar especialidades a um médico

> POST  ```​/doctor/add-specialties/:id```

## Remover especialidades um médico

> DELETE  ```​/doctor/remove-specialties/:id```

#
# ESPECIALIDADE

## Cadastrar uma especialidade

> POST ```/specialties/create```


## Obter lista de especialidades

> GET `/specialties`

## Atualizar informações da especialidade

> PUT  ```​/specialties/edit​/{id}```

## Remover uma especialidade temporariamente

> DELETE  ```​/specialties/delete/{id}```
