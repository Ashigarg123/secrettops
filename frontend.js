var request = require('request');
const CryptoJS = require('crypto-js');
const {powerMod, getRandomInt} = require("./utils");

const promisifiedRequest = function(options) {
    return new Promise((resolve,reject) => {
        request(options, (error, response, body) => {
            if (response) {
                return resolve(response);
            }
            if (error) {
                return reject(error);
            }
        });
    });
};



async function makeRequest(url, body) {
    const options = {
        'method': 'POST',
        'url': `http://9bcb-223-233-77-6.ngrok.io/${url}`,
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)

    };
    const res = await promisifiedRequest(options);
    try {
        return JSON.parse(res.body);
    } catch (e) {
        return res.body;
    }
}

async function register(username) {
    var options = {
        'method': 'POST',
        'url': 'http://9bcb-223-233-77-6.ngrok.io/saveUser',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
        })

    };
    const res = await promisifiedRequest(options);
    return JSON.parse(res.body);
}


//
function hashPassword(password, modulo) {
    const hashString = (CryptoJS.MD5(password).toString());
    return parseInt(hashString, 16) % modulo;
}
function convertPasswordToSets(password, n) {
    let passwordSets = [];
    for(let i = 0, len = 1; i < password.length; i += 1, len += 1) {
        let curPassword = '';
        for(let j = i; j < password.length; j += len) {
            curPassword += password[j];
        }
        passwordSets.push(curPassword);
    }
    passwordSets = passwordSets.map((p) =>
        (hashPassword(p, n))
    );
    // return [1, 2, 3, 4];
    return passwordSets;
}

async function fullRegisterFlow() {
    const { g, n } = (await register('addy23'));
    // const {g, n} = {g: 51, n: 53};
    const x = convertPasswordToSets(password, n);
    const y = x.map((v) => powerMod(g, v, n));
    const res = await makeRequest('saveUserSecret', {username, y});
}
async function login (username, password) {
   

    // await fullRegisterFlow();
    const {g, n} = await makeRequest('loginRequest', {username});
    const x = convertPasswordToSets(password, n);
    const C = [];
    const Z = [];
    for(let i = 0; i < x.length; i++) {
        const z = getRandomInt(100);
        Z.push(z);
        C.push(powerMod(g, z, n));
    }
    const { requestArray } = await makeRequest('loginRequest2', {username, C});
    const w = [];
    for(let i = 0; i < requestArray.length; i += 1) {
        if(requestArray[i] === '0') {
            w.push((x[i] + Z[i]) % (n - 1));
        }
        else {
            w.push(Z[i]);
        }
    }
    const verdict = await makeRequest('verifyLogin', {username, w});
    console.log(verdict);
}

login();


//
