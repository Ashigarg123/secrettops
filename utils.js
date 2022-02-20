
const getRandomInt = (max) => Math.floor(Math.random() * max);

const powerMod = (a, b, mod) => {
    let res = 1;
    while(b) {
        if((b % 2)) res = res * a % mod;
        a = a * a % mod;
        b >>= 1;
    }
    return res;
}

module.exports = {
    getRandomInt,
    powerMod,
}