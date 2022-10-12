const router = require("express").Router();

const { models } = require("mongoose");
const Aluno = require("../models/Person");

router.post("/", async (req, res) => {
  const { nome, matricula } = req.body;

  if (!nome || !matricula) {
    res.status(422).json({ error: "Nome e matriculas são obrigatórios" });
    return;
  }

  const aluno = {
    nome,
    matricula,
  };

  try {
    await Aluno.create(aluno);

    res.status(201).json({ message: "Aluno cadastrado" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.status(200).json(alunos);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:matricula", async (req, res) => {
  const cod = req.params.matricula;

  try {
    const aluno = await Aluno.findOne({ matricula: cod });

    if (!aluno) {
      res.status(422).json({ error: "O usuario não foi encontrado" });
      return;
    }

    res.status(200).json(aluno);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.put("/:matricula", async (req, res) => {
  const cod = req.params.matricula;
  const { nome, matricula } = req.body;

  const aluno = {
    nome,
    matricula,
  };

  try {
    const updateAluno = await Aluno.updateOne({ matricula: cod }, aluno);

    if (updateAluno.matchedCount === 0) {
      res.status(422).json({ error: "O usuario não foi encontrado" });
      return;
    }

    res.status(200).json(aluno);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete("/:matricula", async (req, res) => {
  const cod = req.params.matricula;
  const aluno = await Aluno.findOne({ matricula: cod });

  if (!aluno) {
    res.status(422).json({ error: "O usuario não foi encontrado" });
    return;
  }

  try {
    await Aluno.deleteOne({ matricula: cod });

    res.status(200).json({ message: "Removido com Sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
