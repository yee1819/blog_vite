import MarkdownIt from 'markdown-it';

export function mermaidPlugin(md) {
  const defaultRenderer = md.renderer.rules.fence || ((tokens, idx, options, env, self) => {
    return self.renderToken(tokens, idx, options);
  });

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    if (token.info.trim() === 'mermaid') {
      return `<pre class="mermaid">${md.utils.escapeHtml(token.content)}</pre>`;
    }

    return defaultRenderer(tokens, idx, options, env, self);
  };
}
