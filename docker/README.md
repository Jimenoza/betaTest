## Beta Test
[![Beta Tech](https://betasolutions.tech/assets/img/LogoBeta.png)](https://github.com/Beta-Tech-Costa-Rica/BetaTest)

Docker needs to be installed, follow the steps described on the official [Docker page](https://docs.docker.com/engine/install/)

- [Windows](https://docs.docker.com/desktop/install/windows-install/)
- [Linux](https://docs.docker.com/desktop/install/mac-install/)
- [Mac](https://docs.docker.com/desktop/install/linux-install/)

Create .env file
```bash
touch .env
```

Into [.env](.env) paste the following code
```env
PG_CONTAINER=Postgres14
PG_PASS=0ewj0Ra6zYWe
PG_USER=esalas
PG_HOST=db
PG_DATABASE=postgres
PG_PORT=5432
PG_EXPOSE_PORT=5432
```

Create DF_POSTGRES folder
```bash
mkdir DF_POSTGRES
```

Go to [DF_POSTGRES](DF_POSTGRES) folder

Create docker-compose.yml file
```bash
touch docker-compose.yml
```

Into [docker-compose.yml](docker-compose.yml) paste the following code
```yml
version: '3.1'
services:
  db:
    build:
      context: ./DF_POSTGRES
    container_name: ${PG_CONTAINER}
    ports:
      - "${PG_EXPOSE_PORT}:${PG_PORT}"
    environment:
      - POSTGRES_DB=${PG_DATABASE}
      - POSTGRES_USER=${PG_USER}
      - POSTGRES_PASSWORD=${PG_PASS}
    volumes:
      - db-data:/var/lib/postgresql_data1/data/pgdata
volumes:
  db-data:
```

Run this command for create docker with postgres database
```bash
docker-compose up -d
```

Run this command to verify correctly docker
```bash
docker ps
```

Go to [home directory](https://github.com/Beta-Tech-Costa-Rica/BetaTest) to continue

***
[![Powered by](https://img.shields.io/badge/Powered%20by-Eduardo%20Salas-blue)](https://github.com/EdoSalas)
***