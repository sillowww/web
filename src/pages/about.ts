export class AboutPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section>
        <h2>about</h2>
        <p>17 year old agender idiot that writes typescript. i use nixos btw.</p>
        <p>birthday: 2007</p>
        <p>pronouns: they/them</p>
        <p>country: united kingdom</p>
      </section>
    `;
  }
}
customElements.define("about-page", AboutPage);
