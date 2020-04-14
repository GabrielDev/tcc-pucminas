#!/usr/bin/env bash

# Connect database
running=`docker ps --format '{{.Names}}' | grep mysqlscript | wc -l`
dbRunning=`docker ps --format '{{.Names}}' | grep doggisApp-MYSQL | wc -l`

if [ $dbRunning == "1" ]; then
  if [ $running != "1" ]; then
    docker run -d --rm --name mysqlscript --link doggisApp-MYSQL:mysql -e MYSQL_RANDOM_ROOT_PASSWORD=true -v $PWD:/tmp/scripts mysql:5.7.29
    docker exec -it mysqlscript sh -c 'mysql -h doggisApp-MYSQL -P 3306 -u root -pDoggis@2020 < /tmp/scripts/data.sql'
    docker stop mysqlscript
  else
    echo "Container stopped"
  fi
else
  echo "DB container not started - run startMySqlDB.sh scritp to start"
fi
