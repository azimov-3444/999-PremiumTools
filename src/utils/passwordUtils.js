// Simple hash function for passwords (better than plain text)
export const hashPassword = (password) => {
    let hash = 0;
    const str = password + 'SALT_999_PREMIUM_TOOLS'; // Add salt for security

    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }

    return btoa(hash.toString()); // Base64 encode
};

export const verifyPassword = (password, hashedPassword) => {
    return hashPassword(password) === hashedPassword;
};
