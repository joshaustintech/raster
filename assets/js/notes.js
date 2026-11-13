(function () {
  var cards = document.querySelectorAll('.rs-post[data-permalink]');
  if (!cards.length) return;
  var live = document.createElement('div');
  live.className = 'rs-sr';
  live.setAttribute('role', 'status');
  live.setAttribute('aria-live', 'polite');
  document.body.appendChild(live);
  var timer;
  function say(btn, msg) {
    var old = btn.getAttribute('data-label') || btn.textContent;
    btn.setAttribute('data-label', old);
    btn.textContent = msg;
    live.textContent = '';
    setTimeout(function () { live.textContent = msg; }, 20);
    clearTimeout(btn._t);
    btn._t = setTimeout(function () { btn.textContent = old; live.textContent = ''; }, 2000);
  }
  function copy(text, btn, msg) {
    var done = function () { say(btn, msg); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else fallback();
    function fallback() {
      var t = document.createElement('textarea');
      t.value = text; t.setAttribute('readonly', '');
      t.className = 'rs-sr';
      document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); done(); } catch (e) {}
      document.body.removeChild(t);
    }
  }
  function snippets(card) {
    var link = card.getAttribute('data-permalink');
    var name = (card.querySelector('.rs-post__name') || {}).textContent || '';
    var text = (card.querySelector('.rs-post__text') || {}).textContent || '';
    var date = card.querySelector('time');
    var esc = function (s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };
    return {
      iframe: '<iframe src="' + card.getAttribute('data-embed') + '" title="Note by ' + esc(name) + '" width="100%" height="240" loading="lazy" style="border:0;max-width:560px"></iframe>',
      quote: '<blockquote class="rs-embed" cite="' + link + '"><p>' + esc(text.trim()) + '</p>' + esc(name) + ' <a href="' + link + '">' + esc(date ? date.textContent : link) + '</a></blockquote>'
    };
  }
  Array.prototype.forEach.call(cards, function (card) {
    var link = card.getAttribute('data-permalink');
    var share = card.querySelector('[data-action=share]');
    var embed = card.querySelector('[data-action=embed]');
    var copyBtn = card.querySelector('.rs-post__actions [data-action=copy]');
    var panel = embed && document.getElementById(embed.getAttribute('aria-controls'));
    var s = snippets(card);
    [share, embed, copyBtn].forEach(function (b) { if (b) b.hidden = false; });
    if (share) share.addEventListener('click', function () {
      var title = (card.querySelector('.rs-post__name') || {}).textContent || document.title;
      var text = ((card.querySelector('.rs-post__text') || {}).textContent || '').trim();
      if (navigator.share) {
        navigator.share({ title: title, text: text, url: link }).catch(function () {});
      } else copy(link, share, 'Link copied');
    });
    if (copyBtn) copyBtn.addEventListener('click', function () { copy(link, copyBtn, 'Link copied'); });
    if (!panel) return;
    var code = panel.querySelector('code');
    if (code) code.textContent = s.iframe;
    var pre2 = document.createElement('pre');
    pre2.innerHTML = '<code></code>';
    pre2.firstChild.textContent = s.quote;
    var lbl = document.createElement('p');
    lbl.className = 'rs-eyebrow';
    lbl.textContent = 'Plain alternative';
    var actions = panel.querySelector('.rs-actions');
    panel.insertBefore(lbl, actions);
    panel.insertBefore(pre2, actions);
    var cc = panel.querySelector('[data-action=copy-code]');
    if (cc) cc.addEventListener('click', function () { copy(s.iframe, cc, 'Code copied'); });
    var q = document.createElement('button');
    q.type = 'button'; q.className = 'rs-btn rs-btn--secondary'; q.textContent = 'Copy plain';
    q.addEventListener('click', function () { copy(s.quote, q, 'Code copied'); });
    actions.appendChild(q);
    var pc = panel.querySelector('.rs-actions [data-action=copy]');
    if (pc) pc.addEventListener('click', function () { copy(link, pc, 'Link copied'); });
    function toggle(open) {
      embed.setAttribute('aria-expanded', open ? 'true' : 'false');
      panel.hidden = !open;
    }
    embed.addEventListener('click', function () { toggle(embed.getAttribute('aria-expanded') !== 'true'); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.hidden) { toggle(false); embed.focus(); }
    });
  });
})();
