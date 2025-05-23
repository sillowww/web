import { render } from "preact";

export class HomePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = "";
    render(
      <section>
        <h2>hi, i'm willow!</h2>
        <p>welcome to my tiny corner of the web.</p>
      </section>,
      this,
    );
  }
}

customElements.define("home-page", HomePage);
