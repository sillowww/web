export type Section = {
  title: string;
  items: {
    label: string;
    info?: string;
    value:
      | {
          type: "link";
          label: string;
          link: string;
          ariaLabel: string;
        }
      | {
          type: "text";
          label: string;
          ariaLabel?: string;
        };
  }[];
};

export type Sections = Section[];

export function renderSectionItem(
  item: Section["items"][number],
  idx: number,
  prefix = "item",
) {
  const labelId = `${prefix}-label-${idx}`;
  const valueId = `${prefix}-value-${idx}`;
  const infoId = item.info ? `${prefix}-info-${idx}` : "";

  let valueHtml = "";
  if (item.value.type === "link") {
    valueHtml = `<a id="${valueId}" href="${item.value.link}" aria-label="${item.value.ariaLabel}">${item.value.label}</a>`;
  } else {
    if (item.value.ariaLabel) {
      valueHtml = `<span id="${valueId}" aria-label="${item.value.ariaLabel}">${item.value.label}</span>`;
    } else {
      valueHtml = `<span id="${valueId}">${item.value.label}</span>`;
    }
  }

  const infoHtml = item.info
    ? `<div class="info" id="${infoId}">${item.info}</div>`
    : "";

  return `<li>
    <div class="item-main">
      <span class="label" id="${labelId}">${item.label}</span>
      <span class="value" aria-labelledby="${labelId} ${valueId}">${valueHtml}</span>
    </div>
    ${infoHtml}
  </li>`;
}
