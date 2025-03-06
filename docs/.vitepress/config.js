import { defineConfig } from "vitepress";
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  markdown: {
    config(md) {
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },
  title: "SQ Component UI",
  description: "A Demo Component UI ",
  srcDir: "./src",
  themeConfig: {
    // logo: "/vite.svg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      {
        text: "组件",
        link: "/components/",
        activeMatch: "/components/",
      },
    ],

    sidebar: [
      {
        text: "Feedback反馈组件",
        items: [
          {
            text: "Message消息提示",
            link: "/components/message",
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
