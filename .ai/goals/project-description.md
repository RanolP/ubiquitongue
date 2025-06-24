---
id: project-description
created_at: 2025-06-24T04:00:00Z
updated_at: 2025-06-24T04:00:00Z
type: goal
priority: foundational
---

# Ubiquitongue Project Description

## Core Mission

Ubiquitongue (from "ubiquitous" + "tongue/language") is a comprehensive notation disambiguation system for mathematics and computer science. It addresses the critical problem of notational conflicts across academic papers - where the same symbol can mean vastly different things depending on context.

## The Problem We Solve

In academic literature, notation overloading is rampant:
- `∪` might mean set union, lattice join, or cup product
- `⊢` could be type judgment, logical entailment, or derivability
- `λ` represents lambda abstraction, eigenvalues, or wavelength

This creates confusion, slows research, and as the tagline suggests, "could be the leading cause of murder in researchers."

## Our Solution

A bidirectional, searchable index that:
1. **Maps notations to meanings** - What does this symbol mean?
2. **Maps meanings to notations** - How is this concept represented?
3. **Tracks usage across papers** - Where is this notation defined and used?
4. **Highlights conflicts** - When does the same symbol mean different things?

## Target Users

- **Researchers** reading papers with unfamiliar notation
- **Students** learning from multiple sources
- **Authors** checking for notation conflicts
- **Reviewers** verifying notation consistency

## Key Design Principles

1. **Simplicity First** - Easy to use, fast to load, minimal complexity
2. **Comprehensive Coverage** - Both common and obscure notations
3. **Context Awareness** - Show where and how notations are used
4. **Community Driven** - Easy to contribute new notations

## Technical Philosophy

As directed by the user: "make it simple as stupid"
- No overcomplicated databases
- Static site for performance
- JSON files for data storage
- Clear, maintainable code

## Long-term Vision

Become the definitive reference for mathematical and CS notation, reducing confusion and accelerating research by making notation unambiguous and searchable.