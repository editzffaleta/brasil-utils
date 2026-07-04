import { crc16 } from './crc16'

/** Dados para gerar um BR Code Pix estático ("copia e cola"). */
export interface PixPayloadInput {
  /** Chave Pix do recebedor. */
  chave: string
  /** Nome do recebedor (máx. 25 caracteres, sem acentos). */
  nome: string
  /** Cidade do recebedor (máx. 15 caracteres, sem acentos). */
  cidade: string
  /** Valor da cobrança em reais (opcional). */
  valor?: number
  /** Identificador da transação (default `***`). */
  txid?: string
  /** Descrição/mensagem opcional. */
  descricao?: string
}

/** Dados extraídos de um BR Code Pix. */
export interface PixPayloadLido {
  chave?: string
  nome?: string
  cidade?: string
  valor?: number
  txid?: string
  descricao?: string
  /** `true` se o CRC do payload confere. */
  crcValido: boolean
}

/** Codifica um campo no formato EMV TLV: id(2) + tamanho(2) + valor. */
function tlv(id: string, value: string): string {
  return id + value.length.toString().padStart(2, '0') + value
}

/** Decodifica uma sequência de campos TLV em um mapa id → valor. */
function parseTlv(str: string): Record<string, string> {
  const out: Record<string, string> = {}
  let i = 0
  while (i + 4 <= str.length) {
    const id = str.slice(i, i + 2)
    const len = Number(str.slice(i + 2, i + 4))
    out[id] = str.slice(i + 4, i + 4 + len)
    i += 4 + len
  }
  return out
}

/** Remove acentos, mantendo o texto compatível com o BR Code. */
function semAcento(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

/**
 * Gera o payload "copia e cola" (BR Code EMV) de um Pix estático, já com o CRC.
 *
 * @example pix.gerarPayload({ chave: 'teste@exemplo.com', nome: 'Fulano', cidade: 'Sao Paulo' })
 */
function gerarPayload(input: PixPayloadInput): string {
  const nome = semAcento(input.nome).slice(0, 25)
  const cidade = semAcento(input.cidade).slice(0, 15)
  const txid = input.txid ?? '***'
  const temValor = input.valor != null

  let mai = tlv('00', 'br.gov.bcb.pix') + tlv('01', input.chave)
  if (input.descricao) mai += tlv('02', semAcento(input.descricao))

  let payload = ''
  payload += tlv('00', '01')
  payload += tlv('01', temValor ? '12' : '11')
  payload += tlv('26', mai)
  payload += tlv('52', '0000')
  payload += tlv('53', '986')
  if (temValor) payload += tlv('54', input.valor!.toFixed(2))
  payload += tlv('58', 'BR')
  payload += tlv('59', nome)
  payload += tlv('60', cidade)
  payload += tlv('62', tlv('05', txid))
  payload += '6304' + crc16(`${payload}6304`)
  return payload
}

/**
 * Lê um BR Code Pix "copia e cola" e extrai os campos, validando o CRC.
 *
 * @example pix.lerPayload(codigo).crcValido // true
 */
function lerPayload(codigo: string): PixPayloadLido {
  const root = parseTlv(codigo)
  const mai = root['26'] ? parseTlv(root['26']) : {}
  const adf = root['62'] ? parseTlv(root['62']) : {}

  const idx = codigo.length - 8
  const informado = codigo.slice(idx + 4)
  const crcValido =
    idx >= 0 && codigo.slice(idx, idx + 4) === '6304' && crc16(codigo.slice(0, idx + 4)) === informado

  const lido: PixPayloadLido = { crcValido }
  if (mai['01']) lido.chave = mai['01']
  if (mai['02']) lido.descricao = mai['02']
  if (root['59']) lido.nome = root['59']
  if (root['60']) lido.cidade = root['60']
  if (root['54']) lido.valor = Number(root['54'])
  if (adf['05']) lido.txid = adf['05']
  return lido
}

export { gerarPayload, lerPayload }
