import { INITIAL_RESOURCES } from '../data/initialResources.js';

const STORAGE_KEY = 'digital_dock_resources_v1';

/**
 * Checks if sessionStorage is available in the current runtime environment.
 * @returns {boolean}
 */
export function isSessionStorageAvailable() {
  try {
    if (typeof window === 'undefined' || !window.sessionStorage) return false;
    const testKey = '__dd_test__';
    window.sessionStorage.setItem(testKey, '1');
    window.sessionStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Loads resources from sessionStorage, falling back to INITIAL_RESOURCES.
 * @returns {Array<object>}
 */
export function loadResources() {
  if (!isSessionStorageAvailable()) {
    return [...INITIAL_RESOURCES];
  }

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // First load: seed with default data
      saveResources(INITIAL_RESOURCES);
      return [...INITIAL_RESOURCES];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return [...INITIAL_RESOURCES];
  } catch (err) {
    console.warn('Digital Dock: Failed to read from sessionStorage, falling back to defaults', err);
    return [...INITIAL_RESOURCES];
  }
}

/**
 * Saves resources to sessionStorage.
 * @param {Array<object>} resources
 * @returns {boolean} Success status
 */
export function saveResources(resources) {
  if (!isSessionStorageAvailable()) return false;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
    return true;
  } catch (err) {
    console.warn('Digital Dock: Failed to save to sessionStorage', err);
    return false;
  }
}

/**
 * Resets resources to initial default state.
 * @returns {Array<object>}
 */
export function resetResourcesToDefault() {
  if (isSessionStorageAvailable()) {
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.warn('Digital Dock: Failed to clear sessionStorage', err);
    }
  }
  return [...INITIAL_RESOURCES];
}
