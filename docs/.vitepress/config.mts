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
      outline: {
        // level:[1,6],
        level: "deep",//2，6
        label: "目录"
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
                  { text: ' 持久层', link: '/java/java持久层框架/' },
                  { text: 'Meavn', link: '/java/Meavn/' },
                  { text: 'SpringBoot', link: "/java/spring/" },
                  { text: 'SpringCloud', link: '/java/SpringCloud/' },

                ]
              },
              { text: '数据库', link: '/db/' },
              { text: '软件测试', link: '/test' },
              { text: 'Git', link: '/Git/' },



            ]
          }
        ],
        '/java/': [
          { text: '前言', link: '/java/' },
          { text: '类型', link: '/java/类型' },
        ],
        '/java/spring/': [
          { text: '前言', link: '/java/spring/' },
          { text: 'SpringBoot', link: '/java/spring/SpringBoot入门' },
        ],
        '/db/': [
          {
            text: '关系型数据库',
            items: [
              { text: 'MySql', link: '/db/MySql/' }
            ]
          }, {
            text: '非关系型数据库',
            items: [
              { text: 'Redis', link: '/db/Redis/' }
            ]
          }
        ],
        '/db/MySql/': [
          { text: 'MySql', link: '/db/MySql/' },
        ]
        ,
        '/db/Redis/': [
          { text: 'redis', link: '/db/Redis/' },
          { text: '安装', link: '/db/Redis/安装' },
          { text: '配置', link: '/db/Redis/配置' },
          {
            text: '基本命令',
            link: '/db/Redis/command',
            collapsed: false,
            items: [
              { text: '通用命令', link: '/db/Redis/command/通用命令' },
              { text: 'String（字符串）', link: '/db/Redis/command/String' },
              { text: 'Hash（哈希键值对）', link: '/db/Redis/command/Hash' },
              { text: 'List（列表）', link: '/db/Redis/command/List' },
              { text: 'Set（集合）', link: '/db/Redis/command/Set' },
              { text: 'SortedSet（有序集合）', link: '/db/Redis/command/SortedSet' },
              { text: 'GEO（地理位置）', link: '/db/Redis/command/GEO' },
              { text: 'BitMap（位图）', link: '/db/Redis/command/BitMap' },
              { text: 'HypeLogLog', link: '/db/Redis/command/HyperLogLog' }
            ]
          },
          {
            text: 'java客户端',
            link: '/db/Redis/JAVA',
            items: [
              { text: 'Jedis', link: '/db/Redis/JAVA/Jedis' },
              { text: 'Spring整合', link: '/db/Redis/JAVA/Spring' }
            ]
          },
          {
            text: '实战',
            link: '/db/Redis/实战/',
            items: [
              { text: '例一：Redis存储登录验证码+用户信息', link: '/db/Redis/实战/code' },
              {
                text: '例二：Redis缓存常见信息',
                link: '/db/Redis/实战/cache',
                // collapsed:true,
                items: [
                  { text: '缓存更新策略', link: '/db/Redis/实战/cache/缓存更新策略' },
                  { text: '缓存穿透', link: '/db/Redis/实战/cache/缓存穿透' },
                  { text: '缓存雪崩', link: '/db/Redis/实战/cache/缓存雪崩' },
                  { text: '缓存击穿', link: '/db/Redis/实战/cache/缓存击穿' },
                  { text: '封装Redis工具类', link: '/db/Redis/实战/cache/RedisUtil' }
                ]
              },
              {
                text: '例三 ：秒杀！'
                , link: '/db/Redis/实战/Spikes/',
                collapsed: true,
                items: [
                  { text: "全局ID生成器", link: "/db/Redis/实战/Spikes/id" },
                  { text: "优惠卷秒杀", link: "/db/Redis/实战/Spikes/秒杀" },
                  {
                    text: "分布式环境中",
                    link: "/db/Redis/实战/Spikes/Distributed",
                    collapsed: true,
                    items: [
                      { text: "IDEA模拟分布式多系统", link: "/db/Redis/实战/Spikes/Distributed/IDEA" },
                      { text: "分布式锁与redis实现", link: "/db/Redis/实战/Spikes/Distributed/base" },
                      { text: 'Lua脚本', link: '/db/Redis/实战/Spikes/Distributed/Lua' },
                      { text: 'Redis与lua', link: '/db/Redis/实战/Spikes/Distributed/redisWithLua' },
                      { text: '原子性', link: '/db/Redis/实战/Spikes/Distributed/原子性' },
                      { text: 'spring与lua与redis', link: '/db/Redis/实战/Spikes/Distributed/SpringWithLua' },
                      {
                        text: 'Redisson'
                        , link: '/db/Redis/实战/Spikes/Distributed/Redisson/'
                        , collapsed: true
                        , items: [
                          { text: "不可重入及解决原理与Redisson底层", link: '/db/Redis/实战/Spikes/Distributed/Redisson/不可重入' },
                          { text: 'redission源码解析与解决问题', link: '/db/Redis/实战/Spikes/Distributed/Redisson/redission源码' },
                          { text: '异步秒杀', link: '/db/Redis/实战/Spikes/Distributed/Redisson/异步' }
                        ]

                      },
                      {
                        text: '消息队列',
                        link: '/db/Redis/实战/Spikes/Distributed/mq',
                        collapsed: true,
                        items: [
                          { text: 'List模拟mq', link: '/db/Redis/实战/Spikes/Distributed/mq/List' },

                          { text: 'PubSub实现mq', link: '/db/Redis/实战/Spikes/Distributed/mq/PubSub' },
                          { text: 'Stream实现mq单消费', link: '/db/Redis/实战/Spikes/Distributed/mq/Stream单消费' },
                          { text: 'Stream消费组', link: '/db/Redis/实战/Spikes/Distributed/mq/Stream消费组' },
                          { text: 'Stream异步秒杀', link: '/db/Redis/实战/Spikes/Distributed/mq/Stream的异步秒杀' }
                        ]
                      }
                    ]
                  },

                  //分布式锁    乐观锁    // 消息队列
                ]
              },
              {
                text: '例四:其他数据类型的使用',
                link: '/db/Redis/实战/type',
                collapsed: true,
                items: [
                  {
                    text: '集合与有序集合',
                    link: '/db/Redis/实战/type/set',
                    collapsed: true,
                    items: [
                      { text: '点赞与取消点赞', link: '/db/Redis/实战/type/set/like' },
                      { text: '排行榜', link: '/db/Redis/实战/type/set/rank' }
                    ]
                  }, {
                    text: 'GEO',
                    link: '/db/Redis/command/GEO',
                    collapsed: true,
                    items: [
                      { text: '查看附近商户距离且排序', link: '/db/Redis/实战/type/geo/附近' }
                    ]
                  }, {
                    text: 'BitMap',
                    link: '/db/Redis/command/BitMap',
                    collapsed: true,
                    items: [
                      { text: '签到功能', link: '/db/Redis/实战/type/BitMap/签到' },
                      { text: '本月连续签到', link: '/db/Redis/实战/type/BitMap/连续签到' },
                    ]
                  }, { text: 'HypeLogLog', link: '/db/Redis/command/HyperLogLog' }

                ]
              }
            ]
          }, {
            text: '数据持久化', items: [
              { text: 'RDB', link: '/db/Redis/high/持久化/RDB' },
              { text: 'AOF', link: '/db/Redis/high/持久化/AOF' }
            ]
          }, {
            text: '分布式'
            , items: [

            ]
          }, {
            text: '多级缓存'
            , items: []
          }, {
            text: '最佳实践'
            , items: []
          }, {
            text: '原理篇'
            , items: []
          }


        ],
        '/java/SpringCloud/': [
          { text: '微服务', link: '/java/SpringCloud/微服务' }
        ],
        '/java/java持久层框架/': [
          {
            text: 'Mybatis',
            link: '/java/java持久层框架/mybatis/'
          },
          {
            text: 'Mybatis-plus',
            link: '/java/java持久层框架/mybatis-plus/'
          }
        ],
        '/java/java持久层框架/mybatis-plus/': [
          { text: '介绍', link: '/java/java持久层框架/mybatis-plus/' },
          { text: '入门', link: '/java/java持久层框架/mybatis-plus/入门' },
          { text: '约定与配置', link: '/java/java持久层框架/mybatis-plus/约定与配置' },
          { text: '复杂Sql', link: '/java/java持久层框架/mybatis-plus/复杂sql' },
          { text: 'Service接口', link: '/java/java持久层框架/mybatis-plus/Service接口' },

        ],
        '/java/Meavn/': [
          { text: '介绍', link: '/java/Meavn/' }
        ]




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