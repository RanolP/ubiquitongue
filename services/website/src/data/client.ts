import { GraphQLClient } from 'graphql-request';

const endpoint = 'http://localhost:4001/graphql';

export const gqlClient = new GraphQLClient(endpoint);

// Query helpers
export const queries = {
  allPapers: `
    query AllPapers {
      papers {
        id
        title
        authors
        year
      }
    }
  `,
  
  paperDetail: `
    query PaperDetail($id: String!) {
      paper(id: $id) {
        id
        title
        authors
        year
        doi
        bibtex
      }
    }
  `,
  
  allSemantics: `
    query AllSemantics {
      semantics {
        id
        name
        description
        tags
      }
    }
  `,
  
  semanticDetail: `
    query SemanticDetail($id: String!) {
      semantic(id: $id) {
        id
        name
        description
        tags
        aliases
      }
    }
  `,
  
  allSyntaxes: `
    query AllSyntaxes {
      syntaxes {
        id
        typstString
        typstCanonical
        description
      }
    }
  `,
  
  syntaxDetail: `
    query SyntaxDetail($id: String!) {
      syntax(id: $id) {
        id
        typstString
        latexString
        typstCanonical
        description
      }
    }
  `,
  
  usagesByEntity: `
    query UsagesByEntity {
      usages {
        id
        semanticId
        syntaxId
        paperId
        isPrimaryDefinition
        semantic {
          name
        }
        syntax {
          typstString
        }
        paper {
          title
          year
        }
      }
    }
  `,
};