function loadSavedList(key) {
    try {
        const saved = JSON.parse(localStorage.getItem(key));
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

function saveList(key, items) {
    try {
        if (items.length) {
            localStorage.setItem(key, JSON.stringify(items));
        } else {
            localStorage.removeItem(key);
        }

        return true;
    } catch {
        return false;
    }
}
