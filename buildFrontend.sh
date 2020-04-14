
#!/usr/bin/env bash

#Create DOCKER_PATH
export DOCKER_PATH=doggis-ui

echo "Build docker image and add a descriptive tag with: $DOCKER_PATH"
docker build --tag=$DOCKER_PATH ./doggis-ui/.

docker tag $DOCKER_PATH $DOCKER_PATH
