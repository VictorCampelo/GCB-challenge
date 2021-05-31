FROM node:10

# diretório alvo
RUN mkdir -p /usr/src/GCB
WORKDIR /usr/src/GCB

# copiar o projeto e instalar os pacotes com o yarn
COPY . /usr/src/GCB/
RUN yarn install

# abrindo a porta 3000
EXPOSE 3000

RUN chmod +x ./scripts/init.sh
RUN chmod +x ./scripts/wait-for-it.sh

ENTRYPOINT ["./scripts/init.sh"]