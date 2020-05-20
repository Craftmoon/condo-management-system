FROM node:alpine

# set working directory
WORKDIR /frontend
RUN echo "Workdir set to /frontend"

# install app dependencies
COPY package.json ./
RUN echo "package.json copied to the Workdir"

RUN npm install
RUN echo "Npm installed all dependencies"

# add app
COPY . ./

RUN echo "Copied the project to the Workdir"
EXPOSE 3000

# start app
CMD ["npm", "start"]