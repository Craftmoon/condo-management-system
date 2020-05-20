FROM node:alpine

WORKDIR /backend
RUN echo "Workdir set to /backend"

COPY package*.json ./
RUN echo "package.json copied to the Workdir"

RUN npm install
RUN echo "Npm installed all dependencies"

COPY . .
RUN echo "Copied the project to the Workdir"

EXPOSE 4000

CMD ["npm", "start"]