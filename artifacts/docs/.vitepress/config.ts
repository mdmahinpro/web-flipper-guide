import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'ডোমেইন ফ্লিপিং মাস্টারক্লাস',
  description: 'শূন্য থেকে ডিজিটাল রিয়েল এস্টেট সাম্রাজ্য — একটি সম্পূর্ণ বাংলা গাইডবুক ২০২৬',
  lang: 'bn',
  base: '/',
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@400;600;700&family=Noto+Sans+Bengali:wght@400;500;600&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
        rel: 'stylesheet',
      },
    ],
    ['meta', { name: 'theme-color', content: '#0d9488' }],
    ['link', { rel: 'icon', href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🌐</text></svg>' }],
  ],
  themeConfig: {
    siteTitle: '🌐 ডোমেইন মাস্টারক্লাস',

    nav: [
      { text: '🏠 হোম', link: '/' },
      { text: '✍️ ভূমিকা', link: '/introduction/' },
      {
        text: '📚 অধ্যায়',
        items: [
          { text: '🔰 পার্ট ১: ভিত্তি গড়া', link: '/part-1/' },
          { text: '🔍 পার্ট ২: Domain খোঁজা', link: '/part-2/' },
          { text: '💰 পার্ট ৩: কেনার কৌশল', link: '/part-3/' },
          { text: '📣 পার্ট ৪: বিক্রির শিল্প', link: '/part-4/' },
          { text: '⚠️ পার্ট ৫: ঝুঁকি ও আইন', link: '/part-5/' },
          { text: '🚀 পার্ট ৬: স্কেল আপ', link: '/part-6/' },
        ],
      },
      { text: '📎 পরিশিষ্ট', link: '/appendix/' },
    ],

    sidebar: [
      {
        text: '✍️ লেখকের কথা',
        collapsed: false,
        items: [{ text: 'ভূমিকা ও পটভূমি', link: '/introduction/' }],
      },
      {
        text: '🔰 পার্ট ১ — ভিত্তি গড়া',
        collapsed: false,
        items: [
          { text: 'পার্ট পরিচিতি', link: '/part-1/' },
          { text: 'অধ্যায় ১ — ডোমেইন ফ্লিপিং কী?', link: '/part-1/chapter-1' },
          { text: 'অধ্যায় ২ — Technical Basics', link: '/part-1/chapter-2' },
          { text: 'অধ্যায় ৩ — মানসিকতা ও বাজেট', link: '/part-1/chapter-3' },
        ],
      },
      {
        text: '🔍 পার্ট ২ — Domain খোঁজার শিল্প',
        collapsed: true,
        items: [
          { text: 'পার্ট পরিচিতি', link: '/part-2/' },
          { text: 'অধ্যায় ৪ — ৭টি Golden Rule', link: '/part-2/chapter-4' },
          { text: 'অধ্যায় ৫ — কোথায় খুঁজবেন', link: '/part-2/chapter-5' },
          { text: 'অধ্যায় ৬ — Domain Valuation', link: '/part-2/chapter-6' },
        ],
      },
      {
        text: '💰 পার্ট ৩ — কেনার কৌশল',
        collapsed: true,
        items: [
          { text: 'পার্ট পরিচিতি', link: '/part-3/' },
          { text: 'অধ্যায় ৭ — Auction কৌশল', link: '/part-3/chapter-7' },
          { text: 'অধ্যায় ৮ — Expired Domain SEO', link: '/part-3/chapter-8' },
          { text: 'অধ্যায় ৯ — Flip vs Hold Strategy', link: '/part-3/chapter-9' },
        ],
      },
      {
        text: '📣 পার্ট ৪ — বিক্রির শিল্প',
        collapsed: true,
        items: [
          { text: 'পার্ট পরিচিতি', link: '/part-4/' },
          { text: 'অধ্যায় ১০ — Domain Marketplace', link: '/part-4/chapter-10' },
          { text: 'অধ্যায় ১১ — For Sale Landing Page', link: '/part-4/chapter-11' },
          { text: 'অধ্যায় ১২ — Negotiation কৌশল', link: '/part-4/chapter-12' },
        ],
      },
      {
        text: '⚠️ পার্ট ৫ — ঝুঁকি ও আইন',
        collapsed: true,
        items: [
          { text: 'পার্ট পরিচিতি', link: '/part-5/' },
          { text: 'অধ্যায় ১৩ — সাধারণ ভুলগুলো', link: '/part-5/chapter-13' },
          { text: 'অধ্যায় ১৪ — Legal ও Tax (বাংলাদেশ)', link: '/part-5/chapter-14' },
          { text: 'অধ্যায় ১৫ — AI দিয়ে Domain Flipping', link: '/part-5/chapter-15' },
        ],
      },
      {
        text: '🚀 পার্ট ৬ — স্কেল আপ',
        collapsed: true,
        items: [
          { text: 'পার্ট পরিচিতি', link: '/part-6/' },
          { text: 'অধ্যায় ১৬ — Portfolio Management', link: '/part-6/chapter-16' },
          { text: 'অধ্যায় ১৭ — Full Business Roadmap', link: '/part-6/chapter-17' },
        ],
      },
      {
        text: '📎 পরিশিষ্ট',
        collapsed: true,
        items: [{ text: 'সম্পূর্ণ রেফারেন্স সংকলন', link: '/appendix/' }],
      },
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: 'খুঁজুন', buttonAriaLabel: 'খুঁজুন' },
          modal: {
            noResultsText: 'কোনো ফলাফল পাওয়া যায়নি',
            resetButtonTitle: 'পরিষ্কার করুন',
            footer: { selectText: 'নির্বাচন', navigateText: 'নেভিগেট' },
          },
        },
      },
    },

    outline: { level: [2, 3], label: 'এই পৃষ্ঠায়' },

    lastUpdated: { text: 'সর্বশেষ আপডেট' },

    docFooter: { prev: '← পূর্ববর্তী', next: 'পরবর্তী →' },

    socialLinks: [],

    footer: {
      message: 'ডোমেইন ফ্লিপিং মাস্টারক্লাস — ২০২৬ Edition',
      copyright: 'শূন্য থেকে ডিজিটাল রিয়েল এস্টেট সাম্রাজ্য',
    },
  },

  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' },
    lineNumbers: false,
  },

  cleanUrls: true,
  lastUpdated: true,
})
