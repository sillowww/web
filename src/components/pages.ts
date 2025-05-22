import { renderSectionItem, type Sections } from "../types";

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
    const sections: Sections = [
      {
        title: "system",
        items: [
          {
            label: "os",
            value: {
              type: "link",
              label: "nixos",
              link: "https://nixos.org/",
              ariaLabel: "nix os website",
            },
          },
          {
            label: "shell",
            value: {
              type: "link",
              label: "fish",
              link: "https://fishshell.com/",
              ariaLabel: "fish website",
            },
          },
          {
            label: "editor",
            value: {
              type: "link",
              label: "zed",
              link: "https://zed.dev/",
              ariaLabel: "zed.dev website",
            },
          },
          {
            label: "wm",
            value: {
              type: "link",
              label: "swayfx",
              link: "https://github.com/WillPower3309/swayfx/",
              ariaLabel: "sway effects website",
            },
          },
          {
            label: "bar",
            value: {
              type: "link",
              label: "waybar",
              link: "https://github.com/Alexays/Waybar",
              ariaLabel: "waybar website",
            },
          },
        ],
      },
      {
        title: "pc specs",
        items: [
          {
            label: "ram",
            value: {
              type: "text",
              label: "16gb",
              ariaLabel: "16 gigabytes",
            },
          },
          {
            label: "cpu",
            value: {
              type: "text",
              label: "intel core i5-3570",
            },
          },
          {
            label: "gpu",
            value: {
              type: "text",
              label: "amd radeon rx 6400 4gb",
            },
          },
        ],
      },
    ];

    this.innerHTML = `
      <section>
        <h2>uses</h2>
        <div class="uses-grid">
          ${sections
            .map(
              (section) => `
            <div>
              <h3>${section.title}</h3>
              <ul>
                ${section.items.map((item, idx) => renderSectionItem(item, idx)).join("")}
              </ul>
            </div>
          `,
            )
            .join("")}
        </div>
      </section>
    `;
  }
}

export class ContactPage extends HTMLElement {
  connectedCallback() {
    const sections: Sections = [
      {
        title: "social",
        items: [
          {
            label: "discord",
            value: {
              type: "text",
              label: "sillowww",
            },
          },
          {
            label: "bsky",
            value: {
              type: "link",
              label: "wlo.moe",
              link: "https://bsky.app/profile/wlo.moe",
              ariaLabel: "bluesky profile",
            },
          },
          {
            label: "github",
            value: {
              type: "link",
              label: "sillowww",
              link: "https://github.com/sillowww",
              ariaLabel: "github profile for sillowww",
            },
          },
          {
            label: "discuit",
            value: {
              type: "link",
              label: "@sillowww",
              link: "https://discuit.org/@sillowww",
              ariaLabel: "discuit profile for sillowww",
            },
          },
        ],
      },
      {
        title: "direct contact",
        items: [
          {
            label: "email",
            value: {
              type: "link",
              label: "hai@wlo.moe",
              link: "mailto:hai@wlo.moe",
              ariaLabel: "email address: hai at wlo dot moe",
            },
          },
          {
            label: "cat email",
            info: "send cat pictures please",
            value: {
              type: "link",
              label: "cats@wlo.moe",
              link: "mailto:cats@wlo.moe",
              ariaLabel: "email address: cats at wlo dot moe",
            },
          },
        ],
      },
    ];

    this.innerHTML = `
      <section>
        <h2>contact</h2>
        <p>i go by 'sillowww' in the majority of places.</p>
        <div class="info-grid">
          ${sections
            .map(
              (section) => `
            <div>
              <h3>${section.title}</h3>
              <ul>
                ${section.items.map((item, idx) => renderSectionItem(item, idx, "contact")).join("")}
              </ul>
            </div>
          `,
            )
            .join("")}
        </div>
      </section>
    `;
  }
}

customElements.define("home-page", HomePage);
customElements.define("about-page", AboutPage);
customElements.define("uses-page", UsesPage);
customElements.define("contact-page", ContactPage);
