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
      brand: { // 主色
        DEFAULT: '#D6B179', // class="bg-brand"
      },
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
      primary: {

      },
      neutral: { // 中性色
        200: '#f5f5f7', // class="bg-neutral-200"
      },
      embellishment: { // 点缀色
        500: '#f50057', // class="bg-embellishment-500"
      },
      base: {
        black: '#5A5A5A', // class="bg-light-black"
      },
      // 文字颜色
      text: 'rgba(94, 74, 35, 1)', // class='bg-text'

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
