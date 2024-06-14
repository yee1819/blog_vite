import { defineConfig } from 'vitepress'
import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid(
  // your existing vitepress config...
  // optionally, you can pass MermaidConfig


  // https://vitepress.dev/reference/site-config
  defineConfig({
    title: "garden",
    lang: "zh-CN",
    description: "this my garden",
    titleTemplate: 'Kirari Garden',
    lastUpdated: true,
    head: [
      ['link', { rel: 'stylesheet', href: 'https://cdn.bootcdn.net/ajax/libs/lxgw-wenkai-screen-webfont/1.7.0/lxgwwenkaiscreen.min.css' }]
    ],
    cleanUrls: true,
    markdown: {
      lineNumbers: true
    },
    mermaid: {
      // refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
    },
    // optionally set additional config for plugin itself with MermaidPluginConfig
    mermaidPlugin: {
      class: "mermaid my-class", // set additional css classes for parent container 
    },
    themeConfig: {

      // https://vitepress.dev/reference/default-theme-config
      nav: [
        { text: '主页', link: '/' },
        { text: '开始', link: '/main' },
        { text: '博客', link: 'http://kiko2568.top' }
      ],
      outline:{
        // level:[1,6],
        level:"deep",//2，6
        label:"目录"
      }
      ,
      sidebar: {
        '/main': [
          {
            text: '目录',
            items: [
              {
                text: 'Java相关',
                // link: '/java/' ,
                collapsed: true,
                items: [
                  { text: 'java基础', link: "/java/" },
                  { text: 'SpringBoot', link: "/spring/" },
                ]


              },
              { text: '数据库与Mysql', link: '/main' },
              { text: 'SpringBoot', link: '/main' },
              { text: 'Leet', link: '/api-examples' }
            ]
          }
        ],
        '/java/': [
          { text: '前言', link: '/java/' },
          { text: '类型', link: '/java/类型' },
        ],
        '/spring/': [
          { text: '前言', link: '/spring/' },
          { text: 'SpringBoot', link: '/spring/SpringBoot入门' },
        ],



      }
      , docFooter: {
        prev: '上一章节',
        next: '下一章节'
      },

      // socialLinks: [
      //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
      // ],
      lastUpdated: {
        text: '最后更新在 ',
        formatOptions: {
          dateStyle: 'full',
          timeStyle: 'medium'
        }
      },
      search: {
        provider: 'local',
        options: {
          _render(src, env, md) {
            const html = md.render(src, env)
            if (env.frontmatter?.title)
              return md.render(`# ${env.frontmatter.title}`) + html
            return html
          },
          locales: {
            zh: {
              translations: {
                button: {
                  buttonText: '搜索文档',
                  buttonAriaLabel: '搜索文档'
                },
                modal: {
                  noResultsText: '无法找到相关结果',
                  resetButtonTitle: '清除查询条件',
                  footer: {
                    selectText: '选择',
                    navigateText: '切换'
                  }
                }
              }
            }
          }
        }
      },
      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2024 <a href="https://kiko2568.top">Kirari</a>'
      },
      darkModeSwitchLabel: "夜间模式",
      lightModeSwitchTitle: "切换到浅色模式",
      darkModeSwitchTitle: "切换到深色模式",
      sidebarMenuLabel: "菜单",
      returnToTopLabel: "回到顶部",
      externalLinkIcon: true,





    }
  })



);