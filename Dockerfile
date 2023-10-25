# Use an official Node runtime as the parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Bundle app source inside the Docker image
COPY . .

# Your app binds to port 8080, so you'll use the EXPOSE instruction to have it mapped by the Docker daemon
EXPOSE 8080

# Define the command to run your app
CMD [ "node", "index.js" ]
