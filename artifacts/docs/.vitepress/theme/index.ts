import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './style.css'
import ThemeSwitcher from './ThemeSwitcher.vue'
import ProfitCalculator from './ProfitCalculator.vue'
import DomainStats from './DomainStats.vue'
import DomainChecklist from './DomainChecklist.vue'
import MarkDone from './MarkDone.vue'
import ProgressWidget from './ProgressWidget.vue'
import SidebarProgress from './SidebarProgress.vue'
import CongratulationsModal from './CongratulationsModal.vue'
import TechelyLogoMark from './TechelyLogoMark.vue'
import { initProgress } from './useProgress'

export default {
  extends: DefaultTheme,

  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(ThemeSwitcher),
      'home-hero-image':       () => h(TechelyLogoMark, { size: 200 }),
      'doc-before':            () => h(MarkDone),
      'home-features-after':   () => h(ProgressWidget),
      'sidebar-nav-after':     () => h(SidebarProgress),
      'layout-bottom':         () => h(CongratulationsModal),
    })
  },

  enhanceApp({ app }: { app: any }) {
    app.component('ProfitCalculator', ProfitCalculator)
    app.component('DomainStats', DomainStats)
    app.component('DomainChecklist', DomainChecklist)
    app.component('TechelyLogoMark', TechelyLogoMark)

    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('df-theme') || 'cyan'
      document.documentElement.setAttribute('data-theme', saved)
      initProgress()
    }
  },
}
