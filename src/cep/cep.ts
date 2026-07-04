import { applyMask, onlyDigits } from '../_internal'

/** Remove máscara e mantém apenas os dígitos do CEP. */
function strip(value: string): string {
  return onlyDigits(value)
}

/**
 * Valida o formato de um CEP (8 dígitos, com ou sem hífen). Não faz consulta de
 * rede — a biblioteca é isomórfica e sem I/O; valida apenas a forma. `00000-000`
 * é considerado inválido.
 *
 * @example cep.isValid('01001-000') // true
 */
function isValid(value: string): boolean {
  const d = strip(value)
  return /^\d{8}$/.test(d) && d !== '00000000'
}

/**
 * Formata os dígitos como CEP (`#####-###`). Leniente.
 *
 * @example cep.format('01001000') // '01001-000'
 */
function format(value: string): string {
  return applyMask(strip(value), '#####-###')
}

export const cep = { isValid, format, strip }
