import { req, res, Server } from "https://deno.land/x/faster/mod.ts";
import { fg } from "https://deno.land/x/colorify/mod.ts";

const server = new Server();
server.post("/", res("json"), req("json"), async (ctx: any, next: any) => {
  let color = ctx.body.color;
  let frase = ctx.url.searchParams.get("frase");
  let colorFunction;

  for (let key of Object.keys(fg)) {
    if (key == color) {
      colorFunction = key;
    }
  }

  console.log(fg[colorFunction](frase));

  await next();
});
await server.listen({ port: 8080 });
