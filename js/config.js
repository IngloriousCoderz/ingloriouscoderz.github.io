$(function() {
  CMS.init({
    // Name of your site or location of logo file, relative to root directory (img/logo.png)
    siteName: 'Inglorious Coderz',

    // Tagline for your site
    siteTagline: 'Salvare il mondo una riga di codice alla volta.',

    // Email address
    siteEmail: 'info@ingloriouscoderz.com',

    // Name
    siteAuthor: 'IceOnFire',

    // Navigation items
    siteNavItems: [{
      name: 'Chi siamo'
    }, {
      name: 'Perché lo facciamo'
    }, {
      name: 'Contattaci'
    }, {
      name: 'Il sito fa schifo'
    }, {
      name: 'Github',
      href: 'https://github.com/IngloriousCoderz',
      newWindow: true
    }],

    // Posts folder name
    postsFolder: 'posts',

    // Homepage posts snippet length
    postSnippetLength: 120,

    // Pages folder name
    pagesFolder: 'pages',

    // Order of sorting (true for newest to oldest)
    sortDateOrder: true,

    // Posts on Frontpage (blog style)
    postsOnFrontpage: true,

    // Page as Frontpage (static)
    pageAsFrontpage: '',

    // Posts/Blog on different URL
    postsOnUrl: '',

    // Site fade speed
    fadeSpeed: 300,

    // Site footer text
    footerText: 'Since 2016 with <3 by Inglorious Coderz',

    // Mode 'Github' for Github Pages, 'Server' for Self Hosted. Defaults
    // to Github
    mode: 'Github',

    // If Github mode is set, your Github username and repo name.
    githubUserSettings: {
      username: 'IngloriousCoderz',
      repo: 'ingloriouscoderz.github.io'
    },

    // If Github mode is set, choose which Github branch to get files from.
    // Defaults to Github pages branch (gh-pages)
    githubSettings: {
      branch: 'master',
      host: 'https://api.github.com'
    }
  });

  // Markdown settings
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    }
  });
});
