const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const Handler = require('./handler');
const handler = new Handler();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const router = express.Router();

const HTTP_PORT = 3002;



// API
router.get('/', function (req, res) {
    res.json({
        msg: 'Welcome to our api !'
    });
});

// get accounts
router.get('/accounts', (req, res) => {
    handler.getAccounts().then(accounts => {
        res.json({
            status: 200,
            accounts: accounts
        });
    }).catch(err => {
        res.json({
            status: 404,
            error: err
        })
    });
});

// add candidate
router.post('/addCandidate', (req, res) => {
    let name = req.body.name;
    if (name == undefined) {
        res.json({
            status: 400,
            msg: 'Not invalid field name !s'
        });
    }
    res.json({
        status: 200,
        msg: 'Successed !'
    })
});

// get candidates
router.get('/candidates', (req, res) => {
    handler.getCandidates().then(candidates => {
        res.json({
            status:200,
            candidates: candidates
        });
    }).catch(err => {
        res.json({
            status: 404,
            error: err
        })
    });
});

// vote
router.post('/vote', (req, res) => {
    let form = req.body.from;
    let to = req.body.to;
    if (form == undefined || to == undefined) {
        res.json({
            status: 400,
            msg: 'Not invalid field name !s'
        });
    }

    res.json({
        status: 200,
        msg: 'Successed !'
    })
});

app.use(cors());
app.use('/api', router);
app.listen(HTTP_PORT);
console.log('Listening http on port: http://localhost:' + HTTP_PORT);