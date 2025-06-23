// Client-side data types only (no file system access)
export interface Paper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  doi?: string;
  bibtex: string;
}

export interface Semantic {
  id: string;
  name: string;
  description: string;
  tags: string[];
  aliases: string[];
}

export interface Syntax {
  id: string;
  typstString: string;
  latexString?: string;
  typstCanonical: string;
  description?: string;
}

export interface Usage {
  id: string;
  semanticId: string;
  syntaxId: string;
  paperId: string;
  context?: string;
  pageNumber?: string;
  isPrimaryDefinition: boolean;
}