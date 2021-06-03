# **Desafio backend - Grupo GCB**

O Grupo GCB é uma holding especializada no mercado financeiro e de capitais, com foco nos segmentos de seguros, investimentos, securitização e consultoria financeira para empresas e pessoas físicas.

Suas atividades são desempenhadas de forma segregada através das empresas GRCB Capital, Adiante Recebíveis e FMI S.A.

Fundada e administrada por sócios empreendedores, com conhecimentos complementares e diversos. A companhia tem a meritocracia como seu valor primordial e prima por oferecer a seus clientes produtos inovadores, serviços diferenciados e atendimento de excelência.

- http:/www.gcbinvestimentos.com
- http:/www.fmisa.com.br
- https://www.grcbcapital.com.br
- https://adiante.app

O desafio é construir uma API Rest que faça a gestão de cadastros de médicos. 🏥

## **Instalação**

Copie o arquivo `.env.example` para o `.env`.

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

## **Executar a aplicação e banco de dados dentro do Docker**

Para executar todo o projeto dentro do docker, apenas execute, no terminal, o seguinte comando:

```bash
$ docker-compose up -d --build
```

A aplicação será executada por default no modo de desenvolvimento: `yarn start`

## **Executar a aplicação localmente e o banco de dados no Docker**

Se você desejar executar a aplicação fora do Docker, siga os seguintes passos:

No arquivo `.env` atualize o valor da variavel `TYPEORM_HOST` de `pgsql` para `localhost`.

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

# **REST API**

A especificação da REST API para o desafio proposto está descrita abaixo:

## **Documentação**

### Essa aplicação foi documentada utilizando o Swagger.

- Para acessar a documentação, em seu navegador, digite:

  - `http://localhost:3000/api`

# **MÉDICO**

## **Cadastrar um médico**

```http
POST /doctors/create
```

| Body               | Tipo       | Descrição                                                          |
| :----------------- | :--------- | :----------------------------------------------------------------- |
| `nome`             | `string`   | **Exigido**. Nome do Médico.                                       |
| `crm`              | `string`   | **Exigido**. Número do CRM do Médico.                              |
| `telefone_fixo`    | `string`   | **Exigido**. Telefone Fixo do Médico (Apenas números).             |
| `telefone_celular` | `string`   | **Opcional**. Número de Celular do Médico (Apenas números).        |
| `cep`              | `string`   | **Exigido**. Cep do Médico (Apenas números).                       |
| `especialidade`    | `string[]` | **Exigido**. Lista de Especialidades do Médico (Mínimo exigido: 2) |

- Observação: Todos os outros campos de endereço do médico serão automaticamente preenchidos atraves de uma busca na API

```http
 GET https://viacep.com.br/ws/${cep}/json
```

<br />

## **Obter médico pelo ID**

```http
GET /doctors/{id}
```

| Parâmetro | Tipo     | Descrição                            |
| :-------- | :------- | :----------------------------------- |
| `id`      | `string` | **Exigido**. Id do Médico cadastrado |

<br />

## **Obter lista de médicos cadastrados utilizando qualquer atributo do médico como parâmetro**

```http
GET /doctors
```

| Query              | Tipo       | Descrição                                                   |
| :----------------- | :--------- | :---------------------------------------------------------- |
| `id`               | `string`   | **Opcional**. Id do Médico cadastrado                       |
| `nome`             | `string`   | **Opcional**. Nome do Médico.                               |
| `crm`              | `string`   | **Opcional**. Número do CRM do Médico.                      |
| `telefone_fixo`    | `string`   | **Opcional**. Telefone Fixo do Médico (Apenas números).     |
| `telefone_celular` | `string`   | **Opcional**. Número de Celular do Médico (Apenas números). |
| `cep`              | `string`   | **Opcional**. Cep do Médico (Apenas números).               |
| `logradouro`       | `string`   | **Opcional**. Logradouro do Médico cadastrado               |
| `complemento`      | `string`   | **Opcional**. Complemento do Médico cadastrado              |
| `bairro`           | `string`   | **Opcional**. Bairro do Médico cadastrado                   |
| `cidade`           | `string`   | **Opcional**. Cidade do Médico cadastrado                   |
| `estado`           | `string`   | **Opcional**. Estado do Médico cadastrado                   |
| `ibge`             | `string`   | **Opcional**. Ibge do Médico cadastrado                     |
| `gia`              | `string`   | **Opcional**. Gia do Médico cadastrado                      |
| `ddd`              | `string`   | **Opcional**. ddd do Médico cadastrado                      |
| `siafi`            | `string`   | **Opcional**. Siafi do Médico cadastrado                    |
| `especialidades`   | `string[]` | **Opcional**. Lista especialidades do Médico cadastrado     |

