
#!/usr/bin/env bash

#Create DOCKER_PATH
export DOCKER_PATH=doggis

./startMySqlDB.sh

cd doggis

mvn install

echo "Build docker image and add a descriptive tag with: $DOCKER_PATH"
docker build --tag=$DOCKER_PATH .

docker tag $DOCKER_PATH $DOCKER_PATH

cd ..

./stopMySqlDB.sh