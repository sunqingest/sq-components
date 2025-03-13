import { defineConfig } from "vitepress";
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";
import { fileURLToPath, URL } from "node:url";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  markdown: {
    config(md) {
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("../../src", import.meta.url)),
      },
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
        link: "/components/message",
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
          {
            text: "Tooltip文字提示",
            link: "/components/tooltip",
          },
        ],
      },
      {
        text: "Form表单组件",
        items: [
          {
            text: "From表单组件",
            link: "/components/form",
          },
          {
            text: "Checkbox多选框",
            link: "/components/checkbox",
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
