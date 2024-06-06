const express = require('express')
const app = express()
const port = process.env.PORT || 3000 
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require('jsonwebtoken')
require('dotenv').config()
const cors = require('cors') 


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vybo3pc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const menuCollection = client.db("bistroDB").collection("menu");
    const cartCollection = client.db("bistroDB").collection("carts");
    const userCollection = client.db("bistroDB").collection("users");
    //jwt related api's
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token });
    });

    //   verify token
    const verifyToken = (req, res, next) => {
      console.log(req.headers.authorization);
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "Unauthorized access" });
      }
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
          return res.status(401).send({ message: "Unauthorized access" });
        }
        req.decoded = decoded;
        next();
      });
    };
    //verify admin after verified token
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = {
        email: email,
      };
      const user = await userCollection.findOne(query);
      const isAdmin = user?.role === "admin";
      if (!isAdmin) {
        return res.status(403).send({ message: "Forbidden access" });
      }
      next();
    };

    //users related API's

    app.post("/users", async (req, res) => {
      // get the users data from the client side and post it to the server
      const data = req.body;
      const query = {
        email: data.email,
      };
      const checkExistingUserEmail = await userCollection.findOne(query);
      if (checkExistingUserEmail) {
        return res.send({ message: "user already exist", insertedId: null });
      }
      const result = await userCollection.insertOne(data);
      res.send(result);
    });
    // get all the users
    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      // here using req.headers as we set the token as 'headers from the client side in the users component'
      const data = await userCollection.find().toArray();
      res.send(data);
    });
    // delete specific user
    const { ObjectId } = require("mongodb");

    app.delete("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query); // Actually delete the document
      res.send(result); // Send the deletion result
    });

    //make an user admin
    app.patch("/users/admin/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          role: "admin",
        },
      };
      const result = await userCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    // api to check if admin is logged in

    app.get("/users/admin/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      if (!email === req.decoded.email) {
        return res.status(403).send({ message: "Forbidden access" });
      }
      const query = {
        email: email,
      };
      const user = await userCollection.findOne(query);
      let admin = false;
      if (user) {
        admin = user?.role === "admin";
      }
      res.send({ admin });
    });

    //-----menu related APIs
      
      
    //   get all the menu data
    app.get("/menu", async (req, res) => {
      const data = menuCollection.find();
      const result = await data.toArray();
      res.send(result);
    });
      //get specific menu item

      app.get('/menu/:id', async (req, res) => {
          const id = req.params.id
          const query = {
              _id : id
          }
          const result = await menuCollection.findOne(query)
          res.send(result)
      })
      //update specific menu item
      app.patch('/menu/:id', async (req, res) => {
          const item = req.body 
          const id = req.params.id
          console.log(item)
          console.log(id)
          const filter = {
              _id : id
          }
          const updatedDoc = {
              $set: {
                  
                  name: item.name,
                  image: item.image,
                  price: item.price,
                  category: item.category,
                  recipe: item.recipe,
                  
              }
          }
          const result = await menuCollection.updateOne(filter, updatedDoc)
          res.send(result)
      })
      
    //delete specific menu data
      
      app.delete('/menu/:id', verifyToken,verifyAdmin, async (req, res) => {
          const id = req.params.id
          console.log(req.params.id)
          const query = {
              _id: id
          }
          const result = await menuCollection.deleteOne(query)
          res.send(result)
    })
      //post menu data 
      app.post('/menu', verifyToken,verifyAdmin, async (req, res) => {
          const data = req.body 
          const result = await menuCollection.insertOne(data)
          res.send(result)
      })
    //   post data to cart
    app.post("/carts", async (req, res) => {
      const cartItem = req.body;
      console.log(cartItem);
      const result = await cartCollection.insertOne(cartItem);
      res.send(result);
    });
    // get user specific cart data
    app.get("/carts", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await cartCollection.find(query).toArray();
      res.send(result);
    });
    //   delete cart item based on id
    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id),
      };
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Server is running')
})
app.listen(port, () => {
    console.log('Server is running on port', port)
})