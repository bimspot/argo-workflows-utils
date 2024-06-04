FROM node:19-alpine
WORKDIR /home/node
COPY . /home/node/
RUN npm ci
WORKDIR /home/node
CMD ["node", "index.js"]
