import { render } from "preact";
import { renderSectionItem, type Sections } from "../types.tsx";

export class LinksPage extends HTMLElement {
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

    this.innerHTML = "";
    render(
      <section>
        <h2>contact</h2>
        <p>i go by 'sillowww' in the majority of places.</p>
        <div class="info-grid">
          {sections.map((section) => (
            <div key={section.title}>
              <h3>{section.title}</h3>
              <ul>
                {section.items.map((item, idx) =>
                  renderSectionItem(item, idx, "contact"),
                )}
              </ul>
            </div>
          ))}
        </div>
      </section>,
      this,
    );
  }
}

customElements.define("links-page", LinksPage);
