import { defineConfig } from 'vitepress'
import { withMermaid } from "vitepress-plugin-mermaid";
import markdownItTaskLists from 'markdown-it-task-lists';

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

    markdown: {
      lineNumbers: true,
      config: (md) => {
        md.use(markdownItTaskLists)
      }
    },
    
    cleanUrls:true,
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
              {
                text: '前端',
                collapsed: true,
                items: [
                  { text: 'html', link: '/front-end/html/' },
                  { text: 'css', link: '/front-end/css/' },
                  { text: 'js', link: '/front-end/js/' },
                  { text: 'ts', link: '/front-end/ts/' },
                  { text: '框架前置', link: '/front-end/前置' },
                  { text: 'vue', link: '/front-end/vue/' },
                  { text: 'react', link: '/front-end/react/' },
                  { text: 'nodejs', link: '/front-end/nodejs/' },

                ]
              },
              { text: '数据库', link: '/db/' },
              { text: '软件测试', link: '/test/' },
              { text: 'Git', link: '/Git/' },
              { text: 'Docker', link: '/Docker/' },
              { text: 'Linux', link: '/Linux/' },
              {
                text: 'C#',
                collapsed: true,
                items: [
                  { text: 'C#基础', link: '/c_sharp/' },
                  { text: 'wpf', link: '/c_sharp/wpf' },
                ]
              },



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
            , items: [

            ]
          }, {
            text: '最佳实践'
            , items: [

            ]
          }, {
            text: '原理篇'
            , items: [

            ]
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
          { text: 'Service接口的Lambda', link: '/java/java持久层框架/mybatis-plus/Lambda' },
          { text: '批量新增', link: '/java/java持久层框架/mybatis-plus/批量新增' },

          {
            text: '扩展',
            items: [
              { text: '代码生成器', link: '/java/java持久层框架/mybatis-plus/extend/code' },
              { text: 'DB静态工具', link: '/java/java持久层框架/mybatis-plus/extend/db' },
              { text: '逻辑删除', link: '/java/java持久层框架/mybatis-plus/extend/logic' },
              { text: '枚举处理器', link: '/java/java持久层框架/mybatis-plus/extend/enum' },
              { text: 'JSON处理器', link: '/java/java持久层框架/mybatis-plus/extend/json' },
              { text: '分页查询插件', link: '/java/java持久层框架/mybatis-plus/extend/page' },

              { text: 'Mybatis-Plus 其他插件', link: '/java/java持久层框架/mybatis-plus/extend/ohter' },
              { text: '配置加密', link: '/java/java持久层框架/mybatis-plus/extend/password' }
            ]
          }
        ],
        '/java/Meavn/': [
          { text: '介绍', link: '/java/Meavn/' }
        ],
        '/Docker/': [
          { text: '介绍', link: '/Docker/' },
          { text: '安装', link: '/Docker/install' },
          { text: '名词解释', link: '/Docker/' },
          { text: '常用指令', link: '/Docker/' },
          { text: '别名', link: '/Docker/' },
          { text: '数据卷挂载', link: '/Docker/' },
          { text: '自定义部署运行与DockerFile', link: '/Docker/' },
          { text: '自定义镜像', link: '/Docker/' },
          { text: '网络', link: '/Docker/' },
          { text: 'DockerCompose', link: '/Docker/' },
          { text: '实际示范', link: '/Docker/' },
        ],
        '/test/': [
          { text: '软件测试', link: '/test/' },
          {
            text: '基础',
            link: '/test/base/',
            collapsed: true,
            items: [
              { text: '测试划分', link: '/test/base/测试划分' },
              { text: '软件质量模型', link: '/test/base/质量模型' },
              { text: '如何测试', link: '/test/base/test' },
              { text: '非功能测试', link: '/test/base/非功能' },
              { text: '用例文档', link: '/test/base/用例文档' },
              { text: '用例执行', link: '/test/base/用例执行' },
              { text: '缺陷与追踪', link: '/test/base/缺陷' },
              { text: '软件测试流程', link: '/test/base/测试流程' },
              { text: '测试报告', link: '/test/base/测试报告' },
              {
                text: '实例项目',
                link: '/test/project/',
                items: [

                ]
              },
            ]
          }, {
            text: 'App测试',
            link: '/test/app/',
            items: [

              { text: '自动化框架appium', link: '/test/auto/appium/' }
            ]
          }, {
            text: '自动化测试',
            collapsed: true,
            items: [
              {
                text: 'unitTest',
                collapsed: true,
                items: [


                  { text: 'unitTest介绍', link: '/test/auto/unitTest/' },
                  { text: '', link: '' },
                  { text: '', link: '' }


                ]
              },
              {
                text: 'selenium',
                collapsed: true,
                items: [
                  { text: 'selenium介绍', link: '/test/auto/selenium/' },
                  { text: 'selenium入门', link: '/test/auto/selenium/入门' },
                  { text: 'selenium进阶', link: '/test/auto/selenium/进阶' },
                  { text: 'selenium实战', link: '/test/auto/selenium/实战' },
                ]
              },
              {
                text: 'request',
                collapsed: true,
                items: [
                  { text: 'request介绍', link: '/test/auto/request/' },
                  { text: 'request入门', link: '/test/auto/request/入门' },
                  { text: 'request进阶', link: '/test/auto/request/进阶' },
                  { text: 'request实战', link: '/test/auto/request/实战' },
                ]
              },
              {
                text: 'pytest',
                collapsed: true,
                items: [
                  { text: 'pytest介绍', link: '/test/auto/pytest/' },
                  { text: 'pytest入门', link: '/test/auto/pytest/入门' },
                  { text: 'pytest进阶', link: '/test/auto/pytest/进阶' },
                  { text: 'pytest实战', link: '/test/auto/pytest/实战' },
                ]
              },
              {
                text: 'appium',
                collapsed: true,
                items: [
                  { text: 'appium介绍', link: '/test/auto/appium/' },
                  { text: 'appium入门', link: '/test/auto/appium/入门' },
                  { text: 'appium进阶', link: '/test/auto/appium/进阶' },
                  { text: 'appium实战', link: '/test/auto/appium/实战' },
                ]
              }

            ]

          }

        ],
        '/Linux/': [
          { text: '介绍', link: '/Linux/' },
          {
            text: '常用指令',
            link: '/Linux/command/',
            items: [
              { text: '快捷键', link: '/Linux/command/file' },
              { text: '文件夹、文件相关', link: '/Linux/command/file' },
              { text: 'vim编辑器', link: '/Linux/command/vim' },
              { text: '用户、用户组', link: '/Linux/command/user' },
              { text: '权限', link: '/Linux/command/file' },
              { text: '下载之yum', link: '/Linux/command/file' },
              { text: 'systemctl自启动', link: '/Linux/command/file' },
              { text: '软链接', link: '/Linux/command/file' },
              { text: '网络', link: '/Linux/command/file' },
              { text: '进程', link: '/Linux/command/file' },
              { text: '磁盘内存与CPU', link: '/Linux/command/file' },
              { text: '压缩与解压', link: '/Linux/command/zip' },
              { text: '定时任务', link: '/Linux/command/cron' },
            ]
          },
          {
            text: '部署环境',
            link: '/Linux/',
            collapsed: false,
            items: [
              { text: 'Tomcat', link: '/Linux/deploy/Tomcat' },
              { text: 'Nginx', link: '/Linux/deploy/Nginx' },
              { text: 'Redis', link: '/Linux/deploy/Redis' },
              { text: 'Mysql', link: '/Linux/deploy/Mysql' },
            ]
          },
          {
            text: 'Shell',
            link: '/Linux/shell/',
            items: [
              { text: 'Shell介绍', link: '/Linux/shell/' },
              { text: '运行', link: '/Linux/shell/run' },
              { text: '变量', link: '/Linux/shell/var' },
              { text: '运行时传参', link: '/Linux/shell/run_var' },
              { text: '算术运算符', link: '/Linux/shell/operator' },
              { text: 'if分支', link: '/Linux/shell/if' },
              { text: 'case分支', link: '/Linux/shell/case' },
              { text: 'for循环', link: '/Linux/shell/for' },
              { text: 'while循环', link: '/Linux/shell/while' },
              { text: '函数', link: '/Linux/shell/func' },


            ]
          }
        ],
        '/c_sharp/': [
          { text: 'C#', link: '/c_sharp/' },
          {
            text: '基础',
            items: [
              { text: '介绍', link: '/c_sharp/base/' },
              { text: '安装环境', link: '/c_sharp/base/install' },
              { text: '框架介绍', link: '/c_sharp/base/frame' },
              { text: '依赖管理', link: '/c_sharp/base/nuget' },
              { text: '项目结构', link: '/c_sharp/base/project_struct' },
              { text: 'C#代码结构', link: '/c_sharp/base/code_struct' },
              { text: '数据类型', link: '/c_sharp/base/data_type' },
              { text: '变量', link: '/c_sharp/base/var' },
              { text: '常量', link: '/c_sharp/base/const' },
              { text: '运算符', link: '/c_sharp/base/operator' },
              { text: '数组', link: '/c_sharp/base/array' },
              { text: '多维数组', link: '/c_sharp/base/arrays' },
              { text: '字符串', link: '/c_sharp/base/string' },
              { text: '结构体', link: '/c_sharp/base/struct' },
              { text: '分支', link: '/c_sharp/base/branch' },
              { text: '循环', link: '/c_sharp/base/loop' },
              { text: '异常', link: '/c_sharp/base/exception' },
              { text: '函数', link: '/c_sharp/base/func' },
              { text: '枚举', link: '/c_sharp/base/enum' },
              { text: '泛型', link: '/c_sharp/base/generic' },

            ]
          },
          {
            text: '面向对象篇',
            items: [
              { text: '类与对象', link: '/c_sharp/object/class' },
              { text: '继承与多态', link: '/c_sharp/object/inherit' },
              { text: '属性', link: '/c_sharp/object/property' },
              { text: '方法', link: '/c_sharp/object/method' },
            ]
          },
        ],
        '/c_sharp/wpf/': [

        ],
        '/front-end/': [
          {
            text: '前端',
            link: '/front-end/',
            items: [
              { text: 'html', link: '/front-end/html/' },
              { text: 'css', link: '/front-end/css/' },
              { text: 'js', link: '/front-end/js/' },
              { text: 'ts', link: '/front-end/ts/' },
              { text: '框架前置', link: '/front-end/前置' },
              { text: 'vue', link: '/front-end/vue/' },
              { text: 'react', link: '/front-end/react/' },
              { text: 'nodejs', link: '/front-end/nodejs/' },

            ]
          },
        ]
        ,
        '/front-end/vue/': [
          { text: 'vue', link: '/front-end/vue/' },
          { text: 'vue2', link: '/front-end/vue/vue2' },
          { text: 'vue3', link: '/front-end/vue/vue3' },
        ],
        '/front-end/vue/vue3/': [
          { text: 'vue3', link: '/front-end/vue/vue3/' },
          { text: '创建项目', link: '/front-end/vue/vue3/install' },
          { text: '项目结构', link: '/front-end/vue/vue3/project' },
          { text: '组件', link: '/front-end/vue/vue3/component' },
          { text: '模板语法', link: '/front-end/vue/vue3/temp' },
          {
            text: "指令",
            link: '/front-end/vue/vue3/directive',
            collapsed: true,
            items: [
              { text: 'v-if 判断 与 v-show', link: '/front-end/vue/vue3/directive/v-if-show' },
              { text: 'v-for', link: '/front-end/vue/vue3/directive/v-for' },
              { text: 'v-model', link: '/front-end/vue/vue3/directive/v-model' },
              { text: 'v-bind', link: '/front-end/vue/vue3/directive/v-bind' },
              { text: 'v-on', link: '/front-end/vue/vue3/directive/v-on' },
              { text: 'v-slot', link: '/front-end/vue/vue3/directive/v-slot' },
              { text: '自定义指令', link: '/front-end/vue/vue3/directive/custom' },
              { text: 'v-html', link: '/front-end/vue/vue3/directive/v-html' }
            ]
          },
          { text: 'setup', link: '/front-end/vue/vue3/setup' },
          { text: 'composition', link: '/front-end/vue/vue3/composition' },
          { text: 'ref', link: '/front-end/vue/vue3/ref' },
          { text: 'reactive', link: '/front-end/vue/vue3/reactive' },
          { text: 'toRef 与 toRefs', link: '/front-end/vue/vue3/toRef' },
          { text: 'computed', link: '/front-end/vue/vue3/computed' },
          { text: 'watch 监听相关', link: '/front-end/vue/vue3/watch' },
          { text: '生命周期', link: '/front-end/vue/vue3/lifeCycle' },
          { text: 'Hooks', link: '/front-end/vue/vue3/hooks' },
          { text: '路由', link: '/front-end/vue/vue3/router' },
          { text: '插件', link: '/front-end/vue/vue3/plugin' },
          { text: 'pinia', link: '/front-end/vue/vue3/pinia' },
          {
            text: '通信',
            link: '/front-end/vue/vue3/communication',
            collapsed: true,
            items: [
              { text: 'props', link: '/front-end/vue/vue3/communication/props' },
              { text: 'emit', link: '/front-end/vue/vue3/communication/emit' },
              { text: 'provide/inject', link: '/front-end/vue/vue3/communication/provide' },
              { text: 'ref', link: '/front-end/vue/vue3/communication/ref' },
            ],
          },
          {
            text: '插槽',
            link: '/front-end/vue/vue3/slot',
            collapsed: true,
            items: [
              { text: '作用域插槽', link: '/front-end/vue/vue3/slot/scope' },
              { text: '具名插槽', link: '/front-end/vue/vue3/slot/name' },
              { text: '默认插槽', link: '/front-end/vue/vue3/slot/default' },
            ],
          }

        ],
        '/front-end/react/': [
          { text: 'react', link: '/front-end/react/' },
          { text: '安装', link: '/front-end/react/install' },
          { text: 'jsx、tsx', link: '/front-end/react/jsx' },
          { text: '组件', link: '/front-end/react/component' },
          { text: 'classnames', link: '/front-end/react/classnames' },
          { text: 'useState', link: '/front-end/react/useState' },
          { text: 'Props', link: '/front-end/react/props' },
          { text: 'useContext', link: '/front-end/react/useContext' },
          { text: 'useRef', link: '/front-end/react/useRef' },
          { text: 'useEffect', link: '/front-end/react/useEffect' },

          { text: 'useReducer', link: '/front-end/react/useReducer' },
          {
            text: '第三方状态管理',
            link: '/front-end/react/stateManagement/',
            items: [
              { text: 'Redux', link: '/front-end/react/stateManagement/redux' },
              { text: 'Mobx', link: '/front-end/react/stateManagement/mobx' },
              { text: 'Recoil', link: '/front-end/react/stateManagement/recoil' },
              { text: 'Zustand', link: '/front-end/react/stateManagement/zustand' },
            ]
          },
          {
            text: '路由',
            link: '/front-end/react/router/',
            items: [
              { text: 'react-router介绍', link: '/front-end/react/router/index' },
              { text: '基本使用', link: '/front-end/react/router/base' },
              { text: '路由导航', link: '/front-end/react/router/nav' },
              { text: '路由参数', link: '/front-end/react/router/params' },
              { text: '404', link: '/front-end/react/router/404' },
              { text: '路由守卫', link: '/front-end/react/router/guard' },
              { text: '嵌套路由', link: '/front-end/react/router/nested' },
              { text: '默认路由', link: '/front-end/react/router/default' },
              { text: '懒加载', link: '/front-end/react/router/lazy' },
              { text: '路由模式', link: '/front-end/react/router/mode' },

            ]
          },

          {
            text: '性能优化',
            link: '/front-end/react/performance/',
            items: [
              { text: 'useMemo', link: '/front-end/react/performance/useMemo' },
              { text: 'useCallback', link: '/front-end/react/performance/useCallback' },
            ]
          },
          {
            text: '其他Hooks',
            link: '/front-end/react/otherHooks',
            items: [
              { text: '自定义Hooks', link: '/front-end/react/otherHooks/custom' },
              { text: 'useImperativeHandle', link: '/front-end/react/otherHooks/useImperativeHandle' },
              { text: 'useLayoutEffect', link: '/front-end/react/otherHooks/useLayoutEffect' },
              { text: 'useDebugValue', link: '/front-end/react/otherHooks/useDebugValue' },
              { text: 'useDeferredValue', link: '/front-end/react/otherHooks/useDeferredValue' },
              { text: 'useTransition', link: '/front-end/react/otherHooks/useTransition' },
              { text: 'useId', link: '/front-end/react/otherHooks/useId' },
              { text: 'useSyncExternalStore', link: '/front-end/react/otherHooks/useSyncExternalStore' },
              { text: 'useInsertionEffect', link: '/front-end/react/otherHooks/useInsertionEffect' },

            ]
          },





        ],
        '/front-end/前置/': [
          { text: '前置', link: '/front-end/前置/' },
          {
            text: '网络',
            link: '/front-end/前置/network/',
            items: [
              { text: '网络协议', link: '/front-end/前置/network/protocol' },
              { text: 'ip', link: '/front-end/前置/network/ip' },
              { text: 'tcp', link: '/front-end/前置/network/tcp' },
              { text: 'socket', link: '/front-end/前置/network/socket' },

              { text: 'udp', link: '/front-end/前置/network/udp' },
              { text: 'dns', link: '/front-end/前置/network/dns' },
              { text: 'http', link: '/front-end/前置/network/http' },
              { text: 'https', link: '/front-end/前置/network/https' },
              { text: '跨域', link: '/front-end/前置/network/cross' },
              { text: '代理', link: '/front-end/前置/network/proxy' },

            ]

          }, {
            text: '模块化', link: '/front-end/前置/module',
          }

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
