#!/usr/bin/env bash

# stop database
running=`docker ps --format '{{.Names}}' | grep doggisApp-MYSQL | wc -l`

if [ $running == "1" ]; then
    docker stop doggisApp-MYSQL
else
    echo "Container already stopped"
fi