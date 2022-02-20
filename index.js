const express = require('express');
const database = require('./database');
const {powerMod} = require("./utils");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/saveUser', async (req, res) => {
    const g = 51;
    const n = 53;
    const username = req.body.username;
    console.log(username);
    await database.saveUser(username, g, n);
    res.send({g, n});
});

app.post('/saveUserSecret', async (req, res) => {
    const  { username, y } = req.body;
    await database.updateY(username, y);
    res.send("Registration Successful");

});

app.post('/loginRequest', async (req, res) => {
    const user = await database.getUser(req.body.username);
    const {g, n} = user;
    res.send({g, n});
});

app.post('/loginRequest2', async (req, res) => {
   const { username, C } = req.body;
   let requestArray = "";
   for(let i = 0; i < C.length; i++) {
       if(Math.random() < 0.5) requestArray += "0";
       else requestArray += "1";
   }
   await database.updateCandRequestArray(username, C, requestArray);
   res.send({
       requestArray,
   });
});

app.post("/verifyLogin", async (req, res) => {
    try {
        const user = await database.getUser(req.body.username);
        // const { username, g, n, y, c, requestarray } = await database.getUser(req.body.username);
        const { w, username } = req.body;
        const g = parseInt(user.g);
        const n = parseInt(user.n);
        const requestarray = user.requestarray;
        const y = JSON.parse(user.y);
        const c = JSON.parse(user.c);

        for(let i = 0; i < requestarray.length; i += 1) {
            const v2 = powerMod(g, w[i], n);
            if(requestarray[i] === '0') {
                const v1 = y[i] * c[i] % n;
                if(v1 !== v2)  return res.send("Failed0").status(400);
            }
            else {
                if(c[i] !== v2) return res.send("Failed1").status(400);
            }
        }
        res.send("Successful").status(201);
    } catch (e) {
        console.log(e);
        res.send("Internal server error");
    }

});

app.listen(3000, () => console.log("Listening on port 3000"));