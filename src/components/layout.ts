export class AppLayout extends HTMLElement {
  connectedCallback() {
    const router = document.getElementsByTagName("app-router");
    console.log(router, router[0]);

    this.innerHTML = `
      <header>
        <h1 style="display: flex; align-items: center; gap: 0.5em;">
          <img src="/_avatar/48.webp" alt="TODO:" />
          willow
        </h1>
        <nav>
          <a href="/">home</a>
          <a href="/about">about</a>
          <a href="/uses">uses</a>
          <a href="/links">links</a>
        </nav>
      </header>
      <main id="content"></main>
      <footer>
        <a href="https://plainvanillaweb.com/">no framework used.</a>
        <a href="https://github.com/sillowww/web">source code.</a>
      </footer>
    `;
  }
}

customElements.define("app-layout", AppLayout);
