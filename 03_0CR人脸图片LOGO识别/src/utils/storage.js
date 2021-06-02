

const set = (key, value, fn) => window[fn].setItem(key, JSON.stringify(value));

const get = (key, fn) => JSON.parse(window[fn].getItem(key));

const del = (key, fn) => key ? window[fn].removeItem(key) : window[fn].clear();

export default {
    cache: {
        set: (key, value) => set(key, value, 'sessionStorage'),
        get: (key, def) => get(key, 'sessionStorage') || def,
        del: (key) => del(key, 'sessionStorage'),
    },
    local: {
        set: (key, value) => set(key, value, 'localStorage'),
        get: (key, def) => get(key, 'localStorage') || def,
        del: (key) => del(key, 'localStorage'),
    }
}

