# stage1 as builder
FROM node:10-alpine as builder

# copy the package.json to install dependencies
COPY package.json package-lock.json ./

# Install the dependencies and make the folder
RUN npm install && mkdir /doggis-ui && mv ./node_modules ./doggis-ui

WORKDIR /doggis-ui

COPY . .

# Build the project and copy the files
RUN npm run ng build -- --deploy-url=/ --prod


FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy builder stage 1 from the stahg 2
COPY --from=builder /doggis-ui/dist /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
