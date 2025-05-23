export class AppRouter extends HTMLElement {
  private routes: { [key: string]: () => Promise<string> } = {};
  private defaultRoute = "/";
  private componentCache = new Map<string, boolean>();
  private isLoading = false;

  connectedCallback() {
    window.addEventListener("popstate", () => this.render());

    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor?.getAttribute("href")?.startsWith("/")) {
        e.preventDefault();
        const href = anchor.getAttribute("href") || "/";
        this.navigate(href);
      }
    });

    this.render();
  }

  setup(routes: { [key: string]: () => Promise<string> }, defaultRoute = "/") {
    this.routes = routes;
    this.defaultRoute = defaultRoute;
    return this;
  }

  navigate(path: string) {
    window.history.pushState(null, "", path);
    this.render();
  }

  private async render() {
    if (this.isLoading) return;

    const path = window.location.pathname || this.defaultRoute;
    const contentEl = document.querySelector<HTMLElement>("#content");
    if (!contentEl) return;

    const routeLoader = this.routes[path];
    if (!routeLoader) {
      contentEl.innerHTML = "<p>404 - page not found</p>";
      this.updateNavigation();
      return;
    }

    this.showLoading(contentEl);
    this.isLoading = true;

    try {
      const componentTag = await routeLoader();

      if (!this.componentCache.has(componentTag)) {
        this.componentCache.set(componentTag, true);
      }

      contentEl.innerHTML = "";
      const element = document.createElement(componentTag);
      contentEl.appendChild(element);
    } catch (error) {
      this.showError(contentEl, error as Error);
    } finally {
      this.isLoading = false;
    }

    this.updateNavigation();
  }

  private showLoading(contentEl: HTMLElement) {
    contentEl.innerHTML = `
      <div class="loading">
        <div class="spinner"></div>
        <p>loading...</p>
      </div>
    `;
  }

  private showError(contentEl: HTMLElement, error: Error) {
    contentEl.innerHTML = `
      <div class="error">
        <p>failed to load page: ${error.message}</p>
        <button onclick="window.location.reload()">retry</button>
      </div>
    `;
  }

  private updateNavigation() {
    const navLinks = document.querySelectorAll("nav a");
    for (const link of navLinks) {
      if (link.getAttribute("href") === window.location.pathname)
        link.classList.add("active");
      else link.classList.remove("active");
    }
  }
}

customElements.define("app-router", AppRouter);
