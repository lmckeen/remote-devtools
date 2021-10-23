import { copyFile, mkdir } from 'fs/promises'
import esbuild from 'esbuild'
import glob from 'glob'
import path from 'path'

const watch = process.argv.includes('--watch')

function buildHtml() {
  glob.sync('src/**/*.html').forEach(html => {
    const pathParts = html.split('/')
    const fileName = pathParts.pop()
    const distPath = pathParts.join('/').replace('src', 'dist')

    mkdir(path.resolve(distPath), { recursive: true })
      .then(copyFile(
        path.resolve(html),
        path.resolve(`${distPath}/${fileName}`)
      ))
  })
}

esbuild.build({
  entryPoints: [
    ...glob.sync('src/**/*.js'),
    ...glob.sync('src/**/*.css') 
  ],
  minify: true,
  outdir: 'dist/',
  watch: watch ? { onRebuild: buildHtml } : false
}).then(buildHtml)
