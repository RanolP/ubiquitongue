import {
  createSignal,
  createMemo,
  createEffect,
  For,
  Show,
  onMount,
  type JSX,
} from 'solid-js';
import FlexSearch from 'flexsearch';
import { url } from '../lib/url';
import { parseNotation, extractSearchTerms } from '../lib/notation-parser';

interface SearchData {
  semantics: Array<{
    id: string;
    name: string;
    description: string;
    tags: string[];
    aliases: string[];
    searchText: string;
  }>;
  syntaxes: Array<{
    id: string;
    typstString: string;
    description: string;
    latexString: string;
    searchText: string;
  }>;
  papers: Array<{
    id: string;
    title: string;
    authors: string[];
    year: number;
    abstract: string;
    searchText: string;
  }>;
}

export function SmartSearch(): JSX.Element {
  const [query, setQuery] = createSignal('');
  const [filter, setFilter] = createSignal<
    'all' | 'semantics' | 'syntaxes' | 'papers'
  >('all');
  const [searchData, setSearchData] = createSignal<SearchData | null>(null);
  const [indices, setIndices] = createSignal<{
    semantics: any;
    syntaxes: any;
    papers: any;
  } | null>(null);
  const [parsedQuery, setParsedQuery] = createSignal<ReturnType<
    typeof parseNotation
  > | null>(null);

  // Load search data and initialize FlexSearch indices
  onMount(async () => {
    try {
      const response = await fetch(url('/search-data.json'));
      const data: SearchData = await response.json();
      setSearchData(data);

      // Initialize FlexSearch indices
      const semanticsIndex = new FlexSearch.Document({
        document: {
          id: 'id',
          index: ['searchText'],
          store: ['id', 'name', 'description', 'tags', 'aliases'],
        },
        tokenize: 'forward',
      });

      const syntaxesIndex = new FlexSearch.Document({
        document: {
          id: 'id',
          index: ['searchText'],
          store: [
            'id',
            'typstString',
            'description',
            'latexString',
          ],
        },
        tokenize: 'forward',
      });

      const papersIndex = new FlexSearch.Document({
        document: {
          id: 'id',
          index: ['searchText'],
          store: ['id', 'title', 'authors', 'year', 'abstract'],
        },
        tokenize: 'forward',
      });

      // Add documents to indices
      data.semantics.forEach((s) => semanticsIndex.add(s));
      data.syntaxes.forEach((s) => syntaxesIndex.add(s));
      data.papers.forEach((p) => papersIndex.add(p));

      setIndices({
        semantics: semanticsIndex,
        syntaxes: syntaxesIndex,
        papers: papersIndex,
      });
    } catch (error) {
      console.error('Failed to load search data:', error);
    }
  });

  // Parse query when it changes
  createEffect(() => {
    const q = query().trim();
    if (q) {
      try {
        const parsed = parseNotation(q);
        setParsedQuery(parsed);
      } catch (error) {
        // If parsing fails, treat as regular text search
        setParsedQuery(null);
      }
    } else {
      setParsedQuery(null);
    }
  });

  const results = createMemo(() => {
    const q = query().trim();
    if (!q || !indices()) return { semantics: [], syntaxes: [], papers: [] };

    const filterType = filter();
    const idx = indices()!;
    const parsed = parsedQuery();

    // If we have a parsed mathematical expression, search for the canonical form
    if (parsed && parsed.type !== 'unknown') {
      const searchTerms = extractSearchTerms(parsed);

      // For syntaxes, prioritize exact canonical matches
      const syntaxResults =
        filterType === 'all' || filterType === 'syntaxes'
          ? [
              // Search for individual terms
              ...searchTerms.flatMap((term) =>
                idx.syntaxes
                  .search(term, { limit: 5 })
                  .map((r: any) => r.result)
                  .flat(),
              ),
            ]
          : [];

      // Remove duplicates
      const uniqueSyntaxResults = [...new Set(syntaxResults)];

      const searchResults = {
        semantics:
          filterType === 'all' || filterType === 'semantics'
            ? searchTerms.flatMap((term) =>
                idx.semantics
                  .search(term, { limit: 10 })
                  .map((r: any) => r.result)
                  .flat(),
              )
            : [],
        syntaxes: uniqueSyntaxResults,
        papers:
          filterType === 'all' || filterType === 'papers'
            ? searchTerms.flatMap((term) =>
                idx.papers
                  .search(term, { limit: 10 })
                  .map((r: any) => r.result)
                  .flat(),
              )
            : [],
      };

      return searchResults;
    } else {
      // Regular text search
      const searchResults = {
        semantics:
          filterType === 'all' || filterType === 'semantics'
            ? idx.semantics
                .search(q, { limit: 10 })
                .map((r: any) => r.result)
                .flat()
            : [],
        syntaxes:
          filterType === 'all' || filterType === 'syntaxes'
            ? idx.syntaxes
                .search(q, { limit: 10 })
                .map((r: any) => r.result)
                .flat()
            : [],
        papers:
          filterType === 'all' || filterType === 'papers'
            ? idx.papers
                .search(q, { limit: 10 })
                .map((r: any) => r.result)
                .flat()
            : [],
      };

      return searchResults;
    }
  });

  const totalResults = createMemo(
    () =>
      results().semantics.length +
      results().syntaxes.length +
      results().papers.length,
  );

  return (
    <div class="w-full max-w-2xl mx-auto">
      <div class="relative">
        <input
          type="text"
          value={query()}
          onInput={(e) => setQuery(e.currentTarget.value)}
          placeholder="Search notations (e.g., 'a ∪ b', 'sum i=1 to n', 'alpha + beta')..."
          class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <svg
          class="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <Show when={parsedQuery()}>
        <div class="mt-2 p-2 bg-gray-100 rounded text-sm">
          <span class="font-medium">Parsed as:</span> {parsedQuery()!.canonical}
          <span class="text-gray-600 ml-2">({parsedQuery()!.type})</span>
        </div>
      </Show>

      <Show when={query()}>
        <div class="mt-2 flex gap-2">
          <button
            onClick={() => setFilter('all')}
            class={`px-3 py-1 rounded-full text-sm ${
              filter() === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            All ({totalResults()})
          </button>
          <button
            onClick={() => setFilter('semantics')}
            class={`px-3 py-1 rounded-full text-sm ${
              filter() === 'semantics'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Semantics ({results().semantics.length})
          </button>
          <button
            onClick={() => setFilter('syntaxes')}
            class={`px-3 py-1 rounded-full text-sm ${
              filter() === 'syntaxes'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Syntaxes ({results().syntaxes.length})
          </button>
          <button
            onClick={() => setFilter('papers')}
            class={`px-3 py-1 rounded-full text-sm ${
              filter() === 'papers'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Papers ({results().papers.length})
          </button>
        </div>

        <div class="mt-4 space-y-4">
          <Show when={results().semantics.length > 0}>
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-2">Semantics</h3>
              <div class="space-y-2">
                <For each={[...new Set(results().semantics)]}>
                  {(semanticId) => {
                    const semantic = searchData()?.semantics.find(
                      (s) => s.id === semanticId,
                    );
                    return semantic ? (
                      <a
                        href={url(`/semantics/${semantic.id}`)}
                        class="block bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
                      >
                        <h4 class="font-medium text-primary">
                          {semantic.name}
                        </h4>
                        <p class="text-sm text-gray-600 mt-1">
                          {semantic.description}
                        </p>
                      </a>
                    ) : null;
                  }}
                </For>
              </div>
            </div>
          </Show>

          <Show when={results().syntaxes.length > 0}>
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-2">Syntaxes</h3>
              <div class="space-y-2">
                <For each={[...new Set(results().syntaxes)]}>
                  {(syntaxId) => {
                    const syntax = searchData()?.syntaxes.find(
                      (s) => s.id === syntaxId,
                    );
                    return syntax ? (
                      <a
                        href={url(`/syntaxes/${syntax.id}`)}
                        class="block bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
                      >
                        <code class="font-mono text-primary">
                          {syntax.typstString}
                        </code>
                        <Show when={syntax.description}>
                          <p class="text-sm text-gray-600 mt-1">
                            {syntax.description}
                          </p>
                        </Show>
                      </a>
                    ) : null;
                  }}
                </For>
              </div>
            </div>
          </Show>

          <Show when={results().papers.length > 0}>
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-2">Papers</h3>
              <div class="space-y-2">
                <For each={[...new Set(results().papers)]}>
                  {(paperId) => {
                    const paper = searchData()?.papers.find(
                      (p) => p.id === paperId,
                    );
                    return paper ? (
                      <a
                        href={url(`/papers/${paper.id}`)}
                        class="block bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
                      >
                        <h4 class="font-medium text-primary">{paper.title}</h4>
                        <p class="text-sm text-gray-600 mt-1">
                          {paper.authors.join(', ')} • {paper.year}
                        </p>
                      </a>
                    ) : null;
                  }}
                </For>
              </div>
            </div>
          </Show>

          <Show when={totalResults() === 0 && indices()}>
            <p class="text-gray-500 text-center py-8">
              No results found for "{query()}"
            </p>
          </Show>

          <Show when={!indices()}>
            <p class="text-gray-500 text-center py-8">
              Loading search index...
            </p>
          </Show>
        </div>
      </Show>
    </div>
  );
}
