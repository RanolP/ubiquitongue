# Ubiquitongue Data Directory

This directory contains all the data for the Ubiquitongue project, stored as individual JSON files for better version control and collaboration.

## Structure

```
data/
├── notations/       # Mathematical notations (semantics + syntax combined)
│   ├── _index.json  # Index file for quick lookup
│   └── *.json       # Individual notation files
└── papers/          # Academic papers
    ├── _index.json  # Index file for quick lookup
    └── *.json       # Individual paper files
```

## File Naming Convention

- **Papers**: Use lowercase, hyphenated format: `{author}-{year}-{keyword}.json`
  - Example: `pierce-2002-types.json`
  
- **Notations**: Use lowercase, hyphenated format describing the concept
  - Example: `type-judgment.json`, `lambda-abstraction.json`

## Schema

### Notation Schema

```json
{
  "id": "unique-identifier",
  "name": "Human-readable name",
  "description": "Detailed description",
  "tags": ["category1", "category2"],
  "aliases": ["alternative name 1", "alternative name 2"],
  
  "typstString": "$mathematical notation$",
  "typstCanonical": "canonical form without $",
  "latexString": "\\LaTeX representation",
  "unicodeString": "Unicode representation if available",
  
  "papers": [{
    "paperId": "paper-id",
    "context": "How it's used in this paper",
    "pageNumber": "42",
    "isPrimaryDefinition": true
  }],
  
  "createdAt": "ISO 8601 timestamp",
  "updatedAt": "ISO 8601 timestamp"
}
```

### Paper Schema

```json
{
  "id": "unique-identifier",
  "title": "Full Paper Title",
  "authors": ["Author 1", "Author 2"],
  "year": 2024,
  "bibtex": "@article{...}",
  "abstract": "Paper abstract if available",
  "createdAt": "ISO 8601 timestamp",
  "updatedAt": "ISO 8601 timestamp"
}
```

## Contributing

When adding new notations or papers:

1. Create a new JSON file following the naming convention
2. Ensure all required fields are present
3. Update timestamps appropriately
4. Link notations to papers through the `papers` array
5. Run the build process to update search indices

## Index Files

The `_index.json` files are automatically generated and contain minimal information for quick lookups:

- **notations/_index.json**: `[{id, name, tags}]`
- **papers/_index.json**: `[{id, title, year}]`

These should not be edited manually.