FROM node:18-alpine3.15
WORKDIR /app
COPY . . 
RUN npm i -g npm
RUN npm i -g serve
RUN npm install
RUN npm run build
EXPOSE 3500
CMD serve -s build