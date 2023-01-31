# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

RUN npm i --save @nestjs/passport passport
RUN npm i --save @nestjs/jwt
RUN npm i passport-jwt --save

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]

# # Base image
# FROM node:18

# WORKDIR /usr/src/app

# # installing all package.json requirements
# RUN npm install

# # Bundle app source 
# COPY . .

# # installing all package.json requirements
# RUN npm run build

# # Starting the server
# CMD ["nest", "start", "--watch"]