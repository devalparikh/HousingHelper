# Docker file for server

#  Cache these dependencies
FROM node:9-slim
WORKDIR /app
COPY package.json /app
RUN npm install

# Copy the source files
COPY . /app
CMD ["npm", "start"]