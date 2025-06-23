import moo from 'moo';

// Define the lexer for mathematical notation
const lexer = moo.compile({
  // Whitespace
  ws: /[ \t]+/,
  
  // Numbers
  number: /[0-9]+(?:\.[0-9]+)?/,
  
  // Common mathematical operators
  plus: '+',
  minus: '-',
  times: ['*', '×', '·'],
  divide: ['/', '÷'],
  equals: '=',
  not_equals: ['!=', '≠'],
  less_than: '<',
  greater_than: '>',
  less_equal: ['<=', '≤'],
  greater_equal: ['>=', '≥'],
  
  // Set operations
  union: ['∪', 'union'],
  intersection: ['∩', 'intersection', 'cap'],
  subset: ['⊆', 'subset'],
  element_of: ['∈', 'in'],
  not_element_of: ['∉', 'not_in'],
  
  // Logic operators
  and: ['∧', '&&', 'and'],
  or: ['∨', '||', 'or'],
  not: ['¬', '!', 'not'],
  implies: ['→', '=>', 'implies'],
  iff: ['↔', '<=>', 'iff'],
  
  // Quantifiers
  forall: ['∀', 'forall', 'for_all'],
  exists: ['∃', 'exists', 'there_exists'],
  
  // Greek letters
  alpha: ['α', 'alpha'],
  beta: ['β', 'beta'],
  gamma: ['γ', 'gamma'],
  delta: ['δ', 'delta'],
  epsilon: ['ε', 'epsilon'],
  theta: ['θ', 'theta'],
  lambda: ['λ', 'lambda'],
  mu: ['μ', 'mu'],
  pi: ['π', 'pi'],
  sigma: ['σ', 'sigma'],
  phi: ['φ', 'phi'],
  psi: ['ψ', 'psi'],
  omega: ['ω', 'omega'],
  
  // Common functions
  sum: ['∑', 'sum'],
  product: ['∏', 'product'],
  integral: ['∫', 'integral'],
  
  // Brackets
  lparen: '(',
  rparen: ')',
  lbracket: '[',
  rbracket: ']',
  lbrace: '{',
  rbrace: '}',
  
  // Subscript and superscript indicators
  underscore: '_',
  caret: '^',
  
  // Identifiers (variables, function names)
  identifier: /[a-zA-Z][a-zA-Z0-9]*/,
  
  // Special keywords
  where: 'where',
  such_that: ['such_that', 'st'],
  
  // Catch-all for other characters
  other: /./,
});

export interface ParsedNotation {
  canonical: string;
  tokens: moo.Token[];
  type: 'expression' | 'equation' | 'set' | 'logic' | 'unknown';
}

export function parseNotation(input: string): ParsedNotation {
  lexer.reset(input);
  const tokens: moo.Token[] = Array.from(lexer);
  
  // Remove whitespace tokens for easier processing
  const significantTokens = tokens.filter(t => t.type !== 'ws');
  
  // Determine the type of expression
  let type: ParsedNotation['type'] = 'unknown';
  const tokenTypes = new Set(significantTokens.map(t => t.type));
  
  if (tokenTypes.has('equals')) {
    type = 'equation';
  } else if (tokenTypes.has('union') || tokenTypes.has('intersection') || tokenTypes.has('element_of')) {
    type = 'set';
  } else if (tokenTypes.has('and') || tokenTypes.has('or') || tokenTypes.has('implies') || tokenTypes.has('forall') || tokenTypes.has('exists')) {
    type = 'logic';
  } else {
    type = 'expression';
  }
  
  // Convert to canonical Typst format
  const canonical = tokensToTypst(significantTokens);
  
  return {
    canonical,
    tokens: significantTokens,
    type
  };
}

function tokensToTypst(tokens: moo.Token[]): string {
  let result = '';
  
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const nextToken = tokens[i + 1];
    
    switch (token.type) {
      // Greek letters
      case 'alpha': result += 'alpha'; break;
      case 'beta': result += 'beta'; break;
      case 'gamma': result += 'gamma'; break;
      case 'delta': result += 'delta'; break;
      case 'epsilon': result += 'epsilon'; break;
      case 'theta': result += 'theta'; break;
      case 'lambda': result += 'lambda'; break;
      case 'mu': result += 'mu'; break;
      case 'pi': result += 'pi'; break;
      case 'sigma': result += 'sigma'; break;
      case 'phi': result += 'phi'; break;
      case 'psi': result += 'psi'; break;
      case 'omega': result += 'omega'; break;
      
      // Operators
      case 'plus': result += '+'; break;
      case 'minus': result += '-'; break;
      case 'times': result += 'times'; break;
      case 'divide': result += '/'; break;
      case 'equals': result += '='; break;
      case 'not_equals': result += '!='; break;
      case 'less_than': result += '<'; break;
      case 'greater_than': result += '>'; break;
      case 'less_equal': result += '<='; break;
      case 'greater_equal': result += '>='; break;
      
      // Set operations
      case 'union': result += 'union'; break;
      case 'intersection': result += 'sect'; break;
      case 'subset': result += 'subset.eq'; break;
      case 'element_of': result += 'in'; break;
      case 'not_element_of': result += 'in.not'; break;
      
      // Logic
      case 'and': result += 'and'; break;
      case 'or': result += 'or'; break;
      case 'not': result += 'not'; break;
      case 'implies': result += 'arrow.r.double'; break;
      case 'iff': result += 'arrow.l.r.double'; break;
      
      // Quantifiers
      case 'forall': result += 'forall'; break;
      case 'exists': result += 'exists'; break;
      
      // Functions
      case 'sum': result += 'sum'; break;
      case 'product': result += 'product'; break;
      case 'integral': result += 'integral'; break;
      
      // Subscript/superscript
      case 'underscore':
        if (nextToken) {
          result += `_(${nextToken.value})`;
          i++; // Skip next token
        }
        break;
      case 'caret':
        if (nextToken) {
          result += `^(${nextToken.value})`;
          i++; // Skip next token
        }
        break;
      
      // Default: keep as is
      default:
        result += token.value;
    }
    
    // Add space between tokens if needed
    if (i < tokens.length - 1 && 
        token.type !== 'underscore' && 
        token.type !== 'caret' &&
        nextToken?.type !== 'underscore' &&
        nextToken?.type !== 'caret') {
      result += ' ';
    }
  }
  
  return result.trim();
}

// Helper function to extract search terms from parsed notation
export function extractSearchTerms(parsed: ParsedNotation): string[] {
  const terms: string[] = [parsed.canonical];
  
  // Add individual identifiers and operators
  parsed.tokens.forEach(token => {
    if (token.type === 'identifier' || 
        token.type === 'number' ||
        ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'theta', 'lambda', 'mu', 'pi', 'sigma', 'phi', 'psi', 'omega'].includes(token.type!)) {
      terms.push(token.value);
    }
  });
  
  return [...new Set(terms)]; // Remove duplicates
}