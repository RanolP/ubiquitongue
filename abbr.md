# 🧐 ubiquitongue

**"A review of notational conflicts that could be the leading cause of murder in researchers."**

Ubiquitongue aims to be the definitive, community-driven resource for deciphering and standardizing notation in academic research, initially focusing on **Mathematics** and **Computer Science (especially Programming Language Theory - PLT)**.

## The Problem

Ever stared at a symbol in a paper and wondered:
*   "What on earth does *that* mean in this context?"
*   "Is this the same concept I saw denoted differently in another paper?"
*   "Which of these five ways to write 'type judgment' is most common/clear?"

Notational conflicts, ambiguities, and inconsistencies are a significant time sink, a barrier to understanding, and a source of endless frustration for researchers and students. Ubiquitongue is here to help.

## Our Solution

We are building a **bidirectional index** mapping:
1.  **Semantics (Concepts):** The meaning or idea being conveyed (e.g., "typing judgment," "standard deviation," "lambda abstraction").
2.  **Syntaxes (Notations):** The symbols used to represent these concepts (e.g., `⊢ Γ : τ`, `σ`, `λx.t`).

Each mapping will be linked to the **papers and authors** that use it, providing crucial context. We'll then generate **statistics** on popularity, ambiguity, and more, helping you choose and understand notations effectively.

## Key Features

*   **Bidirectional Index:**
    *   Look up a **syntax** to see its possible semantic meanings and where it's used.
    *   Look up a **semantic concept** to see common (and uncommon) ways it's notated.
*   **Typst-First Syntax Representation:**
    *   Notations are primarily represented using [Typst](https://typst.app/) syntax, a modern, scriptable typesetting system ideal for complex notations.
    *   `typst.ts` will be used for parsing/handling. Syntaxes not easily expressible in Typst will be considered out of scope for the initial versions.
*   **Flexible Semantic Descriptions:**
    *   Semantics are described using **natural language**.
    *   Conflicts or refinements in semantic descriptions will initially be handled manually by the team, facilitated by a "Raise an Issue" feature for community discussion.
    *   *Future:* We plan to incorporate more structured semantic data (e.g., ontologies, controlled vocabularies).
*   **Contextual Paper Linking via Hayagriva:**
    *   Entries are linked to specific academic papers using [Hayagriva](https://github.com/typst/hayagriva), Typst's expressive bibliography management library. This supports DOIs, BibTeX entries, and more, providing rich contextual information.
*   **Smart Notation Editor:**
    *   **Symbol Autocompletion:** Suggests Typst symbols by default. Users can also type `\` to access and complete common LaTeX symbols, which will be translated to their Typst equivalents where possible.
    *   **Real-time Preview Pop-over:** Instantly see how your Typst notation renders as you type.
    *   **Not WYSIWYG:** Focus remains on the underlying code for clarity and precision.
*   **Community-Driven Disambiguation:**
    *   A "Raise an Issue" button on entries will allow users to flag ambiguities, suggest improvements, or discuss conflicting notations.
*   **Usage Statistics:**
    *   Understand the popularity of different notations for a given concept.
    *   See how ambiguous a particular symbol might be.
*   **Initial Data Seeding:**
    *   The core dataset will be initially populated by our team, focusing on foundational concepts in Math, CS, and PLT.
*   **Semantic Search:**
    *   Initial search for semantic descriptions will use n-gram matching and a system of aliases.
    *   *Future:* More robust semantic search solutions will be explored.

## Target Audience

*   Researchers, academics, and students in Mathematics, Computer Science (especially PLT), and related fields.
*   Anyone reading or writing notation-heavy academic papers.
*   Authors looking to choose clear and conventional notation.

## Why Typst?

Typst offers a modern, powerful, and scriptable approach to typesetting, making it well-suited for representing and managing the complex notations found in academic research. Its structured nature is beneficial for a database like Ubiquitongue. While LaTeX is ubiquitous, Typst's design philosophy aligns well with our goals for clarity and future extensibility. Our editor aims to bridge the gap by supporting familiar LaTeX input methods.

## Current Status

Ubiquitongue is currently in [Specify Stage - e.g., Alpha, Beta, Early Development]. We are focused on:
1.  Building the core platform and editor.
2.  Populating the initial dataset with foundational notations.
3.  Refining the contribution and conflict resolution workflow.

## How to Contribute

Once live, you'll be able to contribute by:
*   **Adding new notation-semantic pairs** you encounter.
*   **Linking existing entries** to more papers.
*   **Raising issues** to discuss ambiguities or suggest improvements.
*   **Improving semantic descriptions.**

For developers:
*   [Link to Contribution Guidelines - once available]
*   [Link to Issue Tracker - once available]
*   We welcome contributions to the codebase, documentation, and feature design!

## Our Vision

To create a world where deciphering academic notation is no longer a Herculean task, fostering clearer communication and accelerating research.

---

**License:** [To Be Determined - e.g., MIT, Apache 2.0]

**Stay Connected:** [Link to Website/Forum/Discord/Mailing List - once available]
