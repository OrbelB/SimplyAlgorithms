#Dockerfile start with lightweight version of node
FROM node:alpine 
#create a working directory call /app
WORKDIR /app

#copy this file into it
COPY package.json .

# install the dependencies
RUN npm install

#copy the rest of the stuff
COPY . .

#create the minimized version of our app to host that to the server
RUN npm run build


FROM nginx

# copy from the starting building directory and find the static assets to
# to hosted to the server
COPY --from=0 /app/build /usr/share/nginx/html

#COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# EXPOSE 3001

#run this command afterwards
CMD ["npm", "run", "start"]