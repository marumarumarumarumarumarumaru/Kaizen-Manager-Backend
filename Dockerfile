# Copyright 2019 Google LLC. All rights reserved.
# Use of this source code is governed by the Apache 2.0
# license that can be found in the LICENSE file.

# Use the official lightweight Node.js 10 image.
# https://hub.docker.com/_/node
FROM node:16

# Create and change to the app directory.
WORKDIR /app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install dependencies.
# If you add a package-lock.json speed your build by switching to 'npm ci'.
# RUN npm ci --only=production
RUN npm install --production

# Copy local code to the container image.
COPY . ./

ENV PORT=8080
ENV DB_USER='root'
ENV DB_PASS=''
ENV DB_NAME='kaizen-manager-database'
ENV INSTANCE_CONNECTION_NAME='kaizen-manager-backend:us-central1:kaizen-manager-database'
ENV GOOGLE_APPLICATION_CREDENTIALS='./kaizen-manager-backend-ffb3df357ace.json'
ENV CLOUD_DEPLOYMENT='true'

EXPOSE ${PORT}

# Run the web service on container startup.
CMD [ "npm", "start" ]
