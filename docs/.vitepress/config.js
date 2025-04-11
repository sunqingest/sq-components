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
  base: "/sq-components/",
  title: "SQ Component UI",
  description: "基于vue3实现的组件库",
  srcDir: "./src",
  themeConfig: {
    // logo: "/vite.svg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      {
        text: "指南",
        link: "/guide/install",
        activeMatch: "/guide/",
      },
      {
        text: "组件",
        link: "/components/message",
        activeMatch: "/components/",
      },
    ],

    sidebar: {
      // 当用户位于`guide`目录时，会显示此侧边栏
      "/guide/": [
        {
          text: "基础",
          items: [
            {
              text: "安装",
              link: "/guide/install",
            },
            {
              text: "快速开始",
              link: "/guide/quickstart",
            },
          ],
        },
      ],
      // 当用户位于`components`目录时，会显示此侧边栏
      "/components/": [
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
            {
              text: "Upload上传",
              link: "/components/upload",
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
            {
              text: "Tree树形控件",
              link: "/components/tree",
            },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/sunqingest/sq-components" },
    ],
  },
});
