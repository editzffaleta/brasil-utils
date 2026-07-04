/**
 * Calcula um dígito verificador pela regra do módulo 11.
 *
 * Multiplica cada dígito pelo peso correspondente, soma os produtos e obtém o
 * resto da divisão por 11. Se o resto for menor que 2, o dígito é `0`; caso
 * contrário, é `11 - resto`. Agnóstico aos pesos: quem chama informa os pesos
 * (CPF e CNPJ usam conjuntos diferentes).
 */
export function mod11Dv(digits: string, pesos: number[]): number {
  const soma = pesos.reduce((acc, peso, i) => acc + Number(digits[i]) * peso, 0)
  const resto = soma % 11
  return resto < 2 ? 0 : 11 - resto
}
