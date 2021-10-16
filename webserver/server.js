import { files } from "./files.js";

const fileResponse = async (path) => {

  const fileInfo = files[path];

  try {
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