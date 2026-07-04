import { expect, test } from 'vitest'
import { version } from './index'

test('expõe a versão do pacote', () => {
  expect(typeof version).toBe('string')
})
