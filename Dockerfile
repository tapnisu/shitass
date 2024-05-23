FROM denoland/deno:alpine

USER deno
WORKDIR /app

ADD . /app
RUN deno task cache
ENV MODE=production

CMD ["task", "start"]
