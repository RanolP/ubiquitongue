import { createSignal, createMemo, For, Show, type JSX } from 'solid-js';
import type { Semantic, Syntax, Paper } from '../lib/data-client';
import { url } from '../lib/url';

interface SearchProps {
  semantics: Semantic[];
  syntaxes: Syntax[];
  papers: Paper[];
}

export function Search(props: SearchProps): JSX.Element {
  const [query, setQuery] = createSignal('');
  const [filter, setFilter] = createSignal<
    'all' | 'semantics' | 'syntaxes' | 'papers'
  >('all');

  const results = createMemo(() => {
    const q = query().toLowerCase().trim();
    if (!q) return { semantics: [], syntaxes: [], papers: [] };

    const filterType = filter();
    const results = {
      semantics:
        filterType === 'all' || filterType === 'semantics'
          ? props.semantics.filter(
              (s) =>
                s.name.toLowerCase().includes(q) ||
                s.description.toLowerCase().includes(q) ||
                s.tags.some((t) => t.toLowerCase().includes(q)) ||
                s.aliases.some((a) => a.toLowerCase().includes(q)),
            )
          : [],
      syntaxes:
        filterType === 'all' || filterType === 'syntaxes'
          ? props.syntaxes.filter(
              (s) =>
                s.typstString.toLowerCase().includes(q) ||
                (s.description?.toLowerCase().includes(q) ?? false),
            )
          : [],
      papers:
        filterType === 'all' || filterType === 'papers'
          ? props.papers.filter(
              (p) =>
                p.title.toLowerCase().includes(q) ||
                p.authors.some((a) => a.toLowerCase().includes(q)),
            )
          : [],
    };

    return results;
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
          placeholder="Search notations, concepts, or papers..."
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
                <For each={results().semantics}>
                  {(semantic) => (
                    <a
                      href={url(`/semantics/${semantic.id}`)}
                      class="block bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
                    >
                      <h4 class="font-medium text-primary">{semantic.name}</h4>
                      <p class="text-sm text-gray-600 mt-1">
                        {semantic.description}
                      </p>
                    </a>
                  )}
                </For>
              </div>
            </div>
          </Show>

          <Show when={results().syntaxes.length > 0}>
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-2">Syntaxes</h3>
              <div class="space-y-2">
                <For each={results().syntaxes}>
                  {(syntax) => (
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
                  )}
                </For>
              </div>
            </div>
          </Show>

          <Show when={results().papers.length > 0}>
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-2">Papers</h3>
              <div class="space-y-2">
                <For each={results().papers}>
                  {(paper) => (
                    <a
                      href={url(`/papers/${paper.id}`)}
                      class="block bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
                    >
                      <h4 class="font-medium text-primary">{paper.title}</h4>
                      <p class="text-sm text-gray-600 mt-1">
                        {paper.authors.join(', ')} • {paper.year}
                      </p>
                    </a>
                  )}
                </For>
              </div>
            </div>
          </Show>

          <Show when={totalResults() === 0}>
            <p class="text-gray-500 text-center py-8">
              No results found for "{query()}"
            </p>
          </Show>
        </div>
      </Show>
    </div>
  );
}
