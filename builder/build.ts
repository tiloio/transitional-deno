import {
    VERSION,
    compile,
    parse,
    preprocess,
    walk,
} from "https://cdn.jsdelivr.net/npm/svelte@3.42.3/compiler.mjs";
import {
    transform
} from "https://deno.land/x/esbuild@v0.12.23/mod.js";
import * as esbuild from "https://deno.land/x/esbuild@v0.12.5/mod.js";

export const build = async () => {
    const compilate = compile(await Deno.readTextFile("./test.svelte"), {
        filename: 'test',
        generate: "dom",
        dev: false,
        sveltePath: "https://cdn.skypack.dev/svelte@3.42.3",
        hydratable: true,
        preserveComments: false,
        preserveWhitespace: false,
    });

    console.log(compilate);

    // await esbuild.build({
    //     entryPoints: ["./src/mod.ts"],
    //     outfile: "minifiedjs",
    //     format: "esm",
    //     bundle: true,
    //     minify: true,
    //     sourcemap: false,
    // })

    const minified = await esbuild.transform(compilate!.js!.code!, {
        minify: true,
      });
      esbuild.stop();
    Deno.writeTextFile('minified.js', minified.code);
    Deno.writeTextFile('output.js', compilate!.js!.code!);
}

await build();