// import { intoTokens, intoElements, Token } from "core/parser"
import { createElement } from 'react'

type TokenTypes = 'FILTER' | 'TEXT' | 'PERSON_FILTER'

interface Token {
  type: TokenTypes
  value: string  
}

type onFilterClick = (e:HTMLElement, token: Token) => void

interface Props {
  text: string
  onFilterClick?: onFilterClick
  filterClass?: string
}

function intoTokens(text: string) {
  const tokens: Token[] = []

  let position = 0
  while(position < text.length) {
    const char = text.charAt(position)
    if (char === '@') {
      if (text.charAt(position + 1) === '') {
        position += 1
        tokens.push({ type: 'TEXT', value: char })
        break
      }

      const [lastIndex, value] = readTill(text, position, (char) => char === ' ')
      position = lastIndex
      tokens.push({ type: 'PERSON_FILTER', value: value })
      continue
    } 
    
    if (char === '#') {
      if (text.charAt(position + 1) === '') {
        position += 1
        tokens.push({ type: 'TEXT', value: char })
        break
      }
      const [lastIndex, value] = readTill(text, position, (char) => char === ' ')
      position = lastIndex
      tokens.push({ type: 'FILTER', value: value })
      continue
    }

    const [lastIndex, value] = readTill(text, position, (char) => char === '@' || char === '#')
    position = lastIndex
    tokens.push({type: 'TEXT', value: value })
  }

  return tokens
}

function readTill(text: string, currentPos: number, cond: (char: string) => boolean): [number, string] {
  let index = currentPos
  while(index < text.length) {
    const char = text.charAt(index)
    if (cond(char)) {
      break
    }
    index += 1
  }

  const value = text.slice(currentPos, index)
  return [index, value]
}

export function intoElements(tokens: Token[], rootProps: Props){
  return tokens.map((token, index) => {
    const className = [token.type.toLowerCase()]
    if (token.type !== 'TEXT'){
      className.push(rootProps.filterClass || '')
    }

    const props = {
      key: index,
      className: className.join(' '),
      onClick: (e: HTMLElement) => {
        if (rootProps.onFilterClick) {
          rootProps.onFilterClick(e, token)
        }        
      }
    }
    
    return createElement('span', props, token.value)
  })
}

function RichText(props: Props) {
  return <div className="rich-text-element">
    {intoElements(intoTokens(props.text), props)}
  </div>
}

export default RichText