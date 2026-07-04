import { expect, test } from 'vitest'
import { cpf } from './cpf'

test('valida CPFs corretos (com e sem máscara)', () => {
  expect(cpf.isValid('111.444.777-35')).toBe(true)
  expect(cpf.isValid('11144477735')).toBe(true)
  expect(cpf.isValid('529.982.247-25')).toBe(true)
})

test('rejeita CPFs inválidos', () => {
  expect(cpf.isValid('111.444.777-00')).toBe(false) // DV errado
  expect(cpf.isValid('111.111.111-11')).toBe(false) // repetido
  expect(cpf.isValid('123')).toBe(false) // comprimento
  expect(cpf.isValid('')).toBe(false)
})

test('formata e limpa', () => {
  expect(cpf.format('11144477735')).toBe('111.444.777-35')
  expect(cpf.strip('111.444.777-35')).toBe('11144477735')
})

test('generate sempre produz CPF válido', () => {
  for (let i = 0; i < 200; i++) {
    const gerado = cpf.generate()
    expect(cpf.isValid(gerado)).toBe(true)
  }
  expect(cpf.generate(true)).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
})
