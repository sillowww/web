export class AppLayout extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <h1 style="display: flex; align-items: center; gap: 0.5em;">
          <img src="/avatar.webp" alt="avatar" />
          willow
        </h1>
        <nav>
          <a href="/">home</a>
          <a href="/about">about</a>
          <a href="/uses">uses</a>
          <a href="/contact">contact</a>
        </nav>
      </header>
      <main id="content"></main>
      <footer>
        <p>no framework used.</p>
        <a href="https://plainvanillaweb.com/">plain vanilla web</a>
      </footer>
    `;
  }
}

customElements.define("app-layout", AppLayout);
