import * as esbuild from 'esbuild'
import glob from 'tiny-glob'

let entryPoints = await glob('./src/*.ts')

await esbuild.build({
  entryPoints,
  bundle: true,
  outdir: 'build',
  platform: 'node',
  minify: true,
})
