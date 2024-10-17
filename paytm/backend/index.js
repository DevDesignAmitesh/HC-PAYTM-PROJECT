const express = require("express");
const app = express();
const { router } =require("./routes/index")
const cors = require("cors")
const bodyParser = require("body-parser")

const port = 3000;

app.use(cors())
app.use(bodyParser.json())

app.use("/api/v1", router)

app.listen(port, function(){
  console.log(`server is running on ${port} port`)
})