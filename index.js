const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9yewv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();

        const database = client.db('bookHotel');
        const servicesCollection = database.collection('services');
        const offersCollection = database.collection('offers');

        //GET All DATA FOR SERVICES
        app.get('/services', async(req, res)=>{
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        })

        //GET SINGLE SERVICE
        app.get('/services/:id', async(req, res)=>{
            const id = req.params.id;
            console.log('service', id);
            const query = {_id: ObjectId(id)};
            const service = await servicesCollection.findOne(query);
            res.json(service);
        })

        //POST API FOR SERVICES
        app.post('/services', async(req, res)=>{
            const service = req.body;

            const result = await servicesCollection.insertOne(service);
            res.json(result);
        });

        //DELETE SERVICE
        app.delete('/services/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await servicesCollection.deleteOne(query);
            res.json(result);
        })

        //GET All DATA FOR OFFERS
        app.get('/offers', async(req, res)=>{
            const cursor = offersCollection.find({});
            const offers = await cursor.toArray();
            res.send(offers);
        })

        //POST API FOR OFFERS
        app.post('/offers', async(req, res)=>{
            const offer = req.body;

            const result = await offersCollection.insertOne(offer);
            res.json(result);
        });
    }
    finally{
        // await client.close();
    }
}

run().catch(console.dir);



app.get('/', (req, res)=>{
    res.send('Welcome to Hotel Booking Server');
});

app.listen(port, ()=>{
    console.log('Running on the port', port);
});