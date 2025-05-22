export class HomePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section>
        <h2>hi, i'm willow!</h2>
        <p>welcome to my tiny corner of the web.</p>
      </section>
    `;
  }
}

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

export class UsesPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section>
        <h2>uses</h2>
        <div class="uses-grid">
          <div>
            <h3>system</h3>
            <ul>
              <li>os: nixos</li>
              <li>shell: fish</li>
              <li>editor: zed.dev</li>
              <li>wm: swayfx</li>
              <li>bar: waybar</li>
            </ul>
          </div>
          <div>
            <h3>pc specs</h3>
            <ul>
              <li>ram: 16gb</li>
              <li>cpu: intel core i5-3570</li>
              <li>gpu: amd radeon rx 6400 4gb</li>
            </ul>
          </div>
        </div>
      </section>
    `;
  }
}

export class ContactPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section>
        <h2>contact</h2>
        <p>i go by 'sillowww' in the majority of places.</p>
        <ul>
          <li>discord: sillowww</li>
          <li>bsky: <a href="https://bsky.app/profile/wlo.moe" target="_blank">wlo.moe</a></li>
          <li>email: <a href="mailto:hai@wlo.moe">hai@wlo.moe</a></li>
          <li>github: <a href="https://github.com/sillowww" target="_blank">sillowww</a></li>
          <li>discuit: <a href="https://discuit.org/@sillowww" target="_blank">@sillowww</a></li>
        </ul>
      </section>
    `;
  }
}

customElements.define("home-page", HomePage);
customElements.define("about-page", AboutPage);
customElements.define("uses-page", UsesPage);
customElements.define("contact-page", ContactPage);
