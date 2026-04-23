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
    // Check frontmatter title first
    const fmMatch = content.match(/^---\s*\n[\s\S]*?^title:\s*(.+)$/m)
    if (fmMatch) return fmMatch[1].trim().replace(/^['"]|['"]$/g, '')
    // Fall back to first H1
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
    // index always first
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

  // Section heading: read from index.md H1 or use the dir name
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

  // Ordered priority dirs first
  const PRIORITY_DIRS = ['introduction', 'getting-started']
  const CHAPTER_PREFIX = 'chapter-'

  const allEntries = readdirSync(DOCS_ROOT, { withFileTypes: true })
    .filter(
      (e) =>
        e.isDirectory() &&
        !e.name.startsWith('.') &&
        e.name !== 'node_modules' &&
        e.name !== 'public',
    )
    .map((e) => e.name)

  // Priority dirs first
  for (const dir of PRIORITY_DIRS) {
    if (allEntries.includes(dir)) {
      const section = generateSidebarSection(dir)
      if (section) sidebar.push(section)
    }
  }

  // Then chapter dirs, sorted numerically
  const chapterDirs = allEntries
    .filter((d) => d.startsWith(CHAPTER_PREFIX))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  for (const dir of chapterDirs) {
    const section = generateSidebarSection(dir)
    if (section) sidebar.push(section)
  }

  // Then any remaining dirs (not priority, not chapters)
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
    ],

    sidebar: generateSidebar(),

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
    [
      'link',
      {
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
        rel: 'stylesheet',
      },
    ],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
  ],
})
