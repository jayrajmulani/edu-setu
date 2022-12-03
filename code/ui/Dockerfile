FROM node:latest

RUN mkdir -p /usr/src/code/ui

WORKDIR /usr/src/code/ui


COPY . /usr/src/code/ui/

RUN npm ci

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s" ,"build" ,"-l","3000"]