import { lookup } from "https://deno.land/x/media_types/mod.ts";

const files = {};

const fileResponse = async (path) => {

  const alreadyReturnedFile = files[path];
  if (alreadyReturnedFile) {
    console.info({
      text: 'Serving cached response',
      path,
      encoedPath,
      cachedTime: alreadyReturnedFile.time
    });
    return alreadyReturnedFile.response;
  }

  const encodedPath = (path === '/') ? `./webserver/index.html` : `./webserver${path}`;

  try {
    const file = await Deno.readFile(encodedPath);
    const response = new Response(file, {
      headers: {
        "content-type": lookup(encodedPath)
      },
    });

    files[path] = { response, time: Date.now() };
    console.info({
      text: 'Serving none cached response',
      path,
      encoedPath
    });
    return response;

  } catch (error) {
    console.error({
      path,
      encodedPath,
      error
    });

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