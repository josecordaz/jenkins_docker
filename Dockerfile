FROM nginx:1.13.1
LABEL maintainer="josecordaz@gmail.com"

COPY dist/. /usr/share/nginx/html/

EXPOSE 80