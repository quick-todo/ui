import { createElement } from 'react'
import { Tokenizer, Token } from 'core/tokenizer'

type onFilterClick = (e:HTMLElement, token: Token) => void

interface Props {
  text: string
  onFilterClick?: onFilterClick
  filterClass?: string
}

export function intoElements(tokens: Token[], rootProps: Props) {
  return tokens.map((token, index) => {
    const className = [token.type.toLowerCase()]
    if (token.type !== 'TEXT') {
      className.push(rootProps.filterClass || '')
    }

    const props: any = {
      key: index, 
      className: className.join(' ') 
    }

    if (token.type !== 'TEXT') {
      props.onClick = (e: HTMLElement) => {
        if (rootProps.onFilterClick) {
          rootProps.onFilterClick(e, token)
        }        
      }
    }
    
    return createElement('span', props, token.value)
  })
}

function RichText(props: Props) {
  const tokens = new Tokenizer(props.text).getTokens()
  return <div className="rich-text-element">
    {intoElements(tokens, props)}
  </div>
}

export default RichText