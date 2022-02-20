const backend = require('./app.js');
const { powerMod, getRandomInt } = require('./utils');

const { g, n } = backend.generateGN();

const x = 15;

const y = powerMod(g, x, n);

backend.saveY(y);

const z = getRandomInt(100);
const C = powerMod(g, z, n);

console.log(backend.query2(C, z, g, n));
console.log(backend.query1(C, x + z % (n - 1), g, n));
