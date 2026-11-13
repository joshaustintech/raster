(function () {
  var m = /[?&]theme=(light|dark)\b/.exec(location.search);
  if (m) document.documentElement.setAttribute('data-theme', m[1]);
  if (window.parent === window) return;
  var last = 0;
  function post() {
    var h = Math.ceil(document.documentElement.getBoundingClientRect().height);
    if (h === last) return;
    last = h;
    parent.postMessage({ type: 'rs:embed-height', height: h }, '*');
  }
  if (window.ResizeObserver) new ResizeObserver(post).observe(document.body);
  window.addEventListener('load', post);
  post();
})();
