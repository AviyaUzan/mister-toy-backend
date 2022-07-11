const express = require('express')
const cors = require('cors') 

const toyService = require('./service/toy.service');

const app = express();

app.use(express.json());
app.use(cors());

// LIST
app.get('/api/toy', (req, res) => {
    // const { title, pageIdx = 0 } = req.query;
    // query will get filterBy inside
    // const filterBy = {
    //     title,
    //     pageIdx,
    // };
    toyService
        .query()
        .then((toys) => res.send(toys))
        .catch((err) => res.status(500).send('Cannot get toys'))
});

//CREATE
app.post('/api/toy', (req, res) => {
    const toy = {
        name: req.body.name,
        price: req.body.price,
        createdAt: req.body.createdAt,
        inStock: req.body.inStock,
    }
    toyService
        .save(toy)
        .then((savedToy) => res.send(savedToy))
        .catch((err) => res.status(500).send('Cannot save toy'));
});

// UPDATE
app.put('/api/toy/:toyId', (req, res) => {
    const toy = {
        _id: req.body._id,
        name: req.body.name,
        price: req.body.price,
        createdAt: req.body.createdAt,
        inStock: req.body.inStock,
    }
    toyService
        .save(toy)
        .then((savedToy) => res.send(savedToy))
        .catch((err) => res.status(500).send('Cannot save toy'));
});

//READ
app.get('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params

    toyService.getById(toyId)
        .then((toy) => {
            res.send(toy);
        })
        .catch((err) => res.status(500).send('Cannot get toy'))
});

app.delete('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params;

    toyService.remove(toyId)
        .then(() => res.send('Removed!'))
        .catch((err) => res.status(401).send('Cannot remove toy'))
});

app.listen(3030, () => console.log('Server ready at port 3030!'));
