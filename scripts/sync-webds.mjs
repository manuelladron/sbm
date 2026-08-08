/**
 * Re-vendor @higharc/web-ds design tokens into static/css/webds/.
 *
 * The page is a static site (no build step), so the token CSS is
 * committed. Run `npm install && npm run sync-webds` after bumping
 * the @higharc/web-ds version to refresh the vendored files.
 * Requires GitHub Packages auth for the @higharc scope (see .npmrc).
 *
 * Copies verbatim: src/styles/tokens/*.css and src/styles/fonts/global.css.
 * Hand-maintained (never overwritten): webds/theme.css, webds/index.css.
 */
import { copyFile, mkdir, readdir } from 'node:fs/promises'
import { createRequire } from 'node:module'
import path from 'node:path'

const require = createRequire(import.meta.url)
const pkgRoot = path.dirname(require.resolve('@higharc/web-ds/package.json'))
const src = path.join(pkgRoot, 'src', 'styles')
const dest = path.join(import.meta.dirname, '..', 'static', 'css', 'webds')

await mkdir(path.join(dest, 'tokens'), { recursive: true })

const tokenFiles = (await readdir(path.join(src, 'tokens'))).filter(
  (file) => file.endsWith('.css') && file !== 'index.css'
)

const copies = tokenFiles.map((file) =>
  copyFile(path.join(src, 'tokens', file), path.join(dest, 'tokens', file))
)
copies.push(copyFile(path.join(src, 'fonts', 'global.css'), path.join(dest, 'fonts.css')))

await Promise.all(copies)
console.error(`Synced ${copies.length} files from @higharc/web-ds into static/css/webds/`)
