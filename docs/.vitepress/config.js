import { defineConfig } from "vitepress";
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";
import { fileURLToPath, URL } from "node:url";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  markdown: {
    config(md) {
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },
  vite: {
    // vitepress编译jsx语法
    plugins: [vueJsx()],
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
        text: "Basic基础组件",
        items: [
          {
            text: "Icon图标",
            link: "/components/icon",
          },
          {
            text: "Button按钮",
            link: "/components/button",
          },
        ],
      },
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
          {
            text: "MessageBox消息弹出框",
            link: "/components/messageBox",
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
      {
        text: "Data 数据展示",
        items: [
          {
            text: "VirtualList虚拟列表",
            link: "/components/virtualScrollList",
          },
          {
            text: "Collapse折叠面板",
            link: "/components/collapse",
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
