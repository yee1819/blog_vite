import mermaid from 'mermaid';

export default ({ router }) => {
  router.onReady(() => {
    mermaid.initialize({ startOnLoad: true });

    const renderMermaidCharts = () => {
      document.querySelectorAll('.mermaid').forEach((el) => {
        mermaid.init(undefined, el);
      });
    };

    renderMermaidCharts();

    router.afterEach(() => {
      renderMermaidCharts();
    });
  });
};
