import ReactGA from 'react-ga'

export const isElementInView = (element, fullyInView = false) => {
  const isjQueryObjExists = (obj) => (
    $(obj).length !== 0
  )

  const pageTop = isjQueryObjExists(window) ? $(window).scrollTop() : 0
  const pageBottom = pageTop + (isjQueryObjExists(window) ? $(window).height() : 0)
  const elementTop = isjQueryObjExists(element) ? $(element).offset().top : 0
  const elementBottom = elementTop + (isjQueryObjExists(element) ? $(element).height() : 0);

  if (fullyInView === true) {
    return ((pageTop < elementTop) && (pageBottom > elementBottom));
  } else {
    return ((elementTop < pageBottom) && (elementBottom > pageTop));
  }
}

export const easeInOutQuad = (t, b, c, d) => {
  t /= d / 2
  if (t < 1) return c / 2 * t * t + b
  t--
  return -c / 2 * (t * (t - 2) - 1) + b
}

export const initGA = () => {
  console.log('GA init')
  ReactGA.initialize('UA-106544318-1')
}

export const logPageView = () => {
  console.log(`Logging pageview for ${window.location.pathname}`)
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action })
  }
}

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal })
  }
}
