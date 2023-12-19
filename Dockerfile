FROM node:21-alpine as ui-builder

WORKDIR /app

COPY . .

RUN npm install

ARG REACT_APP_API_ADDRESS

ENV REACT_APP_API_ADDRESS $REACT_APP_API_ADDRESS

RUN npm run build

FROM nginx
COPY --from=ui-builder /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

