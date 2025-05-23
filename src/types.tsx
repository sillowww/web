import type { JSX } from "react";

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

  let valueEl: JSX.Element;
  if (item.value.type === "link") {
    valueEl = (
      <a id={valueId} href={item.value.link} aria-label={item.value.ariaLabel}>
        {item.value.label}
      </a>
    );
  } else {
    valueEl = (
      <span id={valueId} aria-label={item.value.ariaLabel}>
        {item.value.label}
      </span>
    );
  }

  return (
    <li key={labelId}>
      <div class="item-main">
        <span class="label" id={labelId}>
          {item.label}
        </span>
        <span class="value" aria-labelledby={`${labelId} ${valueId}`}>
          {valueEl}
        </span>
      </div>
      {item.info && (
        <div class="info" id={infoId}>
          {item.info}
        </div>
      )}
    </li>
  );
}
