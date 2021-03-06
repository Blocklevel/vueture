/**
 * Local Storage Manager
 *
 * @author
 * Matteo Gabriele <matteo@blocklevel.nl>
 *
 * @description
 * It handles localStorage in case is not supported by the browser
 * or the user is in a private window.
 * If it's not supported will be saved in an object, so still available during the application
 * but won't be saved in memory, so on refresh will be empty again.
 */

/**
 * Used in case the browser doesn't support localStorage
 * @type {Object}
 */
const storage = {}
const localStorage = window.localStorage

/**
 * Check if the browser has localStorage available
 * @return {Boolean}
 */
const hasLocalStorage = () => {
  let available = true

  try {
    localStorage.setItem('0', '')
    localStorage.removeItem('0')
  } catch (e) {
    available = false
  }

  return available
}

/**
 * Stores the key value pair
 * @param {String}  key
 * @param {String}  value
 * @param {Boolean} permanent
 */
export const setItem = (key, value, permanent = true) => {
  if (!hasLocalStorage() || !permanent) {
    storage[key] = value
  }

  localStorage.setItem(key, value)
}

/**
 * Return the stored value
 * @type {String} key
 * @type {Boolean} parse
 * @return {any}
 */
export const getItem = (key, parse = false) => {
  if (!hasLocalStorage()) {
    return storage[key]
  }

  const item = localStorage.getItem(key) || storage[key]

  return (item && parse ? JSON.parse(item) : item)
}

/**
 * Remove the store value
 * @param  {string} key
 */
export const removeItem = (key) => {
  if (!hasLocalStorage) {
    if (!storage[key]) {
      return
    }

    delete storage[key]

    return
  }

  localStorage.removeItem(key)
}
