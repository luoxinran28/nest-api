# Specify Node Version and Image
# Name Image development (can be anything)
FROM node:18-alpine AS development

# Specify Working directory inside container
WORKDIR /luoxinran/src/app

# Copy package-lock.json & package.json from host to inside container working directory
COPY ./ ./

# Install deps inside container
RUN yarn install
RUN yarn build

EXPOSE 3010

################
## PRODUCTION ##
################
# Build another image named production
FROM node:18-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set work dir
WORKDIR /luoxinran/src/app

COPY --from=development /luoxinran/src/app/ .

# httpserver set port
EXPOSE 3010
# websokcet set port
EXPOSE 9229

# run app
CMD [ "node", "dist/main"]