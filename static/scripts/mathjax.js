window.MathJax = {
  loader: { load: ['[tex]/physics'] },
  tex: { packages: { '[+]': ['physics'] } },
}
;(function () {
  var script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml-full.js'
  script.async = true
  document.head.appendChild(script)
})()
