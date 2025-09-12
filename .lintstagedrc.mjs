import { relative } from 'path'

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames.map((f) => relative(process.cwd(), f)).join(' ')}`

const config = {
  '*.{js,jsx,ts,tsx,mjs}': [buildEslintCommand],
  '*.{ts,tsx,js,jsx,json,css,md,yml}': 'prettier --write',
}

export default config
