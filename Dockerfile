FROM node:9

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build
CMD npm run start

# Expose the port of the app thats running in the container.
EXPOSE 3000