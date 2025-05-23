export class AppRouter extends HTMLElement {
  private routes: { [key: string]: () => Promise<string> } = {};
  private defaultRoute = "/";
  private componentCache = new Map<string, boolean>();
  private isLoading = false;
  private preloadCache = new Map<string, Promise<string>>();

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

    document.addEventListener(
      "mouseenter",
      (e) => {
        const anchor = (e.target as HTMLElement).closest("a");
        const href = anchor?.getAttribute("href");

        if (
          href?.startsWith("/") &&
          this.routes[href] &&
          !this.preloadCache.has(href)
        ) {
          this.preloadCache.set(href, this.routes[href]());
        }
      },
      true,
    );

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

    this.isLoading = true;
    document.title = `${path === "/" ? "home" : path.slice(1)} - wlo.moe`;

    // fade out current content
    contentEl.style.opacity = "0";

    try {
      const componentTag = await routeLoader();

      if (!this.componentCache.has(componentTag)) {
        this.componentCache.set(componentTag, true);
      }

      // wait for fade out to complete
      await new Promise((resolve) => setTimeout(resolve, 150));

      // replace content
      contentEl.innerHTML = "";
      const element = document.createElement(componentTag);
      contentEl.appendChild(element);

      // fade in new content
      requestAnimationFrame(() => {
        contentEl.style.opacity = "1";
      });
    } catch (error) {
      this.showError(contentEl, error as Error);
      contentEl.style.opacity = "1";
    } finally {
      this.isLoading = false;
    }

    this.updateNavigation();
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
      if (link.getAttribute("href") === window.location.pathname) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    }
  }
}

customElements.define("app-router", AppRouter);
