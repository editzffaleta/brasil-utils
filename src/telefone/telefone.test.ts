import { expect, test } from 'vitest'
import { telefone } from './telefone'

test('valida celular e fixo', () => {
  expect(telefone.isValid('(11) 98765-4321')).toBe(true)
  expect(telefone.isValid('11987654321')).toBe(true)
  expect(telefone.isValid('1133224455')).toBe(true) // fixo
  expect(telefone.isValid('+55 11 98765-4321')).toBe(true) // com código do país
})

test('rejeita inválidos', () => {
  expect(telefone.isValid('(00) 98765-4321')).toBe(false) // DDD inexistente
  expect(telefone.isValid('(11) 8765-4321')).toBe(false) // celular sem o 9
  expect(telefone.isValid('11 1234-5678')).toBe(false) // fixo iniciando em 1
  expect(telefone.isValid('123')).toBe(false)
})

test('isMobile distingue celular de fixo', () => {
  expect(telefone.isMobile('11987654321')).toBe(true)
  expect(telefone.isMobile('1133224455')).toBe(false)
})

test('formata celular e fixo', () => {
  expect(telefone.format('11987654321')).toBe('(11) 98765-4321')
  expect(telefone.format('1133224455')).toBe('(11) 3322-4455')
  expect(telefone.format('+5511987654321')).toBe('(11) 98765-4321')
  expect(telefone.strip('+55 (11) 98765-4321')).toBe('11987654321')
})

test('format devolve os dígitos limpos quando o comprimento não é 10/11', () => {
  expect(telefone.format('123')).toBe('123')
})
