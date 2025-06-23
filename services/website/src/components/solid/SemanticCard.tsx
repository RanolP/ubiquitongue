import { Show, For } from 'solid-js';
import type { Semantic } from '../../lib/data-client';

interface SemanticCardProps {
  semantic: Semantic;
  href?: string;
}

export function SemanticCard(props: SemanticCardProps) {
  const content = (
    <>
      <h3 class="text-xl font-semibold text-gray-900">{props.semantic.name}</h3>
      <p class="mt-2 text-gray-600">{props.semantic.description}</p>
      
      <Show when={props.semantic.tags.length > 0}>
        <div class="mt-3 flex flex-wrap gap-2">
          <For each={props.semantic.tags}>
            {(tag) => (
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {tag}
              </span>
            )}
          </For>
        </div>
      </Show>

      <Show when={props.semantic.aliases.length > 0}>
        <div class="mt-3">
          <span class="text-sm text-gray-500">Also known as: </span>
          <span class="text-sm text-gray-700">
            {props.semantic.aliases.join(', ')}
          </span>
        </div>
      </Show>
    </>
  );

  if (props.href) {
    return (
      <a 
        href={props.href}
        class="block bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
      >
        {content}
      </a>
    );
  }

  return (
    <div class="bg-white rounded-lg shadow p-6">
      {content}
    </div>
  );
}