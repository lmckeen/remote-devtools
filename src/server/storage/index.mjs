const storage = {}

export function get(key) {
  return storage[key]
}

export function set(key, value) {
  storage[key] = value
  return value
}

export function remove(key) {
  delete storage[key]
}

