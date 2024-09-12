FROM node 

WORKDIR FRONTEND

COPY . .

RUN npm install

EXPOSE 2000

CMD [ "react-scripts start"]
