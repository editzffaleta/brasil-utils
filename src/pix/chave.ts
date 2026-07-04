import { onlyDigits } from '../_internal'
import { cpf } from '../cpf'
import { cnpj } from '../cnpj'

/** Tipos de chave Pix reconhecidos. */
export type TipoChavePix = 'cpf' | 'cnpj' | 'email' | 'telefone' | 'aleatoria'

const RE_EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
const RE_TELEFONE = /^\+55\d{10,11}$/
const RE_UUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

/**
 * Identifica o tipo de uma chave Pix, ou `null` se não for reconhecida.
 * A ordem de checagem evita colisões: e-mail → telefone (`+55…`) → aleatória
 * (UUID) → CPF/CNPJ (por contagem de dígitos, confirmados por DV).
 *
 * @example pix.getTipoChave('+5511987654321') // 'telefone'
 */
function getTipoChave(value: string): TipoChavePix | null {
  if (RE_EMAIL.test(value) && value.length <= 77) return 'email'
  if (value.startsWith('+') && RE_TELEFONE.test(value)) return 'telefone'
  if (value.includes('-') && RE_UUID.test(value)) return 'aleatoria'
  const d = onlyDigits(value)
  if (d.length === 11 && cpf.isValid(value)) return 'cpf'
  if (d.length === 14 && cnpj.isValid(value)) return 'cnpj'
  return null
}

/**
 * Indica se a string é uma chave Pix válida de qualquer tipo.
 *
 * @example pix.isValidChave('teste@exemplo.com') // true
 */
function isValidChave(value: string): boolean {
  return getTipoChave(value) !== null
}

export { getTipoChave, isValidChave }
