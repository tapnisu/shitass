FROM denoland/deno:alpine-2.1.7
LABEL authors="tapnisu"

WORKDIR /app
COPY . .
RUN deno task cache
ENV MODE=production

CMD ["task", "start"]
