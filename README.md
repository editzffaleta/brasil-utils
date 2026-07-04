# brasil-utils

[![CI](https://github.com/editzffaleta/brasil-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/editzffaleta/brasil-utils/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/brasil-utils.svg)](https://www.npmjs.com/package/brasil-utils)
[![npm downloads](https://img.shields.io/npm/dm/brasil-utils.svg)](https://www.npmjs.com/package/brasil-utils)
[![bundle size](https://img.shields.io/bundlephobia/minzip/brasil-utils.svg)](https://bundlephobia.com/package/brasil-utils)
[![zero dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)](https://www.npmjs.com/package/brasil-utils?activeTab=dependencies)
[![license](https://img.shields.io/npm/l/brasil-utils.svg)](./LICENSE)

Validação e formatação de dados brasileiros — **CPF, CNPJ, CEP, telefone, placa de veículo e Pix**
(chave + BR Code "copia e cola"). Escrita em TypeScript, **sem nenhuma dependência de runtime**,
com tipagem forte e testada de ponta a ponta.

- 🇧🇷 Cobre os dados do dia a dia de qualquer app brasileiro
- 📦 **Zero dependências** — nada entra no seu `node_modules` além do essencial
- 🌳 Tree-shakeable (ESM + CJS + tipos), funciona em Node, browser e edge
- ✅ Sem exceções na validação: `isValid` devolve `boolean`, `format` é leniente

## Instalação

```sh
npm install brasil-utils
```

## Uso

```ts
import { cpf, cnpj, cep, telefone, placa, pix } from 'brasil-utils'

// CPF
cpf.isValid('111.444.777-35') // true
cpf.format('11144477735') // '111.444.777-35'
cpf.generate() // '52998224725' (fictício, mas válido)

// CNPJ
cnpj.isValid('11.222.333/0001-81') // true
cnpj.format('11222333000181') // '11.222.333/0001-81'

// CEP
cep.isValid('01001-000') // true
cep.format('01001000') // '01001-000'

// Telefone (aceita +55 opcional)
telefone.isValid('(11) 98765-4321') // true
telefone.isMobile('1133224455') // false
telefone.format('11987654321') // '(11) 98765-4321'

// Placa (antiga e Mercosul)
placa.getTipo('ABC1D23') // 'mercosul'
placa.format('abc1234') // 'ABC-1234'

// Pix
pix.getTipoChave('+5511987654321') // 'telefone'
const brcode = pix.gerarPayload({ chave: 'teste@exemplo.com', nome: 'Fulano', cidade: 'Sao Paulo' })
pix.lerPayload(brcode).crcValido // true
```

CommonJS também funciona:

```js
const { cpf } = require('brasil-utils')
cpf.isValid('111.444.777-35') // true
```

## API

| Módulo | Funções |
| --- | --- |
| `cpf` | `isValid` · `format` · `strip` · `generate` |
| `cnpj` | `isValid` · `format` · `strip` · `generate` |
| `cep` | `isValid` · `format` · `strip` |
| `telefone` | `isValid` · `isMobile` · `format` · `strip` |
| `placa` | `isValid` · `format` · `getTipo` · `strip` |
| `pix` | `getTipoChave` · `isValidChave` · `gerarPayload` · `lerPayload` |

- `isValid` — valida (dígitos verificadores no CPF/CNPJ, DDDs válidos no telefone, formato no CEP/placa).
- `format` — aplica a máscara oficial. Leniente: nunca lança, trabalha sobre os dígitos presentes.
- `strip` — remove máscara e devolve só o conteúdo relevante.
- `generate` — gera um valor fictício **válido** (útil em testes e seeds).

### Pix

`getTipoChave` reconhece `'cpf' | 'cnpj' | 'email' | 'telefone' | 'aleatoria'` (ou `null`).
`gerarPayload` monta o BR Code estático (EMV) com CRC16, e `lerPayload` faz o caminho inverso e
confere o CRC.

## Por que zero dependências?

Dados brasileiros são cálculo puro — dígito verificador, máscara, checagem de formato. Nada disso
precisa de rede nem de biblioteca externa. Sem dependências, você não herda vulnerabilidades de
terceiros, o bundle fica minúsculo e a superfície de manutenção é sua.

> A validação de CEP, telefone e placa é **de formato** — não há consulta a serviços externos.

## Licença

[MIT](./LICENSE)
