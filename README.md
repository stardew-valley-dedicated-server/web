# Junimo Server - Web

![Static Badge](https://img.shields.io/badge/Status-Not%20Stable-e05d44)

The admin web interface for [Junimo Server](https://github.com/stardew-valley-server/server).

> **Note:** The project is currently undergoing a rewrite, readme is expected to be incomplete or wrong.
> 
## Table of contents
<!-- REGENRATE TOC: npm run readme:generate -->

<!-- toc --> 

- [Table of contents](#table-of-contents)
- [Quick Start](#quick-start)
- [Development](#development)
- [Production](#production)
- [TODO](#todo)
  - [Replace admin template](#replace-admin-template)

<!-- tocstop -->

## Quick Start

Make sure to install the dependencies:

```bash
# npm
npm install
```

## Development

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production and open a local preview with the production build:

```bash
# npm
npm run build
npm run preview
```

## TODO

### Replace admin template
* https://github.com/epicmaxco/vuestic-admin free and similar capabilities
* https://ivanlu.dev/nuxt-js-integrating-with-novnc/ integrate vnc into web ui (https://github.com/novnc/noVNC/blob/7fcf9dcfe0cc5b14e3841a4429dc091a6ffca861/docs/EMBEDDING.md, https://github.com/TrumanGao/vue-vnc)
