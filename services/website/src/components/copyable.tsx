import { createSignal } from 'solid-js';

interface Props {
  text: string;
}
export function Copyable(props: Props) {
  const [copied, setCopied] = createSignal(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(props.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      class="text-primary hover:text-primary/80 text-sm"
    >
      {copied() ? 'Copied!' : 'Copy'}
    </button>
  );
}
