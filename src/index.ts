#!/usr/bin/env node
import fs from 'fs'

const packageJson = require('../package.json')
const yargs = require('yargs')

yargs
  .scriptName('create-script')
  .usage('$0 [name]')
  .version(packageJson.version)
  .command(
    '* [name]',
    'create a project named [name]',
    (yargs: any) => {
      yargs.positional('name', {
        type: 'string',
        describe: 'the name of the project',
      })
    },
    async ({ name }: { name: string }) => {
      if (!name) {
        yargs.showHelp()
        return
      }
      const rootFolder = `${process.cwd()}/${name}`
      const exists = await fs.existsSync(rootFolder)
      if (exists) {
        console.log(`Le script ${name} existe déjà.`)
        return
      }
      await fs.mkdirSync(rootFolder)
      console.log(`${rootFolder} créé`)
      await fs.writeFileSync(
        `${rootFolder}/package.json`,
        `{
  "name": "${name}",
  "version": "1.0.0",
  "main": "build/index.js",
  "license": "MIT",
  "scripts": {
    "build": "node build.mjs && cp build/index.js /usr/local/bin/${name} && chmod a+x /usr/local/bin/${name}"
  },
  "devDependencies": {
    "@types/node": "^20.4.0",
    "@types/yargs": "^17.0.24",
    "esbuild": "^0.18.11",
    "prettier": "^3.0.0",
    "tiny-glob": "^0.2.9",
    "tsc": "^2.0.4",
    "typescript": "^5.1.6"
  },
  "dependencies": {
    "yargs": "^17.7.2"
  }
}
`
      )
      console.log(`${rootFolder}/package.json créé`)
      await fs.writeFileSync(
        `${rootFolder}/.prettierrc.cjs`,
        `module.exports = {
  jsxBracketSameLine: true,
  printWidth: 120,
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  tabWidth: 2,
}`
      )
      console.log(`${rootFolder}/.prettierrc.cjs créé`)
      await fs.writeFileSync(
        `${rootFolder}/build.mjs`,
        `import * as esbuild from 'esbuild'
import glob from 'tiny-glob'

let entryPoints = await glob('./src/*.ts')

await esbuild.build({
  entryPoints,
  bundle: true,
  outdir: 'build',
  platform: 'node',
  minify: true,
})
`
      )
      console.log(`${rootFolder}/build.mjs créé`)
      await fs.writeFileSync(
        `${rootFolder}/tsconfig.json`,
        `{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "outDir": "./build",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
`
      )
      console.log(`${rootFolder}/tsconfig.json créé`)
      await fs.mkdirSync(`${rootFolder}/src`)
      console.log(`${rootFolder}/src créé`)
      await fs.writeFileSync(
        `${rootFolder}/src/index.ts`,
        `#!/usr/bin/env node

`
      )
      console.log(`${rootFolder}/src/index.ts créé`)
    }
  )
  .help(true).argv
