import { expect, test } from 'vitest'
import { cep } from './cep'

test('valida CEP com e sem máscara', () => {
  expect(cep.isValid('01001-000')).toBe(true)
  expect(cep.isValid('01001000')).toBe(true)
})

test('rejeita CEP inválido', () => {
  expect(cep.isValid('00000-000')).toBe(false)
  expect(cep.isValid('1234')).toBe(false)
  expect(cep.isValid('123456789')).toBe(false)
  expect(cep.isValid('')).toBe(false)
})

test('formata e limpa', () => {
  expect(cep.format('01001000')).toBe('01001-000')
  expect(cep.strip('01001-000')).toBe('01001000')
})
