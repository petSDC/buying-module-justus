FROM node:6.13.0

WORKDIR /client

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["node", "server/server.js"]

# FROM runnable/postgres:9.3

# ENV POSTGRES_USER postgres
# ENV POSTGRES_DB petsdc_buying

# # Uncomment the following ADD line to enable seeding the PostgreSQL DB
# # Make sure to check in a pg_dump file (i.e. pg_dump -Fc db_name -f seed.dump)
# ADD ./data /data

# ADD dockerSchema.sql dockerSchema.sql

# # Run the initializatiocdn script (leave this alone)
# RUN gosu postgres /init.sh \
#   # Uncomment the following line for a custom pg_restore command. Edit as needed
#   #"pg_restore --no-acl --no-owner -c -v -d $POSTGRES_DB < seed.dump"

# FROM ubuntu

# RUN apt-get update && apt-get install -my wget gnupg
# # Add the PostgreSQL PGP key to verify their Debian packages.
# # It should be the same key as https://www.postgresql.org/media/keys/ACCC4CF8.asc
# RUN apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys B97B0AFCAA1A47F044F244A07FCC7D46ACCC4CF8

# # Add PostgreSQL's repository. It contains the most recent stable release
# #     of PostgreSQL, ``9.3``.
# RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ precise-pgdg main" > /etc/apt/sources.list.d/pgdg.list

# # Install ``python-software-properties``, ``software-properties-common`` and PostgreSQL 9.3
# #  There are some warnings (in red) that show up during the build. You can hide
# #  them by prefixing each apt-get statement with DEBIAN_FRONTEND=noninteractive
# RUN apt-get update && apt-get install -y python-software-properties software-properties-common postgresql-10.3 postgresql-client-10.3 postgresql-contrib-10.3

# # Note: The official Debian and Ubuntu images automatically ``apt-get clean``
# # after each ``apt-get``

# # Run the rest of the commands as the ``postgres`` user created by the ``postgres-9.3`` package when it was ``apt-get installed``
# USER postgres

# # Create a PostgreSQL role named ``docker`` with ``docker`` as the password and
# # then create a database `docker` owned by the ``docker`` role.
# # Note: here we use ``&&\`` to run commands one after the other - the ``\``
# #       allows the RUN command to span multiple lines.
# RUN    /etc/init.d/postgresql start &&\
#     psql --command "CREATE USER docker WITH SUPERUSER PASSWORD 'docker';" &&\
#     createdb -O docker docker

# # Adjust PostgreSQL configuration so that remote connections to the
# # database are possible.
# RUN echo "host all  all    0.0.0.0/0  md5" >> /etc/postgresql/9.3/main/pg_hba.conf

# # And add ``listen_addresses`` to ``/etc/postgresql/9.3/main/postgresql.conf``
# RUN echo "listen_addresses='*'" >> /etc/postgresql/9.3/main/postgresql.conf

# # Expose the PostgreSQL port
# EXPOSE 5432

# # Add VOLUMEs to allow backup of config, logs and databases
# VOLUME  ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql"]

# # Set the default command to run when starting the container
# CMD ["/usr/lib/postgresql/9.3/bin/postgres", "-D", "/var/lib/postgresql/9.3/main", "-c", "config_file=/etc/postgresql/9.3/main/postgresql.conf"]

# ENV POSTGRES_USER postgres
# ENV POSTGRES_DB petsdc_buying

# # Uncomment the following ADD line to enable seeding the PostgreSQL DB
# # Make sure to check in a pg_dump file (i.e. pg_dump -Fc db_name -f seed.dump)
# ADD seed.dump /seed.dump

# # Run the initialization script (leave this alone)
# RUN gosu postgres /init.sh \
#   # Uncomment the following line for a custom pg_restore command. Edit as needed
#   "pg_restore --no-acl --no-owner -c -v -d $POSTGRES_DB < seed.dump"
