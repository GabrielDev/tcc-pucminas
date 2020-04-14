#!/usr/bin/env bash

# Connect database
running=`docker ps --format '{{.Names}}' | grep doggisApp-MYSQL | wc -l`

if [ $running == "1" ]; then
  docker run --rm -it --link doggisApp-MYSQL:mysql mysql:5.7.29 sh -c 'exec mysql -h"$MYSQL_PORT_3306_TCP_ADDR" -P"$MYSQL_PORT_3306_TCP_PORT" -uroot -p"Doggis@2020"'
else
  echo "Container stopped"
fi