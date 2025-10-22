import { ref, onMounted } from 'vue'

type Theme = 'mitrekalight' | 'mitrekadark'

const currentTheme = ref<Theme>('mitrekalight')

export function useTheme() {
  const setTheme = (theme: Theme) => {
    currentTheme.value = theme
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }

  const toggleTheme = () => {
    setTheme(currentTheme.value === 'mitrekalight' ? 'mitrekadark' : 'mitrekalight')
  }

  onMounted(() => {
    const saved = (localStorage.getItem('theme') as Theme) || 'mitrekalight'
    setTheme(saved)
  })

  return { currentTheme, setTheme, toggleTheme }
}