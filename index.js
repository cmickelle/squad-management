const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

mongoose.connect('mongodb://mongo:27-17/squadmanagement',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Squad = mongoose.model('Squad', {
    name: {
      type: String,
      required: true,
    },
    description: String,
    leader: {
      type: String,
      required: true,
    },
    members: [{
      name: String,
      position: String,
      skills: [String],
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.send('Bem-vindo à aplicação de gerenciamento de squads!');
  });

  app.get('/squads', async (req, res) => {
    try {
      const squads = await Squad.find();
      res.json(squads);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar squads' });
    }
  });
  
  app.post('/squads', async (req, res) => {
    const { name, description, leader, members } = req.body;
  
    try {
      const newSquad = new Squad({ name, description, leader, members });
      await newSquad.save();
      res.status(201).json(newSquad);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar squad' });
    }
  });
  
  app.put('/squads/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, leader, members } = req.body;
  
    try {
      const updatedSquad = await Squad.findByIdAndUpdate(
        id,
        { name, description, leader, members },
        { new: true }
      );
  
      res.json(updatedSquad);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar squad' });
    }
  });
  
  app.delete('/squads/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await Squad.findByIdAndDelete(id);
      res.json({ message: 'Squad excluída com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir squad' });
    }
  });
  
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });