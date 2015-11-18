# TODO

- Check [HTML5 Boilerplate Favicon and Apple Touch Icon PSD-Template](https://drublic.de/blog/html5-boilerplate-favicons-psd-template/).
- <https://github.com/h5bp/mobile-boilerplate>
- Licensing

## Accessibility

- accessifyhtml5.js
- Check `preventDefault`.
- `humans.txt`
- Microformats

## Cross-browser

- Autoprefixer
- Check [512+ bytes for IE](http://blogs.msdn.com/b/ieinternals/archive/2010/08/19/http-error-pages-in-internet-explorer.aspx).

- Move `x-ua-compatible` into HTTP response header.

```
X-UA-Compatible: IE=edge
```

## Data Analysis

- Google Analytics
- Pingbacks

## Deployment

- <https://github.com/h5bp/server-configs>
    - Check trailing slash.
- Prevent unwanted access to `/public`.
- Set `NODE_ENV` to `production` on production.

## Design

- `BrowserUpgrade`
- Error pages

## Integrations

- IE specifics (eg. `browserconfig.xml`)
- Social networks
- Theme color
- Touch icons for Chrome Mobile

## Misc

- Get window viewport size without scrollbars.
- <https://github.com/github/fetch#obtaining-the-response-url>

## Optimization

- Check performance of React context.
- [Customize Modernizr build.](https://modernizr.com/download)
- DNS prefetching
- <https://github.com/h5bp/ant-build-script>
- Remove Jade.

### Refactoring

- A better way to house React component level properties.
- Check `getDuration()` of `css-animation` module.
- Improve `react-window-resize-listener` to support horizontal/vertical resizing.
- Modularize `SpendAbout-member`.
- Refactor media query breakpoints.

## Responsive Web

- Media query for higher resolution

```
@media print,
       (-webkit-min-device-pixel-ratio: 1.25),
       (min-resolution: 1.25dppx),
       (min-resolution: 120dpi) {
  /* Style adjustments for high resolution devices */
}
```

## SEO

- Canonical URL
- Descriptions
- Hide pages from search engines.
- Sitemap

## Text Editors

- `.editorconfig`

## UX

- <https://www.paulirish.com/2009/avoiding-the-fouc-v3/>
- Native style momentum scrolling in iOS 5+
- Prevent tooltip from hiding when hover.
- Print styles (and related utilities from Bootstrap)
