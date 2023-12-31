require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/routers");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(morgan("combined"));
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extends: true }));

const graphqlschema = require("./graphql/schema");
const graphqlresolvers = require("./graphql/resolvers");
const { graphqlHTTP } = require("express-graphql");

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlschema,
    rootValue: graphqlresolvers,
    graphiql: true,
  }),
);

const multer = require("multer");
app.use(multer({ destination: "images/" }).single("image"));

const url =
  "mongodb+srv://satishchoudhary:7IikRK2oKcp91t5O@cluster0.6p4gzcx.mongodb.net/userdb?retryWrites=true&w=majority";
const mongoose = require("mongoose");
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// const product = require("./models/product/product");
// const products = mongoose.model('product', product.product);
// products.find()
//   .then((numproducts) => {
//     console.log(numproducts);
//   }
// )

app.use("/", router.router);

const server = app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:8000`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("Client connected", socket.id);
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(data);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("disconnect", (socket) => {
    console.log("Client disconnect");
  });
});