<br />

## **Atualizar informações do médico**

```http
PUT /doctor/edit​/{id}
```

| Parâmetro | Tipo     | Descrição                            |
| :-------- | :------- | :----------------------------------- |
| `id`      | `string` | **Exigido**. Id do Médico cadastrado |

<br />

| Body               | Tipo     | Descrição                                                   |
| :----------------- | :------- | :---------------------------------------------------------- |
| `nome`             | `string` | **Opcional**. Nome do Médico.                               |
| `crm`              | `string` | **Opcional**. Número do CRM do Médico.                      |
| `telefone_fixo`    | `string` | **Opcional**. Telefone Fixo do Médico (Apenas números).     |
| `telefone_celular` | `string` | **Opcional**. Número de Celular do Médico (Apenas números). |
| `cep`              | `string` | **Opcional**. Cep do Médico (Apenas números).               |
| `logradouro`       | `string` | **Opcional**. Logradouro do Médico cadastrado               |
| `complemento`      | `string` | **Opcional**. Complemento do Médico cadastrado              |
| `bairro`           | `string` | **Opcional**. Bairro do Médico cadastrado                   |
| `cidade`           | `string` | **Opcional**. Cidade do Médico cadastrado                   |
| `estado`           | `string` | **Opcional**. Estado do Médico cadastrado                   |
| `ibge`             | `string` | **Opcional**. Ibge do Médico cadastrado                     |
| `gia`              | `string` | **Opcional**. Gia do Médico cadastrado                      |
| `ddd`              | `string` | **Opcional**. ddd do Médico cadastrado                      |
| `siafi`            | `string` | **Opcional**. Siafi do Médico cadastrado                    |

<br />

## **Remover um médico temporariamente**

```http
DELETE /doctor/delete/{id}
```

| Parâmetro | Tipo     | Descrição                            |
| :-------- | :------- | :----------------------------------- |
| `id`      | `string` | **Exigido**. Id do Médico cadastrado |

<br />

## **Recuperar um médico temporariamente deletado**

```http
POST /doctor/restore/{id}
```

| Parâmetro | Tipo     | Descrição                            |
| :-------- | :------- | :----------------------------------- |
| `id`      | `string` | **Exigido**. Id do Médico cadastrado |

<br />

## **Adicionar especialidades a um médico**

```http
POST /doctor/add-specialties/{id}
```

| Parâmetro | Tipo     | Descrição                            |
| :-------- | :------- | :----------------------------------- |
| `id`      | `string` | **Exigido**. Id do Médico cadastrado |

<br />

| Body             | Tipo       | Descrição                                                   |
| :--------------- | :--------- | :---------------------------------------------------------- |
| `especialidades` | `string[]` | **Exigido**. Lista especialidades a ser adionadas ao médico |

<br />

## **Remover especialidades um médico**

```http
POST /doctor/remove-specialties/{id}
```

| Parâmetro | Tipo     | Descrição                            |
| :-------- | :------- | :----------------------------------- |
| `id`      | `string` | **Exigido**. Id do Médico cadastrado |

<br />

| Body             | Tipo       | Descrição                                                   |
| :--------------- | :--------- | :---------------------------------------------------------- |
| `especialidades` | `string[]` | **Exigido**. Lista especialidades a ser adionadas ao médico |

<br /><br />

# ESPECIALIDADE

## **Cadastrar uma especialidade**

```http
POST /specialties/create
```

| Body   | Tipo     | Descrição                           |
| :----- | :------- | :---------------------------------- |
| `nome` | `string` | **Exigido**. Nome da Especialidade. |

<br />

## **Obter lista de todas especialidades cadastradas**

```http
GET /specialties
```

Sem parâmetros exigidos

<br />

## **Atualizar informações de uma especialidade**

```http
PUT /specialties/edit​/{id}
```

| Parâmetro | Tipo     | Descrição                                   |
| :-------- | :------- | :------------------------------------------ |
| `id`      | `string` | **Exigido**. Id da Especialidade cadastrada |

<br />

| Body   | Tipo     | Descrição                           |
| :----- | :------- | :---------------------------------- |
| `nome` | `string` | **Exigido**. Nome da Especialidade. |

<br />

## **Remover uma especialidade temporariamente**

```http
DELETE ​/specialties/delete/{id}
```

| Parâmetro | Tipo     | Descrição                                   |
| :-------- | :------- | :------------------------------------------ |
| `id`      | `string` | **Exigido**. Id da Especialidade cadastrada |
