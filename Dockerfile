FROM denoland/deno:alpine-2.2.6
LABEL authors="tapnisu"

WORKDIR /app
COPY . .
RUN deno task cache
ENV MODE=production

CMD ["task", "start"]
