/**
 * CRC16-CCITT (FALSE): polinômio `0x1021`, valor inicial `0xFFFF`, sem
 * reflexão, sem XOR final. Usado no campo `63` do BR Code Pix. Retorna 4
 * caracteres hexadecimais em maiúsculas.
 */
export function crc16(payload: string): string {
  let crc = 0xffff
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) !== 0 ? (crc << 1) ^ 0x1021 : crc << 1
      crc &= 0xffff
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0')
}
