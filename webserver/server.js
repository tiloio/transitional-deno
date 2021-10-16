import { lookup } from "https://deno.land/x/media_types/mod.ts";
import { files } from "./files";


const fileResponse = async (path) => {
  try {

    const fileInfo = files[path];
    if (!fileInfo) {
      console.error({
        error: 'File not in files list',
        path
      });
      return new Response('Not found', {
        status: 404
      });
    }

    const file = await Deno.readFile(fileInfo.path);
    const response = new Response(file, {
      headers: fileInfo.headers,
    });

    return response;

  } catch (error) {
    console.error({
      path,
      fileInfo,
      error
    });

    return new Response('Not found', {
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