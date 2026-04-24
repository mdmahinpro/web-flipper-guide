import DefaultTheme from 'vitepress/theme'
import ThemeSwitcher from './ThemeSwitcher.vue'
import { h } from 'vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(ThemeSwitcher),
    })
  },
  enhanceApp({ app }: { app: any }) {
    // Client-side theme init
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('dfm-theme')
        if (saved) {
          document.documentElement.setAttribute('data-theme', saved)
        }
      } catch {}
    }
  },
}
