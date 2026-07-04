import js from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: [
      'dist',
      'coverage',
      'node_modules',
      // Diretórios de tooling que não fazem parte da biblioteca publicada
      '.claude',
      '.agents',
      '.cursor',
      '.windsurf',
      'changes-templates',
      'docs',
      'scripts',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
)
