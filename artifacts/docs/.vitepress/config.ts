import { defineConfig } from 'vitepress'
import { readdirSync, readFileSync, statSync } from 'fs'
import { resolve, join, basename } from 'path'

const DOCS_ROOT = resolve(import.meta.dirname, '..')

function toTitle(name: string): string {
  return name
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function getPageTitle(filePath: string): string {
  try {
    const content = readFileSync(filePath, 'utf-8')
    const fmMatch = content.match(/^---\s*\n[\s\S]*?^title:\s*(.+)$/m)
    if (fmMatch) return fmMatch[1].trim().replace(/^['"]|['"]$/g, '')
    const h1Match = content.match(/^#\s+(.+)$/m)
    if (h1Match) return h1Match[1].trim()
  } catch {}
  return toTitle(basename(filePath, '.md'))
}

function generateSidebarSection(dirName: string) {
  const dirPath = resolve(DOCS_ROOT, dirName)

  let entries: string[]
  try {
    entries = readdirSync(dirPath).filter((f) => f.endsWith('.md'))
  } catch {
    return null
  }

  entries.sort((a, b) => {
    if (a === 'index.md') return -1
    if (b === 'index.md') return 1
    return a.localeCompare(b, undefined, { numeric: true })
  })

  const items: { text: string; link: string }[] = []

  for (const file of entries) {
    const slug = file.replace(/\.md$/, '')
    const filePath = join(dirPath, file)
    const title = getPageTitle(filePath)
    const link = slug === 'index' ? `/${dirName}/` : `/${dirName}/${slug}`
    items.push({ text: title, link })
  }

  const indexPath = join(dirPath, 'index.md')
  let sectionText = toTitle(dirName)
  try {
    const idxContent = readFileSync(indexPath, 'utf-8')
    const h1 = idxContent.match(/^#\s+(.+)$/m)
    if (h1) sectionText = h1[1].trim()
  } catch {}

  return { text: sectionText, collapsed: false, items }
}

function generateSidebar() {
  const sidebar: ReturnType<typeof generateSidebarSection>[] = []

  const PRIORITY_DIRS = ['introduction', 'getting-started']
  const CHAPTER_PREFIX = 'part-'

  const allEntries = readdirSync(DOCS_ROOT, { withFileTypes: true })
    .filter(
      (e) =>
        e.isDirectory() &&
        !e.name.startsWith('.') &&
        e.name !== 'node_modules' &&
        e.name !== 'public',
    )
    .map((e) => e.name)

  for (const dir of PRIORITY_DIRS) {
    if (allEntries.includes(dir)) {
      const section = generateSidebarSection(dir)
      if (section) sidebar.push(section)
    }
  }

  const chapterDirs = allEntries
    .filter((d) => d.startsWith(CHAPTER_PREFIX))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  for (const dir of chapterDirs) {
    const section = generateSidebarSection(dir)
    if (section) sidebar.push(section)
  }

  const handled = new Set([...PRIORITY_DIRS, ...chapterDirs])
  const remaining = allEntries
    .filter((d) => !handled.has(d))
    .sort()

  for (const dir of remaining) {
    const section = generateSidebarSection(dir)
    if (section) sidebar.push(section)
  }

  return sidebar
}

export default defineConfig({
  base: '/web-flipper-guide/',
  title: 'ডোমেইন ফ্লিপিং মাস্টারক্লাস',
  description: 'বাংলাদেশের প্রথম সম্পূর্ণ ডোমেইন ফ্লিপিং গাইড — ১৭ অধ্যায়, ৬টি পার্ট। ২০২৬ Edition।',
  lang: 'bn',
  cleanUrls: true,
  lastUpdated: true,
  appearance: 'dark',

  vite: {
    server: { allowedHosts: true },
  },

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@400;600;700&family=Noto+Sans+Bengali:wght@400;500;600&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap',
        rel: 'stylesheet',
      },
    ],
    ['meta', { name: 'theme-color', content: '#00d4ff' }],
    ['link', { rel: 'icon', href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🌐</text></svg>' }],
    [
      'script',
      {},
      `(function(){
        document.documentElement.classList.add('dark');
        localStorage.setItem('vitepress-theme-appearance', 'dark');
        document.documentElement.setAttribute('data-theme', localStorage.getItem('df-theme') || 'cyan');
      })();`,
    ],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'ডোমেইন মাস্টারক্লাস',

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

    sidebar: generateSidebar(),

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: 'খুঁজুন',
            buttonAriaLabel: 'অধ্যায় খুঁজুন',
          },
          modal: {
            displayDetails: 'বিস্তারিত তালিকা দেখুন',
            resetButtonTitle: 'অনুসন্ধান মুছুন',
            backButtonTitle: 'অনুসন্ধান বন্ধ করুন',
            noResultsText: 'কোনো ফলাফল পাওয়া যায়নি:',
            footer: {
              selectText: 'নির্বাচন করতে',
              navigateText: 'নেভিগেট করতে',
              closeText: 'বন্ধ করতে',
              closeKeyAriaLabel: 'Escape',
            },
          },
        },
        miniSearch: {
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: { title: 4, text: 2, titles: 1 },
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
      copyright: 'Made with ❤️ by <a href="https://techely.com" target="_blank" rel="noopener">Techely</a>',
    },
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'one-dark-pro',
    },
    lineNumbers: true,
  },
})
