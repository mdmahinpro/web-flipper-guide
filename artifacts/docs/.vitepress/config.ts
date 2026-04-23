import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'My Documentation',
  description: 'A comprehensive documentation and guide',
  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'My Documentation',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/introduction/' },
      {
        text: 'Chapters',
        items: [
          { text: 'Chapter 1', link: '/chapter-1/' },
          { text: 'Chapter 2', link: '/chapter-2/' },
          { text: 'Chapter 3', link: '/chapter-3/' },
        ],
      },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/introduction/' },
          { text: 'Overview', link: '/introduction/overview' },
          { text: 'How to Add Content', link: '/introduction/how-to-add-content' },
        ],
      },
      {
        text: 'Chapter 1: Foundations',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/chapter-1/' },
          { text: 'Section 1.1', link: '/chapter-1/section-1' },
          { text: 'Section 1.2', link: '/chapter-1/section-2' },
        ],
      },
      {
        text: 'Chapter 2: Core Concepts',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/chapter-2/' },
          { text: 'Section 2.1', link: '/chapter-2/section-1' },
          { text: 'Section 2.2', link: '/chapter-2/section-2' },
        ],
      },
      {
        text: 'Chapter 3: Advanced Topics',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/chapter-3/' },
          { text: 'Section 3.1', link: '/chapter-3/section-1' },
        ],
      },
    ],

    socialLinks: [],

    footer: {
      message: 'Built with VitePress',
    },

    search: {
      provider: 'local',
    },

    outline: {
      level: [2, 3],
      label: 'On this page',
    },

    editLink: undefined,
    lastUpdated: {
      text: 'Last updated',
    },
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'one-dark-pro',
    },
    lineNumbers: true,
  },

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap', rel: 'stylesheet' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
  ],
})
