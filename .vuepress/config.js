module.exports = {
  // 站点配置

  title: 'dingdang - 一本工具大全',
  description: '包括了git，devOps,ddd,okr,等众多技术',
  head: [
    ['link', {rel: 'shortcut icon', type: "image/x-icon", href: `/favicon.ico`}],
  ],
  host: 'localhost',
  base:'/dingdang/',
  port: 8083,
  dest: '.vuepress/dist',
  plugins: [
    ['vuepress-plugin-container',
      {
        type: 'right',
        defaultTitle: ''
      }
    ],
    ['vuepress-plugin-container',
      {
        type: 'center',
        defaultTitle: ''
      }
    ],
    ['vuepress-plugin-container',
      {
        type: 'quote',
        before: info => `<div class="quote"><p class="title">${info}</p>`,
        after: '</div>'
      },
    ],
    ['vuepress-plugin-container',
      {
        type: 'not-print',
        defaultTitle: ''
      },
    ],
    [
      '@vuepress/google-analytics',
      {
        'ga': 'G-GFKQEFHX3B'
      }
    ],
    [
      'vuepress-plugin-comment',
      {
        choosen: 'gitalk',
        options: {
          clientID: '8c5e29f91adc192a7753',
          clientSecret: '08c2227dcc3dfe7411bfeeb81f7d20a7b49be3a3',
          repo: 'dingdang',
          owner: 'shgopher',
          admin: ['shgopher'],
          labels: ["Gitalk", "Comment"],
          id: '<%- ("dingdang" + (frontmatter.to.path || window.location.pathname)).slice(-50) %>',
          title: '「Comment」<%- window.location.origin + (frontmatter.to.path || window.location.pathname) %>',
          body: '<%- window.location.origin + (frontmatter.to.path || window.location.pathname) %>',
          distractionFreeMode: false,
          pagerDirection: 'last',
        }
      }
    ],
    ['@vuepress/back-to-top'],
    ['@vuepress/nprogress'],
    'vuepress-plugin-baidu-autopush',
    ['vuepress-plugin-baidu-tongji-analytics', {
      key: '45951f610a1fa82985715b79291a8de9'
    }],
  ],
  markdown: {
    anchor: {permalink: false},
    toc: {includeLevel: [2, 3]},
  },
  // 主题和它的配置
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: 'https://avatars.githubusercontent.com/u/42873232',
    lastUpdated: '最后更新',
    smoothScroll: true,
    editLinks: true,
    repo: 'https://github.com/shgopher/dingdang',
    docsBranch: 'release',
    editLinkText: '在GitHub中编辑',
    // 添加导航栏
    nav: [
      {
        text: '首页', link: '/'
      }, 
      {
        text:"系列教程",
        ariaLabel: 'Menu',
        items:[
          {
            text:"GOFamily 【go语言教程】",
            link:"https://shgopher.github.io/GOFamily/",
          },
          {
            text:"408  【基础408知识教程】",
            link:"https://shgopher.github.io/408/",
          },
          {
            text:"luban  【系统设计教程】",
            link:"https://shgopher.github.io/luban/",
          },
          {
            text:"dingdang  【工具教程】",
            link:"https://shgopher.github.io/dingdang/",
          },
          {
            text:"god  【给程序员写的书】",
            link:"https://shgopher.github.io/god/",
          },
        ]
      },
      {
        text:'微信公众号',link:'/#wechat.png',
      },
      {
        text:'作者',link:'https://shgopher.github.io/',
      },
    ], 
    sidebar:[    
      {
        title: 'git',
        collapsable: false,
        children: [],
      },
      {
        title: 'devOps',
        collapsable: false,
        children: [],
      },
      {
        title: '正则表达式',
        collapsable: false,
        children: [],
      },
      {
        title: 'ddd',
        collapsable: false,
        children: [],
      },
      {
        title: 'okr',
        collapsable: false,
        children: [],
      },
      {
        title: 'auth',
        collapsable: false,
        children: [],
      },
      {
        title: '重构技术',
        collapsable: false,
        children: [],
      },
      {
        title: '性能优化技术',
        collapsable: false,
        children: [],
      },
      {
        title: 'debug技术',
        collapsable: false,
        children: [],
      },
      {
        title: '线上快速排障',
        collapsable: false,
        children: [],
      },
      {
        title: '测试',
        collapsable: false,
        children: [],
      },
    ],
  },
}
