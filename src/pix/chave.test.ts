import { expect, test } from 'vitest'
import { getTipoChave, isValidChave } from './chave'

test('identifica cada tipo de chave', () => {
  expect(getTipoChave('11144477735')).toBe('cpf')
  expect(getTipoChave('11222333000181')).toBe('cnpj')
  expect(getTipoChave('teste@exemplo.com')).toBe('email')
  expect(getTipoChave('+5511987654321')).toBe('telefone')
  expect(getTipoChave('123e4567-e89b-12d3-a456-426614174000')).toBe('aleatoria')
})

test('rejeita chaves inválidas', () => {
  expect(getTipoChave(`${'a'.repeat(70)}@exemplo.com`)).toBe(null) // e-mail > 77
  expect(getTipoChave('11987654321')).toBe(null) // telefone sem +55
  expect(getTipoChave('123e4567-e89b-12d3-a456')).toBe(null) // UUID incompleto
  expect(getTipoChave('11144477700')).toBe(null) // CPF com DV errado
  expect(getTipoChave('texto qualquer')).toBe(null)
})

test('isValidChave', () => {
  expect(isValidChave('teste@exemplo.com')).toBe(true)
  expect(isValidChave('texto qualquer')).toBe(false)
})
