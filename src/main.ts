import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

// Icons
import {
  faBars,
  faRightToBracket,
  faUserPlus,
  faRightFromBracket,
  faUser,
  faClose,
  faCheck,
  faCheckCircle,
  faTimesCircle,
  faEye,
  faEyeSlash,
  faClock,
  faTimes,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faRightToBracket,
  faUserPlus,
  faBars,
  faRightFromBracket,
  faUser,
  faClose,
  faCheck,
  faCheckCircle,
  faTimesCircle,
  faTimes,
  faEye,
  faEyeSlash,
  faClock,
  faClipboard,
);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(createPinia());
app.use(router);

app.mount("#app");
