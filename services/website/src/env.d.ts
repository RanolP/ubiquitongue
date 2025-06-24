/// <reference types="astro/client" />

declare global {
  interface Window {
    $typst: any;
    typstReady?: boolean;
  }
}

export {};