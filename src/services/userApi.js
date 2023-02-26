const userCanLogin = async (username, password) => {
    await new Promise((r) => setTimeout(r, 1000));
    return { username: username, token: Math.random(), isAdmin: true };
};

const exp = { userCanLogin };

export default exp;
