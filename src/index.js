const express = require("express");
const mongoose = require("mongoose");
const app = express();


app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// rotas
const alunoRouters = require('../routes/alunoRoutes')

app.use("/aluno", alunoRouters)

app.get("/", (req, res) => {
  res.json({ message: "Oi, teste" });
});

// mongodb+srv://laryssaDias:<jy0xOuu2eBSIo4oF>@cluster0.snxqqme.mongodb.net/bancodaapi?retryWrites=true&w=majority

mongoose
  .connect(
    "mongodb+srv://laryssaDias:jy0xOuu2eBSIo4oF@cluster0.snxqqme.mongodb.net/bancodaapi?retryWrites=true&w=majority"
  )

  .then(() => {
    console.log("Conect accept");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
