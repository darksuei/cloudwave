FROM node

RUN mkdir -p /app/client

WORKDIR /app/client

COPY package*.json /app/client/

RUN npm install

COPY . /app/client/

EXPOSE 5000

CMD ["npm", "start"]