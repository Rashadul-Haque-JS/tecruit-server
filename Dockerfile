# Use an official Node runtime as the parent image
# No change here, node:14 is a good, stable version for most applications.
FROM node:14

# Set the working directory in the container
# This is good as it creates a directory within your Docker container and sets it as the working space.
# Within this directory, your application's code will reside.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
# It's good that you're copying these files over before the rest of your code.
# This takes advantage of cached Docker layers and only re-installs your npm packages if these files change.
COPY package*.json ./

# Install the project dependencies
# A common mistake is not handling production vs development dependencies.
# If you're building a production image, you should only install the necessary packages for production.
# Adding '--only=production' ensures we are not installing devDependencies.
RUN npm install --only=production

# Bundle app source inside the Docker image
# After installing dependencies, the rest of your application is copied into the image.
COPY . .

# Your app binds to port 8080, so you'll use the EXPOSE instruction to have it mapped by the Docker daemon
# The EXPOSE command is good practice because it helps document which ports are intended to be published.
# It doesn't actually publish the port. It's used to inform Docker that the container will listen on the specified port at runtime.
EXPOSE 8080

# Define the command to run your app
# Here, you are telling Docker how to run your application. This looks good, assuming 'index.js' is your entry point.
CMD [ "node", "index.js" ]

# Depending on your application, you might need additional environment variables or commands.
# If you require any environment variables to be set for your Node.js app, you can use ENV instructions in the Dockerfile.
# Additionally, for debugging, it might be helpful to add a log statement at the start of your application to ensure it's starting up correctly.
