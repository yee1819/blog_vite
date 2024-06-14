import MarkdownIt from 'markdown-it';
import mermaid from 'mermaid';

export function mermaidPlugin(md) {
  const defaultRenderer = md.renderer.rules.fence || ((tokens, idx, options, env, self) => {
    return self.renderToken(tokens, idx, options);
  });

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    if (token.info === 'mermaid') {
      try {
        return `<div class="mermaid">${mermaid.render('mermaidChart', token.content)}</div>`;
      } catch (err) {
        return `<pre>${md.utils.escapeHtml(token.content)}</pre>`;
      }
    }

    return defaultRenderer(tokens, idx, options, env, self);
  };
}
