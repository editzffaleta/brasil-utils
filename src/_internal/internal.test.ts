import { expect, test } from 'vitest'
import { applyMask, isRepeated, mod11Dv, onlyDigits } from './index'

test('onlyDigits mantém apenas números', () => {
  expect(onlyDigits('123.456-78')).toBe('12345678')
  expect(onlyDigits('abc')).toBe('')
})

test('isRepeated detecta sequência de um único dígito', () => {
  expect(isRepeated('11111')).toBe(true)
  expect(isRepeated('11211')).toBe(false)
  expect(isRepeated('')).toBe(false)
})

test('mod11Dv calcula o dígito verificador conforme os pesos', () => {
  // Base do CPF 111.444.777-XX → primeiro DV = 3, segundo DV = 5.
  expect(mod11Dv('111444777', [10, 9, 8, 7, 6, 5, 4, 3, 2])).toBe(3)
  expect(mod11Dv('1114447773', [11, 10, 9, 8, 7, 6, 5, 4, 3, 2])).toBe(5)
})

test('applyMask aplica máscara posicional', () => {
  expect(applyMask('12345678900', '###.###.###-##')).toBe('123.456.789-00')
})

test('applyMask não deixa separador solto com dígitos parciais', () => {
  expect(applyMask('123', '###.###.###-##')).toBe('123')
  expect(applyMask('1234', '###.###.###-##')).toBe('123.4')
})
