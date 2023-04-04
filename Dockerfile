FROM public.ecr.aws/docker/library/node:19.8.1-slim AS BUILD
WORKDIR /app
COPY ./package.json ./
RUN npm install -g npm@latest && npm i
COPY ./ ./
RUN npm run build

FROM public.ecr.aws/ubuntu/nginx:1.22-22.10_beta
RUN rm /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=BUILD /app/dist /usr/share/nginx/html
ENTRYPOINT ["nginx", "-g", "daemon off;"]
