const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wods307.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri)

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const craftCollection = client.db('craftDB').collection('craft');
        const LandcraftCollection = client.db('craftDB').collection('LandScap');
        const portaitCraftCollection = client.db('craftDB').collection('Portait');
        const WaterPaintingCraftCollection = client.db('craftDB').collection('WaterPainting');
        const OilPaintingCraftCollection = client.db('craftDB').collection('OilPainting');
        const CharcoalSketchingCraftCollection = client.db('craftDB').collection('CharcoalSketching');
        const cartoonDrawingCraftCollection = client.db('craftDB').collection('cartoonDrawing');

      
        async function getUsersFromAPI() {
            try {
                const response = await fetch('https://assignment-10-server-side-sage.vercel.app/craft');
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Error fetching users from API:', error);
                return [];
            }
        }


        app.get('/users', async (req, res) => {
            try {
                const users = await getUsersFromAPI();

                if (req.query.email) {
                    const filteredUsers = users.filter(user => user.email === req.query.email);
                    if (filteredUsers.length > 0) {
                        res.json(filteredUsers);
                    } else {
                        res.status(404).json({ error: 'User not found' });
                    }
                } else {
                    res.json(users);
                }
            } catch (error) {
                console.error('Error processing request:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });


        // ***Main*********

        app.get('/craft', async (req, res) => {
            const cursor = craftCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get('/craft/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await craftCollection.findOne(query);
            res.send(result);
        })

        // ***Main End*********


        app.get('/LandScap', async (req, res) => {
            const cursor = LandcraftCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get('/Portait', async (req, res) => {
            const cursor = portaitCraftCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get('/WaterPainting', async (req, res) => {
            const cursor = WaterPaintingCraftCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get('/OilPainting', async (req, res) => {
            const cursor = OilPaintingCraftCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get('/CharcoalSketching', async (req, res) => {
            const cursor = CharcoalSketchingCraftCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get('/cartoonDrawing', async (req, res) => {
            const cursor = cartoonDrawingCraftCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/LandScap/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await LandcraftCollection.findOne(query);
            res.send(result);
        })
        app.get('/Portait/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await portaitCraftCollection.findOne(query);
            res.send(result);
        })
        app.get('/WaterPainting/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await WaterPaintingCraftCollection.findOne(query);
            res.send(result);
        })
        app.get('/OilPainting/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await OilPaintingCraftCollection.findOne(query);
            res.send(result);
        })
        app.get('/CharcoalSketching/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await CharcoalSketchingCraftCollection.findOne(query);
            res.send(result);
        })
        app.get('/cartoonDrawing/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await cartoonDrawingCraftCollection.findOne(query);
            res.send(result);
        })

        app.post('/craft', async (req, res) => {
            const newCraft = req.body;
            console.log(newCraft);
            const result = await craftCollection.insertOne(newCraft);
            res.send(result)
        })



        app.put('/craft/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const updateCraft = req.body;
            const craft = {
                $set: {
                    item: updateCraft.item,
                    category: updateCraft.category,
                    price: updateCraft.price,
                    rating: updateCraft.rating,
                    description: updateCraft.description,
                    time: updateCraft.time,
                    status: updateCraft.status,
                    customize: updateCraft.customize,
                    image: updateCraft.image,
                }
            }
            const result = await craftCollection.updateOne(filter, craft, options);
            res.send(result)
        })



        app.delete('/craft/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await craftCollection.deleteOne(query);
            res.send(result);
        })





        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('assignment server is running')
})
app.listen(port, () => {
    console.log(`the server is running on port : ${port}`)
})