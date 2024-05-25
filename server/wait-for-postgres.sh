#!/bin/bash
set -e

host="$1"
shift
cmd="$@"

until PGPASSWORD=${PASSWORD} psql -h "postgres" -p "5432" -U${DB_USERNAME} -d${DB_NAME}; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec $cmd