start:
	deno run --allow-env --allow-net --allow-read mod.ts

dev:
	deno run --watch --allow-env --allow-net --allow-read mod.ts

fmt:
	deno fmt

lint:
	deno lint

compile:
	deno compile --allow-env --allow-net --allow-read mod.ts

test:
	deno test
