// 1. Import `extendTheme` function
import { type ThemeConfig, extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

// 3. Extend the theme
const theme = extendTheme({ config })

export default theme