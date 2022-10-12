const mongoose = require('mongoose');

const aluno = mongoose.model("aluno", {
  nome:String,
  matricula: Number,
})

module.exports = aluno