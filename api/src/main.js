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
            msg: err
        })
    });
});

// add candidate
router.post('/addCandidate', (req, res) => {
    let name = req.body.name;
    let account = req.body.account;

    if (name == undefined || account == undefined) {
        res.json({
            status: 400,
            msg: 'Not invalid field name !s'
        });
    }
    handler.addCandidate(name, account).then(data => {
        res.json({
            status: 200,
            msg: 'Successed !'
        })
    }).catch(err => {
        res.json({
            status: 401,
            msg: err
        })
    });
});

// get candidates
router.get('/candidates', (req, res) => {
    handler.getCandidates().then(candidates => {
        res.json({
            status: 200,
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
    let account = req.body.account;
    let id = req.body.id;
    if (id == undefined || account == undefined) {
        res.json({
            status: 400,
            msg: 'Not invalid field name !s'
        });
    }

    handler.vote(id, account).then(status => {
        res.json({
            status: 200,
            msg: 'Successed !'
        })
    }).catch(err => {
        res.json({
            status: 401,
            msg: err
        })
    });
});

app.use(cors());
app.use('/api', router);
app.listen(HTTP_PORT);
console.log('Listening http on port: http://localhost:' + HTTP_PORT);