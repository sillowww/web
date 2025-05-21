import "./style.css";
import "./components/layout";
import "./components/router";
import "./components/pages";

document.querySelector<HTMLDivElement>("#app") ||
  document.body.insertAdjacentHTML("beforeend", '<div id="app"></div>');

const appMount = document.querySelector<HTMLDivElement>("#app");
if (appMount) {
  appMount.innerHTML = "<app-layout></app-layout>";
} else {
  const newAppMount = document.createElement("div");
  newAppMount.id = "app";
  document.body.appendChild(newAppMount);
}

// biome-ignore lint/suspicious/noExplicitAny: TODO: properly type
const router = document.createElement("app-router") as any;
router.setup(
  {
    "/": "home-page",
    "/about": "about-page",
    "/uses": "uses-page",
    "/contact": "contact-page",
  },
  "/",
);

document.body.appendChild(router);
