import {createApp } from "../../dist/guide-mini-vue.ejs.js";

import App from "./App.js";

const rootContainer = document.querySelector("#root");
createApp(App).mount(rootContainer);