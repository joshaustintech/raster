/* Progressive enhancement for form[data-rs-form]. Without JS the browser's native
   validation (required, type=email) still runs. With JS we take over the messages:
   aria-invalid + "Error: ..." in .rs-error linked by aria-describedby. First-party only. */
(function () {
  "use strict";
  var forms = document.querySelectorAll("form[data-rs-form]");
  Array.prototype.forEach.call(forms, function (form) {
    form.setAttribute("novalidate", "");
    var fields = form.querySelectorAll("input, textarea, select");

    function message(el) {
      var v = el.validity;
      var label = form.querySelector('label[for="' + el.id + '"]');
      var name = label ? label.firstChild.textContent.trim() : el.name;
      if (v.valueMissing) return "Error: " + name + " is required.";
      if (v.typeMismatch) return "Error: enter a valid " + name.toLowerCase() + " address.";
      return "Error: " + (el.validationMessage || name + " is not valid.");
    }

    function clear(el) {
      el.removeAttribute("aria-invalid");
      var err = document.getElementById(el.id + "-error");
      if (err) err.remove();
      var ids = (el.getAttribute("aria-describedby") || "").split(" ").filter(function (i) { return i && i !== el.id + "-error"; });
      if (ids.length) el.setAttribute("aria-describedby", ids.join(" ")); else el.removeAttribute("aria-describedby");
    }

    function show(el) {
      clear(el);
      if (el.validity.valid) return false;
      var err = document.createElement("p");
      err.className = "rs-error";
      err.id = el.id + "-error";
      err.textContent = message(el);
      el.parentNode.appendChild(err);
      el.setAttribute("aria-invalid", "true");
      var ids = (el.getAttribute("aria-describedby") || "").split(" ").filter(Boolean);
      ids.push(err.id);
      el.setAttribute("aria-describedby", ids.join(" "));
      return true;
    }

    form.addEventListener("submit", function (e) {
      var first = null;
      Array.prototype.forEach.call(fields, function (el) {
        if (el.id && show(el) && !first) first = el;
      });
      if (first) { e.preventDefault(); first.focus(); }
    });
    form.addEventListener("input", function (e) {
      if (e.target.getAttribute("aria-invalid") === "true") show(e.target);
    });
    form.addEventListener("blur", function (e) {
      if (e.target.id && e.target.value) show(e.target);
    }, true);
  });
})();
