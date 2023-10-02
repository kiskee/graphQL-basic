const pwd = "add_your_password";
const express = require("express");
const graphglHTTP = require("express-graphql");
const mongoose = require("mongoose");

const schema = require("./server/schema/schema");
const testSchema = require("./server/schema/types_schema");

const cors = require("cors");
const port = process.env.PORT || 4000;

const app = express();


mongoose
  .connect(
    `mongodb+srv://${process.env.databaseUser}:${process.env.databasePass}@cluster0.wok38ui.mongodb.net/${process.env.databaseName}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    app.listen(port, () => {
      //localhost:4000
      console.log('connected');
    });
  })
  .catch((e) => {
    console.log(process.env.databaseUser);
    return console.log("error" + e);
  });

app.use(cors());

app.use(
  "/graphql",
  graphglHTTP({
    graphiql: true,
    schema: schema,
  })
);
