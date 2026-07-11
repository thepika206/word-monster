import pluginVue from 'eslint-plugin-vue'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
    {
        ignores: ['dist/**', 'node_modules/**'],
    },
    ...pluginVue.configs['flat/recommended'],
    eslintPluginPrettierRecommended,
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
    },
]
