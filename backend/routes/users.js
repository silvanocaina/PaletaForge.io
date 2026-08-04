import express from 'express'

const app = express();

// ##############################
// ###  Métodos para usuarios  ##
// ##############################

app.get('/usuarios', (req, res) => {
  try {
    
  }
  catch(e) {
    
  res.status(500).send('Erro no servidor')
  }
})

app.post('/usuarios', (req, res) => {

  try {
    
  }
  catch(e) {
    
  res.status(500).send('Erro no servidor')
  }
})

// ###################################
// ###  Métodos para id de usuario  ##
// ################################### 

app.get('/usuarios/:id', (req, res) => {
  try {
    
  }
  catch(e) {
    
  res.status(500).send('Erro no servidor')
  }
})

app.put('/usuarios/:id', (req, res) => {
  try {
    
  }
  catch(e) {
    
  res.status(500).send('Erro no servidor')
  }
})

app.patch('/usuarios/:id', (req, res) => {
  try {
    
  }
  catch(e) {
    
  res.status(500).send('Erro no servidor')
  }
})

app.delete('/usuarios/:id', (req, res) => {
  try {
    
  }
  catch(e) {
    
  res.status(500).send('Erro no servidor')
  }
})