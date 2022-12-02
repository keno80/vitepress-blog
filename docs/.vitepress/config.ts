import { defineConfig } from 'vitepress'
// import { version } from '../../package.json'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Kai`s Blog',
  description: 'Vite & Vue powered static site generator.',

  lastUpdated: true,
  cleanUrls: 'without-subfolders',

  head: [['meta', { name: 'theme-color', content: '#3c8772' }]],

  markdown: {
    headers: {
      level: [0, 0]
    }
  },

  themeConfig: {
    nav: nav(),

    sidebar: {
      '/front/': sidebarFront(),
      '/backend/': sidebarConfig()
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/keno80' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Keno80'
    },

    algolia: {
      appId: '8J64VVRP8K',
      apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
      indexName: 'vitepress'
    },

    // carbonAds: {
    //   code: 'CEBDT27Y',
    //   placement: 'vuejsorg'
    // }
  },

  outDir: '../vitepress'
})

function nav() {
  return [
    { text: '前端', link: '/front/vue/axios', activeMatch: '/front/' },
    // { text: 'Configs', link: '/config/introduction', activeMatch: '/config/' },
    // {
    //   text: version,
    //   items: [
    //     {
    //       text: 'Changelog',
    //       link: 'https://github.com/vuejs/vitepress/blob/main/CHANGELOG.md'
    //     },
    //     {
    //       text: 'Contributing',
    //       link: 'https://github.com/vuejs/vitepress/blob/main/.github/contributing.md'
    //     }
    //   ]
    // }
  ]
}

function sidebarFront() {
  return [
    {
      text: 'Vue',
      collapsible: true,
      items: [
        { text: '使用TS封装axios', link: '/front/vue/axios' },
      ]
    },
    {
      text: 'Uniapp',
      collapsible: true,
      items: [
        { text: 'uniapp中uni-request的封装', link: '/front/uniapp/uni-request' },
      ]
    }
  ]
}

function sidebarConfig() {
  return [
    {
      text: 'Config',
      items: [
        { text: 'Introduction', link: '/config/introduction' },
        { text: 'App Configs', link: '/config/app-configs' },
        { text: 'Theme Configs', link: '/config/theme-configs' },
        { text: 'Frontmatter Configs', link: '/config/frontmatter-configs' }
      ]
    }
  ]
}