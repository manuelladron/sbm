/**
 * SBM Project Page — page interactions.
 * Vanilla JS; no jQuery or Bulma. Progressive enhancement only:
 * the page is fully readable with scripts disabled.
 */

document.addEventListener('DOMContentLoaded', function () {
  initDropdown()
  initGallery()
  initBibtexCopy()
  initReveal()
  initMetrics()
})

/**
 * Nav dropdown: CSS handles hover/focus; this adds tap support
 * for touch devices where hover doesn't exist.
 */
function initDropdown() {
  const dropdown = document.querySelector('.nav-dropdown')
  const trigger = document.querySelector('.nav-dropdown-trigger')
  if (!dropdown || !trigger) return

  trigger.addEventListener('click', function () {
    const open = dropdown.classList.toggle('is-open')
    trigger.setAttribute('aria-expanded', String(open))
  })

  document.addEventListener('click', function (event) {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove('is-open')
      trigger.setAttribute('aria-expanded', 'false')
    }
  })
}

/**
 * Gallery: scroll-snap track with prev/next buttons and position dots.
 */
function initGallery() {
  const track = document.querySelector('.gallery-track')
  if (!track) return

  const items = Array.prototype.slice.call(
    track.querySelectorAll('.gallery-item')
  )
  const dotsHost = document.querySelector('.gallery-dots')

  const dots = items.map(function (_, index) {
    const dot = document.createElement('button')
    dot.type = 'button'
    dot.className = 'gallery-dot'
    dot.setAttribute('aria-label', 'Go to image ' + (index + 1))
    dot.addEventListener('click', function () {
      items[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      })
    })
    dotsHost.appendChild(dot)
    return dot
  })

  function currentIndex() {
    const center = track.scrollLeft + track.clientWidth / 2
    let best = 0
    let bestDistance = Infinity
    items.forEach(function (item, index) {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2
      const distance = Math.abs(itemCenter - center)
      if (distance < bestDistance) {
        bestDistance = distance
        best = index
      }
    })
    return best
  }

  function syncDots() {
    const active = currentIndex()
    dots.forEach(function (dot, index) {
      dot.classList.toggle('is-active', index === active)
    })
  }

  track.addEventListener('scroll', function () {
    window.requestAnimationFrame(syncDots)
  })
  syncDots()

  document.querySelectorAll('.gallery-btn').forEach(function (button) {
    button.addEventListener('click', function () {
      const direction = Number(button.dataset.dir)
      const next =
        (currentIndex() + direction + items.length) % items.length
      items[next].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      })
    })
  })
}

/**
 * BibTeX copy-to-clipboard.
 */
function initBibtexCopy() {
  const button = document.querySelector('.bibtex-copy')
  const code = document.querySelector('#BibTeX pre code')
  if (!button || !code) return

  button.addEventListener('click', function () {
    navigator.clipboard
      .writeText(code.textContent)
      .then(function () {
        button.classList.add('is-copied')
        setTimeout(function () {
          button.classList.remove('is-copied')
        }, 1600)
      })
      .catch(function (error) {
        console.error('Failed to copy BibTeX:', error)
      })
  })
}

/**
 * Metric value animations, mirroring web-ds BrandMetric: numeric values
 * count up on first view; word values reveal letter by letter. The final
 * frame always restores the exact original text.
 */
function initMetrics() {
  const values = document.querySelectorAll('.stat-value')
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches
  if (
    values.length === 0 ||
    reducedMotion ||
    !('IntersectionObserver' in window)
  ) {
    return
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return
        observer.unobserve(entry.target)
        animateMetric(entry.target)
      })
    },
    { rootMargin: '-100px 0px' }
  )

  values.forEach(function (value) {
    observer.observe(value)
  })
}

function animateMetric(element) {
  const text = element.textContent
  if (/\d/.test(text)) {
    animateCount(element, text)
  } else {
    animateLetters(element)
  }
}

/** Count from 0 to the value over ~2s with ease-out, keeping any
    prefix/suffix (e.g. "%") and the original decimal precision. */
function animateCount(element, original) {
  const match = original.match(/^([^\d]*)([\d,.]*\d)([^\d]*)$/)
  if (!match) return
  const prefix = match[1]
  const clean = match[2].replace(/,/g, '')
  const suffix = match[3]
  const target = parseFloat(clean)
  const decimals = clean.includes('.') ? clean.split('.')[1].length : 0
  const duration = 2000
  const start = performance.now()

  function frame(now) {
    const t = Math.min(1, (now - start) / duration)
    const eased = 1 - Math.pow(1 - t, 4)
    const current = (target * eased).toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    })
    element.textContent = prefix + current + suffix
    if (t < 1) {
      window.requestAnimationFrame(frame)
    } else {
      element.textContent = original
    }
  }
  window.requestAnimationFrame(frame)
}

/** Fast staggered letter reveal — everything visible within ~0.5s.
    Wraps characters in place, text node by text node, so nested
    markup (e.g. the underlined span in phrase metrics) survives;
    the original markup is restored when the reveal finishes. */
function animateLetters(element) {
  const originalHTML = element.innerHTML
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT)
  const textNodes = []
  while (walker.nextNode()) textNodes.push(walker.currentNode)

  const totalChars = element.textContent.length
  const stagger = Math.min(40, 500 / Math.max(1, totalChars))
  let charIndex = 0

  textNodes.forEach(function (node) {
    const fragment = document.createDocumentFragment()
    node.textContent.split('').forEach(function (char) {
      const span = document.createElement('span')
      span.textContent = char
      span.style.opacity = '0'
      span.style.transition =
        'opacity 100ms ease-out ' + charIndex * stagger + 'ms'
      fragment.appendChild(span)
      charIndex += 1
    })
    node.parentNode.replaceChild(fragment, node)
  })

  window.requestAnimationFrame(function () {
    element.querySelectorAll('span').forEach(function (span) {
      if (span.style.transition) span.style.opacity = '1'
    })
  })
  setTimeout(function () {
    element.innerHTML = originalHTML
  }, totalChars * stagger + 400)
}

/**
 * Scroll reveal via IntersectionObserver. Falls back to showing
 * everything immediately when the observer is unavailable.
 */
function initReveal() {
  const revealables = document.querySelectorAll('.reveal')
  if (!('IntersectionObserver' in window)) {
    revealables.forEach(function (element) {
      element.classList.add('is-visible')
    })
    return
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
  )

  revealables.forEach(function (element) {
    observer.observe(element)
  })
}
