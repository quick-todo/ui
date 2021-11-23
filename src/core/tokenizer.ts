
export type TokenTypes = 'HASHTAGS' | 'TEXT' | 'USER_PROFILE'

export interface Token {
  type: TokenTypes
  value: string  
}

export class Tokenizer {
  position: number = 0
  tokens: Token[] = []

  constructor(text: string){
    this.buildTokens(text)
  }

  getTokens() {
    return this.tokens
  }

  getTaggedUsers() {
    return this.tokens.filter((token) => token.type === 'USER_PROFILE')
  }

  getHashTags() {
    return this.tokens.filter((token) => token.type === 'HASHTAGS')
  }

  buildTokens(text: string) {
    while(this.position < text.length) {
      const char = text.charAt(this.position)
      if (char === '@') {
        if (text.charAt(this.position + 1) === '') {
          this.position += 1
          this.tokens.push({ type: 'TEXT', value: char })
          break
        }
        const value = this.readTill(text, (char) => char === ' ')
        this.tokens.push({ type: 'USER_PROFILE', value })
        continue
      }

      if (char === '#') {
        if (text.charAt(this.position + 1) === '') {
          this.position += 1
          this.tokens.push({ type: 'TEXT', value: char })
          break
        }
        const value = this.readTill(text, (char) => char === ' ')
        this.tokens.push({ type: 'HASHTAGS', value: value })
        continue
      }
      const value = this.readTill(text, (char) => char === '@' || char === '#')
      this.tokens.push({ type: 'TEXT', value: value })
    }
    return this.tokens
  }

  readTill(text: string, cond: (char: string) => boolean): string {
    const currentPos = this.position
    while(this.position < text.length) {
      const char = text.charAt(this.position)
      if (cond(char)) {
        break
      }
      this.position += 1
    }
    return text.slice(currentPos, this.position)
  }  
}