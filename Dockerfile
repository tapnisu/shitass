FROM denoland/deno:alpine-2.1.9
LABEL authors="tapnisu"

WORKDIR /app
COPY . .
RUN deno task cache
ENV MODE=production

CMD ["task", "start"]
