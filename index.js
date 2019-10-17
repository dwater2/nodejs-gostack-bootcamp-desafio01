const express = require('express');
const server = express();
server.use(express.json());

const projetos = [];
var count = 1;
server.use((req, res, next)=>{
  console.log(`Requisição número: ${count++}`);
  return next();
});
function isProject(req, res, next){
  const { id } = req.params;
  const projeto = projetos.find(p => p.id == id);
  if(!projeto){
    return res.status(400).json({error: 'Project does not exists'});
  }
  return next();
}

server.post('/projects/', (req, res) =>{
    const { project } = req.body;
    projetos.push(project);
    return res.json(projetos);
});

server.get('/projects', (req, res)=>{
  return res.json(projetos);
});

server.put('/projects/:id', isProject, (req, res)=>{
  const { id } = req.params;
  const { title } = req.body;
  const projeto = projetos.find(p => p.id == id);
  projeto.title = title;
  return res.json(projeto);
});

server.delete('/projects/:id', isProject, (req,res)=>{
  const { id } = req.params;
  const index = projetos.findIndex(p => p.id == id);
  projetos.splice(index, 1);
  return res.send();
});

server.post('/projects/:id/tasks', isProject, (req, res)=>{
  const { id } = req.params;
  const { title } = req.body;
  const projeto = projetos.find(p => p.id == id);
  projeto.tasks.push(title);
  return res.json(projetos);
});

server.listen(8888);
