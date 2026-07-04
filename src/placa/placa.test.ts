import { expect, test } from 'vitest'
import { placa } from './placa'

test('reconhece o tipo da placa', () => {
  expect(placa.getTipo('ABC-1234')).toBe('antiga')
  expect(placa.getTipo('abc1234')).toBe('antiga')
  expect(placa.getTipo('ABC1D23')).toBe('mercosul')
  expect(placa.getTipo('AB1234')).toBe(null)
  expect(placa.getTipo('ABC12D3')).toBe(null)
})

test('valida placas', () => {
  expect(placa.isValid('ABC-1234')).toBe(true)
  expect(placa.isValid('ABC1D23')).toBe(true)
  expect(placa.isValid('1234ABC')).toBe(false)
  expect(placa.isValid('')).toBe(false)
})

test('formata por tipo', () => {
  expect(placa.format('ABC1234')).toBe('ABC-1234')
  expect(placa.format('abc-1234')).toBe('ABC-1234')
  expect(placa.format('ABC1D23')).toBe('ABC1D23')
  expect(placa.strip('abc-1234')).toBe('ABC1234')
})
