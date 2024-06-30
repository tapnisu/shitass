FROM denoland/deno:alpine-1.44.4

USER deno
WORKDIR /app

ADD . /app
RUN deno task cache
ENV MODE=production

CMD ["task", "start"]
