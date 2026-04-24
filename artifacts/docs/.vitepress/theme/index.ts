import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './style.css'
import ThemeSwitcher from './ThemeSwitcher.vue'
import ProfitCalculator from './ProfitCalculator.vue'
import DomainStats from './DomainStats.vue'
import DomainChecklist from './DomainChecklist.vue'

export default {
  extends: DefaultTheme,

  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(ThemeSwitcher),
    })
  },

  enhanceApp({ app }: { app: any }) {
    app.component('ProfitCalculator', ProfitCalculator)
    app.component('DomainStats', DomainStats)
    app.component('DomainChecklist', DomainChecklist)

    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('df-theme') || 'cyan'
      document.documentElement.setAttribute('data-theme', saved)
    }
  },
}
