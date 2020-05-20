# Dockerfile for react served on NGINX
# ------------------------------------

FROM node:12.2.0-alpine as react_build 
WORKDIR /app

# Copy React codebase to container
# --------------------------------

COPY . /app/ 

# Prepare container for building react app
# ----------------------------------------
RUN npm install
RUN npm install react-scripts@3.0.1 -g

# Get production build for NGINX
RUN npm run build 

# Prepare NGINX
# --------------

FROM nginx:1.16.0-alpine
# Copy static react build to nginx directory 
COPY --from=react_build /app/build /usr/share/nginx/html
# Replace nginx config
RUN rm /etc/nginx/conf.d/default.conf
# Copy custom nginx config to containers nginx config
COPY nginx/nginx.conf /etc/nginx/conf.d

# Fire up NGINX
# ----------------------------------------

EXPOSE 80
CMD ["nginx","-g","daemon off;"]
