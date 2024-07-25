# base image
FROM node:lts

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

COPY package*.json ./

RUN apt-get -qy update && apt-get -qy install openssl

# install dependencies
RUN yarn install
COPY . .
# start app
RUN yarn run build
EXPOSE 3000
CMD yarn run start