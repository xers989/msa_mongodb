FROM node:lts-alpine as build-stage
# Set /app as working directory
RUN mkdir -p /app
WORKDIR /app
# Copy All files into /app directory
ADD . /app
# Running npm install
RUN npm install
RUN npm i -D nodemon

# expose port is 8080
EXPOSE 3000
# Web Server running - Nginx
CMD [ "npm", "start" ]
