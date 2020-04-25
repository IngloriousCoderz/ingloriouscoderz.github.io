import NextSeo from 'next-seo'

import wallpaper from '~/static/images/metal-wallpaper.jpg'
import Toolbar from './toolbar'
import Header from './header'
import Footer from './footer'

export default ({ path, title, description, children }) => (
  <div className="layout container-fluid">
    <NextSeo
      config={{
        canonical: `https://www.ingloriouscoderz.it/${path}`,
        title,
        description,
        openGraph: {
          url: `https://www.ingloriouscoderz.it/${path}`,
          title: `${title} | Inglorious Coderz`,
          description,
        },
      }}
    />

    <Toolbar />

    <Header wallpaper={wallpaper} />

    <main>{children}</main>

    <Footer />

    <style jsx global>{`
      @font-face {
        font-family: 'Ethnocentric';
        font-display: auto;
        font-style: normal;
        font-weight: 400;
        src: url('/static/fonts/ethnocentric_rg.ttf') format('truetype');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
          U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
          U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Orbitron';
        font-display: auto;
        font-style: normal;
        font-weight: 400;
        src: url('/static/fonts/orbitron.woff2') format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
          U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
          U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Roboto';
        font-display: auto;
        font-style: normal;
        font-weight: 400;
        src: url('/static/fonts/roboto.woff2') format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
          U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
          U+2212, U+2215, U+FEFF, U+FFFD;
      }

      // NOTE: I prefer Roboto for now
      // @font-face {
      //   font-family: 'Ubuntu';
      //   font-display: auto;
      //   font-style: normal;
      //   font-weight: 400;
      //   src: local('Ubuntu Regular'), local('Ubuntu-Regular'),
      //     rl('/static/fonts/ubuntu.woff2') format('woff2');
      //   unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
      //     U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
      //     U+2212, U+2215, U+FEFF, U+FFFD;
      // }

      @font-face {
        font-family: 'Fira Code';
        font-display: auto;
        font-style: normal;
        font-weight: 400;
        src: url('/static/fonts/firacode.woff2') format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
          U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
          U+2212, U+2215, U+FEFF, U+FFFD;
      }

      /* get rid of that ugly Firefox outline around links and buttons */
      :focus {
        outline: none;
      }
      ::-moz-focus-inner {
        border: 0;
      }

      html,
      body,
      #__next {
        height: 100%;
        margin: 0;
      }

      html {
        font-family: 'Roboto', 'Ubuntu', sans-serif;
        font-size: 16px;
        line-height: 1.5;
        color: #bbb;
      }

      body,
      .layout {
        background: black;
        background-image: url(${wallpaper});
        background-position-x: center;
        background-attachment: fixed;
      }

      ${new Date().getMonth() === 5
        ? `
      body {
        background: linear-gradient(red, red 16.666vh, orange 16.666vh, orange 33.333vh, yellow 33.333vh, yellow 50vh, green 50vh, green 66.666vh, blue 66.666vh, blue 83.333vh, purple 83.333vh, purple 100vh);
      }
      .layout {
        box-shadow: 5px 0 5px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      }
      `
        : ''}

      a {
        color: #429aef;
        text-decoration: none;
      }

      a:hover {
        filter: brightness(125%);
      }

      h1,
      h2,
      h3 {
        font-family: 'Orbitron';
        font-weight: normal;
        color: #98c379;
      }

      h1 {
        font-size: 1.5rem;
      }

      h2 {
        font-size: 1.2rem;
      }

      p {
        margin-top: 0;
      }

      p:last-child {
        margin-bottom: 0;
      }

      img {
        display: block;
        vertical-align: middle;
        max-width: 100%;
        margin: 0 auto;
      }

      input[type='checkbox'] {
        vertical-align: middle;
      }

      pre,
      code {
        font-family: 'Fira Code';
      }

      pre {
        white-space: pre-wrap;
        word-break: break-all;
        word-wrap: break-word;
      }

      code {
        font-size: 14px;
        color: #abb2bf;
        background: #282c34;
      }

      blockquote {
        margin: 0;
        margin-bottom: 1rem;
        padding: 0 1rem;
        border-left: 0.25rem solid #bbb;
      }

      blockquote > p:before {
        content: '“';
        font-size: 2rem;
        line-height: 0.1rem;
        margin-right: 0.5rem;
        vertical-align: -0.5rem;
      }

      blockquote > p:last-of-type:after {
        content: '”';
        font-size: 2rem;
        line-height: 0.1rem;
        margin-right: 0.5rem;
        vertical-align: -0.5rem;
      }

      .text-right {
        text-align: right;
      }

      .card {
        margin-bottom: 1rem;
        padding: 1rem;
        background-color: rgba(40, 44, 52, 0.5);
      }

      .card-1 {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      }

      .card-1:hover {
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
          0 10px 10px rgba(0, 0, 0, 0.22);
      }

      /* override of flexbox grid */
      .container-fluid {
        padding-left: 1rem;
        padding-right: 1rem;
      }

      .row > * {
        height: 100%;
      }

      /* copied from FontAwesome's style to prevent FOUC */
      .svg-inline--fa.fa-w-16 {
        width: 1em;
      }

      .svg-inline--fa.fa-w-14 {
        width: 0.875em;
      }

      .svg-inline--fa {
        display: inline-block;
        font-size: inherit;
        height: 1em;
        overflow: visible;
        vertical-align: -0.125em;
      }

      /* needed to position correctly markers on map */
      .mapboxgl-map {
        position: relative;
      }

      .mapboxgl-marker {
        position: absolute;
      }
    `}</style>

    <style jsx>{`
      .layout {
        max-width: 1024px;
        margin: 0 auto;
        height: 100%;
        display: grid;
        grid-template-rows: auto auto 1fr auto;
      }

      main {
        display: flex;
        flex-flow: column;
        justify-content: center;
      }
    `}</style>
  </div>
)
