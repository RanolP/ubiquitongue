import {
  DynLayoutCompiler,
  NodeCompiler,
} from '@myriaddreamin/typst-ts-node-compiler';

const dyn = DynLayoutCompiler.fromBoxed(NodeCompiler.create({}));

export function compile(src: string) {
  const buf = dyn.vector({
    mainFileContent: `
      #set page(width: auto, height: auto, margin: 0pt)
      ${src}
    `,
  });
  return new Uint8Array(buf);
}
