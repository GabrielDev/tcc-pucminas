#!/usr/bin/env bash

# Create directory for mysql volume
if [ ! -d ".mysql" ] 
then
    mkdir .mysql
fi

# start database
running=`docker ps --format '{{.Names}}' | grep doggisApp-MYSQL | wc -l`

if [ $running == "1" ]; then
  echo "Container already started"
else
    docker run --rm -p 3306:3306 --name doggisApp-MYSQL -v $(PWD)/.mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=Doggis@2020 -e MYSQL_DATABASE=doggis -e MYSQL_USER=doggisApp -e MYSQL_PASSWORD=Doggis@2019 -d  mysql:5.7.29
fi