import { lookup } from "https://deno.land/x/media_types/mod.ts";
import { join } from "https://deno.land/std@0.105.0/path/mod.ts";

const files = {};

const fileResponse = async (path) => {

  const alreadyReturnedFile = files[path];
  if (alreadyReturnedFile) return alreadyReturnedFile;

  const encodedPath = (path === '/') ? join('.', 'index.html') : join('.', path);

  try {
    const file = await Deno.readFile(encodedPath);
    const response = new Response(file, {
      headers: {
        "content-type": lookup(encodedPath)
      },
    });

    files[path] = response;
    return response;

  } catch (error) {
    console.error(error);

    return new Response('does not exist', {
      status: 404
    });
  }
}

async function handleRequest(request) {
  const { pathname } = new URL(request.url);

  return await fileResponse(pathname);
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});