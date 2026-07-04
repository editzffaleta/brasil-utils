/**
 * Aplica uma máscara posicional sobre os dígitos informados. Cada `#` do
 * padrão é substituído, na ordem, por um dígito; quando os dígitos acabam, os
 * separadores restantes são descartados (comportamento leniente para `format`).
 *
 * @example applyMask('12345678900', '###.###.###-##') // '123.456.789-00'
 */
export function applyMask(digits: string, pattern: string): string {
  let i = 0
  return pattern.replace(/#/g, () => digits[i++] ?? '').replace(/[^\d]+$/g, '')
}
