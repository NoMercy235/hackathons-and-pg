FROM node:carbon

# File Author / Maintainer
LABEL authors="Explore <jshacks2018@explore.com>"
MAINTAINER jshacks2018@explore.com

ENV PORT=4210

# Set work directory to /src
WORKDIR /src

# Copy app source
COPY . /src

# Install app dependencies
RUN npm install

EXPOSE $PORT

# Start command as per package.json
ENTRYPOINT ["npm", "start"]