import { applyMask, isRepeated, mod11Dv, onlyDigits } from '../_internal'

const PESOS_DV1 = [10, 9, 8, 7, 6, 5, 4, 3, 2]
const PESOS_DV2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]

/** Remove máscara e mantém apenas os dígitos do CPF. */
function strip(value: string): string {
  return onlyDigits(value)
}

/**
 * Valida um CPF (com ou sem máscara) pelos dois dígitos verificadores.
 * Rejeita comprimento diferente de 11 e sequências repetidas (ex.: `111...`).
 *
 * @example cpf.isValid('111.444.777-35') // true
 */
function isValid(value: string): boolean {
  const d = strip(value)
  if (d.length !== 11 || isRepeated(d)) return false
  if (mod11Dv(d, PESOS_DV1) !== Number(d[9])) return false
  return mod11Dv(d, PESOS_DV2) === Number(d[10])
}

/**
 * Formata os dígitos como CPF (`###.###.###-##`). Leniente: aplica a máscara
 * sobre os dígitos presentes, sem validar.
 *
 * @example cpf.format('11144477735') // '111.444.777-35'
 */
function format(value: string): string {
  return applyMask(strip(value), '###.###.###-##')
}

/**
 * Gera um CPF válido fictício (útil para testes/mocks). Nunca gera sequência
 * repetida.
 *
 * @param comMascara quando `true`, retorna formatado (`###.###.###-##`).
 */
function generate(comMascara = false): string {
  let base: string
  do {
    base = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('')
  } while (isRepeated(base))
  const dv1 = mod11Dv(base, PESOS_DV1)
  const dv2 = mod11Dv(`${base}${dv1}`, PESOS_DV2)
  const full = `${base}${dv1}${dv2}`
  return comMascara ? format(full) : full
}

export const cpf = { isValid, format, strip, generate }
