/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
/* import font awesome icon component */
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* import specific icons */
import { fas } from "@fortawesome/free-solid-svg-icons";

import Button from "./components/Button";
import Collapse, { CollapseItem } from "./components/Collapse";
import Message, { createMessage } from "./components/Message";

import "./styles/index.css";

/* add icons to the library */
library.add(fas);

const components = [Button, Collapse, CollapseItem, Message];

// 完整引入 install方法
const install = (app) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};

// 按需导入
export { Button, Collapse, CollapseItem, Message, createMessage, install };

export default {
  install,
};
