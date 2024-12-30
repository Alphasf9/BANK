export const shouldResetLoginAttempts = async (user) => {
    const resetLoginAttempts = 24 * 60 * 60 * 1000;
    if (user.lastFailedLogin && new Date() - user.lastFailedLogin > resetLoginAttempts) {
        user.loginAttempts = 0;
        await user.save();
        return true;
    }
    return false;
};