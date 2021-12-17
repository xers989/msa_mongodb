FROM node:lts-alpine as build-stage
# Set /app as working directory
WORKDIR /app
# Copy All files into /app directory
COPY package*.json ./
# Running npm install
RUN npm install
# RUN npm install --save vue-chartjs
COPY . .
RUN npm run build

#production
FROM nginx:alpine as production-stage
#COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx/nginx.conf /etc/nginx/conf.d

# expose port is 8080
EXPOSE 8080
# Web Server running - Nginx
CMD [ "nginx", "-g", "daemon off;" ]
