(function () {
  var root = document.documentElement, KEY = "rs-theme", modes = ["auto", "light", "dark"];
  function get() { try { var v = localStorage.getItem(KEY); return modes.indexOf(v) > 0 ? v : "auto"; } catch (e) { return "auto"; } }
  function apply(m) { if (m === "auto") root.removeAttribute("data-theme"); else root.setAttribute("data-theme", m); }
  function save(m) { try { if (m === "auto") localStorage.removeItem(KEY); else localStorage.setItem(KEY, m); } catch (e) {} }
  apply(get());
  document.addEventListener("DOMContentLoaded", function () {
    var b = document.querySelector("[data-theme-toggle]");
    if (!b) return;
    function render(m) {
      var l = b.getAttribute("data-label-" + m) || m;
      b.textContent = (b.getAttribute("data-label") || "Theme") + ": " + l;
      b.setAttribute("aria-pressed", m === "auto" ? "false" : "true");
    }
    render(get());
    b.hidden = false;
    b.addEventListener("click", function () {
      var m = modes[(modes.indexOf(get()) + 1) % modes.length];
      save(m); apply(m); render(m);
    });
  });
})();
