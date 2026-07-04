import { expect, test } from 'vitest'
import { gerarPayload, lerPayload } from './brcode'
import { crc16 } from './crc16'

test('CRC16-CCITT de referência', () => {
  // Valor de referência amplamente usado em exemplos do BR Code.
  expect(crc16('123456789')).toBe('29B1')
})

test('payload estático começa com 000201 e termina com 6304 + 4 hex', () => {
  const codigo = gerarPayload({ chave: 'teste@exemplo.com', nome: 'Fulano', cidade: 'Sao Paulo' })
  expect(codigo.startsWith('000201')).toBe(true)
  expect(codigo).toMatch(/6304[0-9A-F]{4}$/)
})

test('round-trip recupera os campos e valida o CRC', () => {
  const codigo = gerarPayload({
    chave: '11144477735',
    nome: 'João da Silva',
    cidade: 'São Paulo',
    txid: 'PEDIDO123',
  })
  const lido = lerPayload(codigo)
  expect(lido.crcValido).toBe(true)
  expect(lido.chave).toBe('11144477735')
  expect(lido.nome).toBe('Joao da Silva') // sem acento
  expect(lido.cidade).toBe('Sao Paulo')
  expect(lido.txid).toBe('PEDIDO123')
})

test('payload com valor inclui o campo 54', () => {
  const codigo = gerarPayload({
    chave: 'teste@exemplo.com',
    nome: 'Fulano',
    cidade: 'Sao Paulo',
    valor: 10.5,
  })
  const lido = lerPayload(codigo)
  expect(lido.valor).toBe(10.5)
  expect(lido.crcValido).toBe(true)
})

test('CRC inválido é detectado', () => {
  const codigo = gerarPayload({ chave: 'teste@exemplo.com', nome: 'Fulano', cidade: 'Sao Paulo' })
  const adulterado = `${codigo.slice(0, -4)}0000`
  expect(lerPayload(adulterado).crcValido).toBe(false)
})

test('descrição é incluída e recuperada', () => {
  const codigo = gerarPayload({
    chave: 'teste@exemplo.com',
    nome: 'Fulano',
    cidade: 'Sao Paulo',
    descricao: 'Pagamento',
  })
  expect(lerPayload(codigo).descricao).toBe('Pagamento')
})

test('lerPayload lida com string sem campos conhecidos', () => {
  const lido = lerPayload('000201')
  expect(lido.crcValido).toBe(false)
  expect(lido.chave).toBeUndefined()
  expect(lido.nome).toBeUndefined()
})
