const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");

app.listen(3000, () => {
  console.log("On!");
});

app.use(express.json());
app.use(cors());

const transform = (operation, data) => {
  if (operation == "leer") {
    return JSON.parse(fs.readFileSync("./canciones.json"));
  } else if (operation == "registrar") {
    fs.writeFileSync("./canciones.json", JSON.stringify(data));
  }
};

app.get("/canciones", (req, res) => {
  const canciones = transform("leer");
  res.json(canciones);
});

app.post("/canciones", (req, res) => {
  const cancion = req.body;
  const canciones = transform("leer");
  canciones.push(cancion);
  transform("registrar", canciones);
  res.send(canciones);
});

app.put("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const cancion = req.body;
  const canciones = transform("leer");
  const index = canciones.findIndex((c) => c.id == id);
  canciones[index] = cancion;
  transform("registrar", canciones);
  res.send(canciones);
});

app.delete("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const canciones = transform("leer");
  const index = canciones.findIndex((c) => c.id == id);
  canciones.splice(index, 1);
  transform("registrar", canciones);
  res.send(canciones);
});
