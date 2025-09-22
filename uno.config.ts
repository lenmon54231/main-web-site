import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import presetWind from '@unocss/preset-wind'
import presetRemToPx from '@unocss/preset-rem-to-px'

// const pxRE = /(-?[.\d]+)px/g
// function pxToRemPreset() {
//   // https://github.com/unocss/unocss/issues/2176
//   const baseFontSize = 16
//   return {
//     name: '@unocss/preset-px-to-rem',
//     postprocess: (util: { entries: any[] }) => {
//       util.entries.forEach((i) => {
//         const value = i[1]
//         if (value && typeof value === 'string' && pxRE.test(value))
//           i[1] = value.replace(pxRE, (_, p1) => `${p1 / baseFontSize}rem`)
//       })
//     },
//   }
// }
export default defineConfig({
  theme: {
    colors: {
      semantic: { // 辅助色
        100: '#faf3e0', // class="bg-semantic-100"
        200: '#FFF6E1', // class="bg-semantic-200"
        300: '#FEE889', // class="bg-semantic-300"
        400: '#FDDE6C', // class="bg-semantic-400"
        500: '#FCCF3C', // class="bg-semantic-500"
        600: '#D8AC2B', // class="bg-semantic-600"
        700: '#B7751A', // class="bg-semantic-700"
        800: '#935710', // class="bg-semantic-800"
        900: '#7A420A', // class="bg-semantic-900"
      },

      /* 石青主背景 + 衍生梯度 */
      blue: {
        DEFAULT: '#3a7ca5',
        100: '#e6f0f5',
        200: '#c3d9e6',
        300: '#9cc0d4',
        400: '#6fa3bd',
        500: '#3a7ca5', // ← 你指定的主背景
        600: '#2e658a',
        700: '#255270',
        800: '#1a3b52',
        900: '#0f2735',
      },

      /* 金箔系列 */
      gold: {
        DEFAULT: '#d4af37',
        100: '#fcf8e6',
        200: '#f9edc0',
        300: '#f7e099',
        400: '#f5d372',
        500: '#d4af37', // 主金色
        600: '#b89730',
        700: '#9c7f29',
        800: '#7f6622',
        900: '#644e1b',
      },

      /* 石绿系列 */
      green: {
        DEFAULT: '#4a8b6b',
        100: '#e6f0e8',
        200: '#c3d9cb',
        300: '#9cc0a8',
        400: '#6fa384',
        500: '#4a8b6b',
        600: '#3c7157',
        700: '#2f5844',
        800: '#223f31',
        900: '#16261f',
      },

      /* 朱砂系列（危险/删除） */
      red: {
        DEFAULT: '#e86a61',
        100: '#fae6e5',
        200: '#f4c3c0',
        300: '#ec9c96',
        400: '#e46f66',
        500: '#e86a61',
        600: '#d0554d',
        700: '#b3463f',
        800: '#933731',
        900: '#7a2a25',
      },
    },
  },
  extendTheme: (theme: any) => {
    return {
      ...theme,
      breakpoints: {
        ...theme.breakpoints,
        // xs: '320px', // mobile Tailwind 上无xs断点
        // sm: '640px', // mobile
        // md: '768px', //IPad
        // lg: '1024px', //IPad
        // xl: '1280px', // PC
        // 2xl: '1536px', // PC
      },
    }
  },
  shortcuts: [
    ['btn', 'px-4 py-1 rounded bg-semantic-700 text-white cursor-pointer !outline-none hover:bg-semantic-900 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['flex-row-center', 'flex flex-row justify-center items-center'],
    ['flex-row-between', 'flex flex-row justify-between items-center'],
    ['flex-row-end', 'flex flex-row justify-end items-center'],
    ['flex-row-start', 'flex flex-row justify-start items-center'],
    ['flex-row-around', 'flex flex-row justify-around items-center'],
    ['flex-col-center', 'flex flex-col justify-center items-center'],
    ['flex-col-start', 'flex flex-col justify-center items-start'],
    ['flex-col-end', 'flex flex-col justify-center items-end'],
    ['flex-row-wrap-start', 'flex flex-row flex-wrap justify-start items-center'],
    ['flex-row-wrap-around', 'flex flex-row flex-wrap justify-around items-center'],
    ['flex-row-wrap-between', 'flex flex-row flex-wrap justify-between items-center'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
    }),
    presetTypography(),
    presetWind(),
    presetRemToPx(),
    // pxToRemPreset(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
