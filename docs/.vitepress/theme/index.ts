// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import MyLayout from './MyLayout.vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import './styles/index.css'


export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  // Layout: () => {
  //   return h(DefaultTheme.Layout, null, {
  //     // https://vitepress.dev/guide/extending-default-theme#layout-slots
  //   })
  // },
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme
