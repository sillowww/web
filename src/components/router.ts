export class AppRouter extends HTMLElement {
  private routes: { [key: string]: string } = {};
  private defaultRoute = "/";

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

  setup(routes: { [key: string]: string }, defaultRoute = "/") {
    this.routes = routes;
    this.defaultRoute = defaultRoute;
    return this;
  }

  navigate(path: string) {
    window.history.pushState(null, "", path);
    this.render();
  }

  private render() {
    const path = window.location.pathname || this.defaultRoute;
    const contentEl = document.querySelector<HTMLElement>("#content");

    if (!contentEl) return;

    contentEl.innerHTML = "";

    const componentTag = this.routes[path];
    if (componentTag) {
      const element = document.createElement(componentTag);
      contentEl.appendChild(element);
    } else {
      contentEl.innerHTML = "<p>404 - page not found</p>";
    }

    const navLinks = document.querySelectorAll("nav a");
    // navLinks.forEach((link) => {
    for (const link of navLinks) {
      if (link.getAttribute("href") === window.location.pathname) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    }
    // });
  }
}

customElements.define("app-router", AppRouter);
