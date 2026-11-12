(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !Element.prototype.animate || !('IntersectionObserver' in window)) return;
  const running = new Set();
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      const animation = entry.target.animate([
        { opacity: 0, translate: '0 12px' },
        { opacity: 1, translate: '0 0' }
      ], { duration: 650, easing: 'cubic-bezier(.2,.65,.3,1)' });
      running.add(animation);
      animation.finished.then(() => running.delete(animation), () => running.delete(animation));
    }
  }, { threshold: 0, rootMargin: '0px 0px -20px 0px' });
  // Animate content only after it enters view; never hide it behind a CSS gate.
  // The independent translate property preserves existing overlay positioning.
  document.querySelectorAll('.inside-text,.explore-content,.maintenance-item,.marine-text,.animal-card,.jellyfish-copy,.touch-copy,.otter-text,.visit-expectation-text,.visit-info-title,.visit-card,.visit-faq-overlay > h2,.footer-top').forEach(element => observer.observe(element));
  preference.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    running.forEach(animation => animation.cancel());
    running.clear();
  });
})();
