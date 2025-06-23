import { createSignal, Show } from 'solid-js';
import { TypstPreview } from './TypstPreview';
import type { Syntax } from '../../lib/data-client';

interface SyntaxDisplayProps {
  syntax: Syntax;
  showDescription?: boolean;
}

export function SyntaxDisplay(props: SyntaxDisplayProps) {
  const [copied, setCopied] = createSignal(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-start justify-between gap-4">
        <div class="flex-1">
          <h3 class="text-lg font-medium text-gray-900 mb-2">Notation</h3>
          
          <div class="mb-4">
            <TypstPreview code={props.syntax.typstString} class="text-2xl" />
          </div>

          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-500">Typst:</span>
              <code class="flex-1 bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                {props.syntax.typstString}
              </code>
              <button
                onClick={() => copyToClipboard(props.syntax.typstString)}
                class="text-primary hover:text-primary/80 text-sm"
              >
                {copied() ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <Show when={props.syntax.latexString}>
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-500">LaTeX:</span>
                <code class="flex-1 bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                  {props.syntax.latexString}
                </code>
                <button
                  onClick={() => copyToClipboard(props.syntax.latexString!)}
                  class="text-primary hover:text-primary/80 text-sm"
                >
                  Copy
                </button>
              </div>
            </Show>

            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-500">Canonical:</span>
              <code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                {props.syntax.typstCanonical}
              </code>
            </div>
          </div>

          <Show when={props.showDescription && props.syntax.description}>
            <p class="mt-3 text-gray-600">{props.syntax.description}</p>
          </Show>
        </div>
      </div>
    </div>
  );
}