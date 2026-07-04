import { expect, test } from 'vitest'
import { cnpj } from './cnpj'

test('valida CNPJs corretos (com e sem máscara)', () => {
  expect(cnpj.isValid('11.222.333/0001-81')).toBe(true)
  expect(cnpj.isValid('11222333000181')).toBe(true)
})

test('rejeita CNPJs inválidos', () => {
  expect(cnpj.isValid('11.222.333/0001-00')).toBe(false) // DV errado
  expect(cnpj.isValid('00.000.000/0000-00')).toBe(false) // repetido
  expect(cnpj.isValid('123')).toBe(false)
  expect(cnpj.isValid('')).toBe(false)
})

test('formata e limpa', () => {
  expect(cnpj.format('11222333000181')).toBe('11.222.333/0001-81')
  expect(cnpj.strip('11.222.333/0001-81')).toBe('11222333000181')
})

test('generate sempre produz CNPJ válido', () => {
  for (let i = 0; i < 200; i++) {
    expect(cnpj.isValid(cnpj.generate())).toBe(true)
  }
  expect(cnpj.generate(true)).toMatch(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)
})
