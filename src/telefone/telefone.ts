import { applyMask, onlyDigits } from '../_internal'

/** DDDs válidos no Brasil (Plano Nacional de Numeração). */
const DDDS_VALIDOS = new Set([
  11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43,
  44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77,
  79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
])

/**
 * Mantém apenas os dígitos e remove o código do país `55` quando presente
 * (12 ou 13 dígitos), retornando DDD + número (10 ou 11 dígitos).
 */
function strip(value: string): string {
  const d = onlyDigits(value)
  if ((d.length === 12 || d.length === 13) && d.startsWith('55')) return d.slice(2)
  return d
}

/**
 * Valida um telefone brasileiro (fixo ou celular), com ou sem máscara e com
 * `+55` opcional. Celular = 11 dígitos com `9` após o DDD; fixo = 10 dígitos
 * com primeiro dígito do número entre 2 e 5. O DDD precisa existir.
 *
 * @example telefone.isValid('(11) 98765-4321') // true
 */
function isValid(value: string): boolean {
  const d = strip(value)
  if (!DDDS_VALIDOS.has(Number(d.slice(0, 2)))) return false
  if (d.length === 11) return d[2] === '9'
  if (d.length === 10) {
    const primeiro = Number(d[2])
    return primeiro >= 2 && primeiro <= 5
  }
  return false
}

/** Indica se é um celular válido (11 dígitos). */
function isMobile(value: string): boolean {
  return isValid(value) && strip(value).length === 11
}

/**
 * Formata como `(##) #####-####` (celular) ou `(##) ####-####` (fixo). Se não
 * tiver 10/11 dígitos, retorna os dígitos limpos.
 *
 * @example telefone.format('11987654321') // '(11) 98765-4321'
 */
function format(value: string): string {
  const d = strip(value)
  if (d.length === 11) return applyMask(d, '(##) #####-####')
  if (d.length === 10) return applyMask(d, '(##) ####-####')
  return d
}

export const telefone = { isValid, isMobile, format, strip }
