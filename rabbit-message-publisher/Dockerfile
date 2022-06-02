FROM node:17-alpine
WORKDIR /home/node
COPY . /home/node/
RUN npm ci
WORKDIR /home/node
CMD ["node", "publisher.js"]
