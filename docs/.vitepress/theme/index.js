import DefaultTheme from "vitepress/theme";
import { ElementPlusContainer } from "@vitepress-demo-preview/component";
import "@vitepress-demo-preview/component/dist/style.css";
// 引入组件需要的样式
import "../../../src/styles/index.css";
import "./custon.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册自定义全局组件
    app.component("demo-preview", ElementPlusContainer);
  },
};
