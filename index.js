const expres = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = expres();

// crowdcube
// ALTLTpEaBEW7MZUx

// middleware
app.use(cors({
    origin: 'https://a10-crowdcube-client.vercel.app/',
    credentials: true,
}));
app.use(expres.json());



const uri = "mongodb+srv://crowdcube:ALTLTpEaBEW7MZUx@cluster1.ladfrnr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

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
        await client.connect();
        const campaignCollection = client.db('campaignDB').collection('campaign');

        app.post('/campaign', async (req, res) => {
            const data = req.body;
            console.log(data);
            const result = await campaignCollection.insertOne(data);
            res.send(result);
        })

        app.get('/campaign', async (req, res) => {
            const cursor = await campaignCollection.find().toArray();
            res.send(cursor);
        })
        app.get('/campaign/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await campaignCollection.findOne(query);
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('product server is running');
})
app.listen(port, () => {
    console.log(`server is running on ${port}`)
})