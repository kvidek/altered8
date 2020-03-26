# Altered8 — web
[altrd8.dev](https://altrd8.dev)

#### Build system

- [Gulp](https://gulpjs.com/) 4 used
- [browsersync](https://browsersync.io/) for live reload

#### (S)CSS

- based on **ITCSS** architecture (read about it [here](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)) and inspired by [inuitcss framework](https://github.com/inuitcss/inuitcss)
- sassbox (scss functions/mixins module)is installed by default, but it's not imported in main style.scss file. For docs and installation, [read this](https://github.com/degordian/sassbox).
- uses postcss by default - autoprefixer will automatically add vendor prefixes by [browserslist ruleset defined inside package.json](https://github.com/postcss/autoprefixer#browsers)

#### Scripts

```bash
npm run dev - dev environent with browsersync
npm run build - build production
npm run build:analyze - builds production creates an informational page about your js bundles
```

## License

MIT
