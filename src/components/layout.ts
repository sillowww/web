export class AppLayout extends HTMLElement {
  connectedCallback() {
    const router = document.getElementsByTagName("app-router");
    console.log(router, router[0]);

    this.innerHTML = `
      <a href="#content" class="skip-link">skip to main content</a>
      <header role="banner">
        <h1 style="display: flex; align-items: center; gap: 0.5em;">
          <img src="/_avatar/48.webp" alt="TODO:" />
          willow
        </h1>
        <nav role="navigation" aria-label="main navigation">
          <a href="/">home</a>
          <a href="/about">about</a>
          <a href="/uses">uses</a>
          <a href="/links">links</a>
        </nav>
      </header>
      <main role="main" aria-live="polite" id="content"></main>
      <footer role="contentinfo">
        <a href="https://plainvanillaweb.com/">no framework used.</a>
        <a href="https://github.com/sillowww/web">source code.</a>
      </footer>
    `;
  }
}

customElements.define("app-layout", AppLayout);
