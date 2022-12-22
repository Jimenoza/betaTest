## Beta Test
[![Beta Tech](https://betasolutions.tech/assets/img/LogoBeta.png)](https://github.com/Beta-Tech-Costa-Rica/BetaTest)

Create postgres.conf file
```bash
touch postgres.conf
```

Into [postgres.conf](postgres.conf) paste the following code
```conf
listen_addresses = '*'
port = 5432
max_connections = 100
shared_buffers = 128MB
dynamic_shared_memory_type = posix
max_wal_size = 1GB
min_wal_size = 80MB
log_timezone = 'UTC'
datestyle = 'iso, mdy'
timezone = 'UTC'
lc_messages = 'en_US.utf8'
lc_monetary = 'en_US.utf8'
lc_numeric = 'en_US.utf8'
lc_time = 'en_US.utf8'
default_text_search_config = 'pg_catalog.english'
```

Create Dockerfile file
```bash
touch Dockerfile
```

Into [Dockerfile](Dockerfile) paste the following code
```Dockerfile
FROM postgres:14
MAINTAINER Eduardo Salas <esalas95@outlook.com>

ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=UTC

RUN mkdir -p /var/lib/postgresql_data1/data/pgdata
COPY ./postgres.conf /var/lib/postgresql_data1/data/pgdata
```

Go to [docker](../) to continue

***
[![Powered by](https://img.shields.io/badge/Powered%20by-Eduardo%20Salas-blue)](https://github.com/EdoSalas)
***