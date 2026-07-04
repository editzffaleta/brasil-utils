/** Remove tudo que não for dígito, retornando apenas os números da string. */
export const onlyDigits = (value: string): string => value.replace(/\D/g, '')

/** Indica se a string é composta por um único dígito repetido (ex.: `'11111'`). */
export const isRepeated = (digits: string): boolean =>
  digits.length > 0 && /^(\d)\1*$/.test(digits)
