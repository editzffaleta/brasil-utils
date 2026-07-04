/** Tipo de placa reconhecido. */
export type PlacaTipo = 'antiga' | 'mercosul'

const RE_ANTIGA = /^[A-Z]{3}[0-9]{4}$/
const RE_MERCOSUL = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/

/** Remove separadores/espaços e coloca em maiúsculas. */
function strip(value: string): string {
  return value.replace(/[^A-Za-z0-9]/g, '').toUpperCase()
}

/**
 * Retorna o tipo da placa (`'antiga'` = `AAA0000`, `'mercosul'` = `AAA0A00`) ou
 * `null` se não corresponder a nenhum formato.
 *
 * @example placa.getTipo('ABC1D23') // 'mercosul'
 */
function getTipo(value: string): PlacaTipo | null {
  const p = strip(value)
  if (RE_ANTIGA.test(p)) return 'antiga'
  if (RE_MERCOSUL.test(p)) return 'mercosul'
  return null
}

/**
 * Valida uma placa nos formatos antigo (`AAA-0000`) ou Mercosul (`AAA0A00`).
 *
 * @example placa.isValid('ABC-1234') // true
 */
function isValid(value: string): boolean {
  return getTipo(value) !== null
}

/**
 * Formata a placa: antiga como `AAA-0000`; Mercosul como `AAA0A00` (sem
 * separador). Placa inválida retorna os caracteres normalizados.
 *
 * @example placa.format('abc1234') // 'ABC-1234'
 */
function format(value: string): string {
  const p = strip(value)
  if (getTipo(p) === 'antiga') return `${p.slice(0, 3)}-${p.slice(3)}`
  return p
}

export const placa = { isValid, format, getTipo, strip }
