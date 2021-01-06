const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./db/model');
const cors = require('cors');
const stripe = require("stripe")(
    "sk_test_51HaaRRFqyVkeMqlKT8j2ZRp8WK8giGal5l6JbEB75TGXSyjclFW6EhI1rEW5J4auCyXjHP2hS1lK8BjllTfUXbpP00YLMjfC8E"
  );

mongoose.connect(`mongodb://localhost/product`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use(
    cors({
    origin: 'http://localhost:3000',
    credentials: true
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (request, response) => response.status(200).send("hello world"));


app.post("/payments/create", async (request, response) => {
    const total = request.query.total;
  
    console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);
  
    var customer = await stripe.customers.create({
      name: 'Jenny Rosen',
      address: {
        line1: '510 Townsend St',
        postal_code: '98140',
        city: 'San Francisco',
        state: 'CA',
        country: 'US',
      }
    });
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // subunits of the currency
      currency: "usd",
      description: "Software Developer",
    });

     // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
    customer: customer
  });
});

app.get('/store',async (req, res) => {
    try{
        const all_data = await Product.find({})
        res.send(all_data);
    } catch {
        res.json({message: "The Data is problametic"});
    }
});

app.post('/store', async (req, res) => {
    // const new_product = new Product({
    //     id: req.body.id,
    //     price: req.body.price,
    //     rating: req.body.rating,
    //     title: req.body.title,
    //     payId: req.body.payId,
    //     image: req.body.image
    // })
    console.log(req.body);
    try{
        const payID = req.body.payId;
        req.body.cart.forEach( async (element) => {
            const new_product = new Product({
                id: element.id,
                price: element.price,
                rating: element.rating,
                title: element.title,
                payId: payID,
                image: element.image
            });
            await new_product.save();
        })
        //console.log(req.body.id);
        //await new_product.save();
        res.json({message: "Successfully Completed"})
    } catch(error) {
        //res.send("Error Creating Contact")
        console.log("Error Creating Contact")
        console.error(error)
    }
})

app.listen(4000);