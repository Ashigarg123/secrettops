
const { getRandomInt, powerMod } = require('./utils');

class Backend {
    generateGN() {
        return {
            g: 51,
            n: 53,
        };
    }
    saveY(y) {
        this.y = y;
    }
    query1(C, w, g, n) {
        return (C * this.y % n === powerMod(g, w, n));
    }

    query2(C, w, g, n) {
        return (C === powerMod(g, w, n));
    }
}



const backend = new Backend();
module.exports = backend;