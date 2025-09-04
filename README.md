## Try it now!

> Vitesse requires Node >=14.18

> 推荐安装20.17.0（LTS）版本
> nvm install 20.17.0
> nvm use 20.17.0

### Clone to local

```bash
npm i
```

### Development

Just run and visit http://localhost:3333

```bash
npm dev
```

### Build

To build the App, run

```bash
npm build
```

And you will see the generated file in `dist` that ready to be served.

## File-based Routing

Routes will be auto-generated for Vue files in this dir with the same file structure.
Check out [`unplugin-vue-router`](https://github.com/posva/unplugin-vue-router) for more details.

### Path Aliasing

`~/` is aliased to `./src/` folder.

For example, instead of having

```ts
import { isDark } from '../../../../composables'
```

now, you can use

```ts
import { isDark } from '~/composables'
```

## Modules

main.ts中会自动加载modules下的ts文件，ts文件中做如下改造

A custom user module system. Place a `.ts` file with the following template, it will be installed automatically.

```ts
import type { UserModule } from '~/types'

export const install: UserModule = ({ app, router, isClient }) => {
  // do something
}
```

## Layouts

默认使用default.vue下的布局，如果需要换其他布局，按照如下方式写：

Vue components in this dir are used as layouts.

By default, `default.vue` will be used unless an alternative is specified in the route meta.

With [`unplugin-vue-router`](https://github.com/posva/unplugin-vue-router) and [`vite-plugin-vue-layouts`](https://github.com/JohnCampionJr/vite-plugin-vue-layouts), you can specify the layout in the page's SFCs like this:

```html
<route lang="yaml"> meta: layout: 404 </route>
```

## Components

Components in this dir will be auto-registered and on-demand, powered by [`unplugin-vue-components`](https://github.com/antfu/unplugin-vue-components).

### Icons

You can use icons from almost any icon sets by the power of [Iconify](https://iconify.design/).

It will only bundle the icons you use. Check out [`unplugin-icons`](https://github.com/antfu/unplugin-icons) for more details.
