import { applyMask, isRepeated, mod11Dv, onlyDigits } from '../_internal'

const PESOS_DV1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
const PESOS_DV2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

/** Remove máscara e mantém apenas os dígitos do CNPJ. */
function strip(value: string): string {
  return onlyDigits(value)
}

/**
 * Valida um CNPJ numérico (com ou sem máscara) pelos dois dígitos
 * verificadores. Rejeita comprimento diferente de 14 e sequências repetidas.
 *
 * Nota: o CNPJ alfanumérico (Receita Federal, a partir de jul/2026) está fora
 * do escopo desta versão — valida-se apenas o CNPJ numérico atual.
 *
 * @example cnpj.isValid('11.222.333/0001-81') // true
 */
function isValid(value: string): boolean {
  const d = strip(value)
  if (d.length !== 14 || isRepeated(d)) return false
  if (mod11Dv(d, PESOS_DV1) !== Number(d[12])) return false
  return mod11Dv(d, PESOS_DV2) === Number(d[13])
}

/**
 * Formata os dígitos como CNPJ (`##.###.###/####-##`). Leniente.
 *
 * @example cnpj.format('11222333000181') // '11.222.333/0001-81'
 */
function format(value: string): string {
  return applyMask(strip(value), '##.###.###/####-##')
}

/**
 * Gera um CNPJ válido fictício (matriz `0001`). Nunca gera sequência repetida.
 *
 * @param comMascara quando `true`, retorna formatado.
 */
function generate(comMascara = false): string {
  let base: string
  do {
    base = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('') + '0001'
  } while (isRepeated(base))
  const dv1 = mod11Dv(base, PESOS_DV1)
  const dv2 = mod11Dv(`${base}${dv1}`, PESOS_DV2)
  const full = `${base}${dv1}${dv2}`
  return comMascara ? format(full) : full
}

export const cnpj = { isValid, format, strip, generate }
