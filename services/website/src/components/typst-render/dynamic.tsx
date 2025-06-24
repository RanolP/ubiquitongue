import { createTypstRenderer } from '@myriaddreamin/typst.ts';
import { createEffect, createResource } from 'solid-js';

const rendererPromise = (async () => {
  const typstRenderer = createTypstRenderer();
  await typstRenderer.init({
    getModule: () =>
      'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm',
  });
  return typstRenderer;
})();
const ZOOM = 2;

interface Props {
  content: Uint8Array;
}

export function TypstDynamic(props: Props) {
  const elem = (<div />) as HTMLElement;

  createEffect(async () => {
    const renderer = await rendererPromise;
    const svg = await renderer.renderSvg({
      format: 'vector',
      artifactContent: props.content,
    });
    elem.innerHTML = svg;
    const target = elem.children[0] as SVGSVGElement;
    if (target) {
      target.setAttribute(
        'width',
        (Number(target.getAttribute('width')) * ZOOM) / 16 + 'em',
      );
      target.setAttribute(
        'height',
        (Number(target.getAttribute('height')) * ZOOM) / 16 + 'em',
      );
    }
  });

  return elem;
}
