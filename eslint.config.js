// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
  },
  {
    rules: {
      'vue/define-macros-order': 'off',
      // 'no-console': 0, // 禁止使用console
    },
  },
)
