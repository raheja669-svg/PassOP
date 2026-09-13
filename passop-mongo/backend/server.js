const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);
const dbName = 'passop';

app.use(express.json());

async function startServer() {
    try {
        await client.connect();

        console.log('Connected to MongoDB');

        const db = client.db(dbName);

        app.get('/', async (req, res) => {
            const collection = db.collection('documents');

            const findResult = await collection.find({}).toArray();

            res.json(findResult);
        });
        app.post('/', async (req, res) => {
            const password = req.body;
            const collection = db.collection('documents');
            const findResult = await collection.insertOne(password);
            res.send({ success: true, result: findResult });
        });

        app.delete('/', async (req, res) => {
            const password = req.body;
            const collection = db.collection('documents');
            const findResult = await collection.deleteOne(password);
            res.send({ success: true, result: findResult });
        });


        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error(error);
    }
}

startServer();