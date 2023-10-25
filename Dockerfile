# Step 1: Choose the base image for Node version 14
FROM node:14

# Step 2: Set the working directory in the Docker container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Step 4: Install the dependencies from the package.json
RUN npm install

# Step 5: Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Step 6: Your app binds to port 8990 so you'll use the EXPOSE instruction to have it mapped by the Docker daemon
EXPOSE 8990

# Step 7: Define the environment variable
ENV PORT=8990

# Step 8: Specify the command to run your app
# Note: We changed from "node" to "npm" and run the script command "start" defined in your package.json
CMD [ "npm", "start" ]
