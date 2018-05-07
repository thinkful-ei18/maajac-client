export const loadAuthToken = () => {
    return localStorage.getItem('authToken');
};

export const saveAuthToken = authToken => {
    try {
        localStorage.setItem('authToken', authToken);
    } catch (e) {}
};

export const clearAuthToken = () => {
    try {
        localStorage.removeItem('authToken');
    } catch (e) {}
};

/* ========== USER CREDENTIALS ========== */
export const saveUserCredentials = user => {
    try {
        localStorage.setItem('user', JSON.stringify(user));
    } catch (e) {}
}

export const clearUserCredentials = () => {
    try {
        localStorage.removeItem('user');
    } catch (e) {}
};