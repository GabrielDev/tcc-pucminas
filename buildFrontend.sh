
#!/usr/bin/env bash

#Create DOCKER_PATH
export DOCKER_PATH=fabiotavarespr/doggis-ui

# Step 1:  
# Authenticate & tag
echo "Docker ID and Image: $DOCKER_PATH"
docker login

# Step 2:
# Build image and add a descriptive tag
echo "Build docker image and add a descriptive tag with: $DOCKER_PATH"
docker build --tag=$DOCKER_PATH ./doggis-ui/.

docker tag $DOCKER_PATH $DOCKER_PATH

# Step 3:
# Push image to a docker repository
docker push $DOCKER_PATH