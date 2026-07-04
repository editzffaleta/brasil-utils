import { getTipoChave, isValidChave } from './chave'
import { gerarPayload, lerPayload } from './brcode'

export type { TipoChavePix } from './chave'
export type { PixPayloadInput, PixPayloadLido } from './brcode'

export const pix = { getTipoChave, isValidChave, gerarPayload, lerPayload }
