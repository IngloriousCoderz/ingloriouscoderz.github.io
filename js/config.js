$(function() {
  CMS.init({
    // Name of your site or location of logo file, relative to root directory (img/logo.png)
    siteName: 'Inglorious Coderz',

    // Tagline for your site
    siteTagline: 'Salvare il mondo una riga di codice alla volta.',

    // Email address
    siteEmail: 'info@ingloriouscoderz.it',

    // Name
    siteAuthor: 'IceOnFire',

    // Navigation items
    siteNavItems: [{
      name: 'Chi',
      href: '#page/Chi siamo'
    }, {
      name: 'Come',
      href: '#page/Come siamo'
    }, {
      name: 'Cosa',
      href: '#page/Cosa facciamo'
    }, {
      name: 'Perché',
      href: '#page/Perché lo facciamo'
    }, {
      name: 'Gli IC',
      href: '#page/Gli Inglorious Coderz'
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
    footerText: '<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank"><img alt="Licenza Creative Commons" style="border-width:0;border-radius:0;display:inline-block;vertical-align:middle;margin:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/80x15.png" /></a> Il sito degli <a href="https://github.com/IngloriousCoderz" target="_blank">Inglorious Coderz</a> è distribuito con Licenza <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank">Creative Commons Attribuzione - Non commerciale - Non opere derivate 4.0 Internazionale</a>.',

    // Mode 'Github' for Github Pages, 'Server' for Self Hosted. Defaults
    // to Github
    mode: 'Server',//'Github',

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
