FROM node:16 as builder
WORKDIR /usr/src/app 
COPY package.json . 
RUN npm install 
COPY . . 
RUN npm run build 

FROM node:16 as runner 
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app . 
EXPOSE 5000 
ENTRYPOINT [ "npm", "start" ]
