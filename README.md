# imagemagick-node-api

Este projeto cria uma api utilizando express.js com uma rota POST, protegida por uma chave secreta, que recebe uma imagem não-webp e a converte para webp utilizando a ferramenta ImageMagick via Docker

## Pré-requisitos

- Git
- Docker

## Instalação & Inicialização

Clone o repositório

```
git clone git@github.com:inolopesm/imagemagick-node-api.git
```

Acesse o repositório

```
cd imagemagick-node-api
```

Construa a imagem

```
docker build -t inolopesm/imagemagick-node-api:latest .
```

Crie um container conectado com a porta 4000 da sua máquina ou alguma de sua preferência

```
docker run -p 4000:80 inolopesm/imagemagick-node-api:latest
```

## Utilização

Exemplo utilizando Axios

```ts
const file: File = event.target.files.item(0);

const formData = new FormData();
formData.set("image", file);

const conversorResponse = await axios.post<ArrayBuffer>(
  "http://localhost:4000",
  formData,
  { responseType: "arraybuffer" }
);

// Buffer from buffer package on npm because doesn't have on Web API
const base64 = Buffer.from(data, "binary").toString("base64");

const base64Url = `data:image/webp;base64,${base64};`
```

## Modo de Desenvolvimento

Via Docker Compose

```
docker compose up
```

