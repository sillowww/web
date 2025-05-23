import { render } from "preact";
import { renderSectionItem, type Sections } from "../types.tsx";

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

    this.innerHTML = "";
    render(
      <section>
        <h2>uses</h2>
        <div class="uses-grid">
          {sections.map((section) => (
            <div key={section.title}>
              <h3>{section.title}</h3>
              <ul>
                {section.items.map((item, idx) =>
                  renderSectionItem(item, idx, "uses"),
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
customElements.define("uses-page", UsesPage);
