import { createSignal, onMount, Show } from 'solid-js';
import { $typst } from '@myriaddreamin/typst.ts/dist/esm/contrib/snippet.mjs';

interface TypstPreviewProps {
  code: string;
  class?: string;
}

export function TypstPreview(props: TypstPreviewProps) {
  const [svg, setSvg] = createSignal<string>('');
  const [error, setError] = createSignal<string>('');
  const [loading, setLoading] = createSignal(true);

  onMount(async () => {
    try {
      // Initialize typst.ts if not already done
      if (!window.$typst) {
        await $typst.init();
        window.$typst = $typst;
      }

      // Render the Typst code
      const result = await $typst.svg({
        mainContent: props.code,
      });

      setSvg(result);
      setError('');
    } catch (err) {
      console.error('Typst rendering error:', err);
      setError(err?.message || 'Failed to render notation');
    } finally {
      setLoading(false);
    }
  });

  return (
    <div class={`typst-preview ${props.class || ''}`}>
      <Show when={loading()}>
        <div class="text-gray-400 animate-pulse">Rendering...</div>
      </Show>
      <Show when={!loading() && error()}>
        <div class="text-red-500 text-sm">
          Error: {error()}
          <div class="mt-1 font-mono text-xs">{props.code}</div>
        </div>
      </Show>
      <Show when={!loading() && !error() && svg()}>
        <div innerHTML={svg()} class="inline-block" />
      </Show>
    </div>
  );
}