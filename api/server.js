const express = require('express');

const server = express();
server.use(express.json());


const users = [
  { 
    username: 'Mack',
    password: 'a converted clown car stolen from Edward Cullen'
  },
  {
    username: 'him',
    password: 'REDACTED',
  }
];

server.get('/', (req, res) => {
  res.status(200).send('<h1>Hello! Welcome to the Users API.</h1>');
});

server.get('/api/users', (req, res) => {
  res.status(200).json(users);
});

server.post('/api/register', (req, res) => {
  console.log(req);
  if (!Object.keys(req.body).length === 2
      || Object.keys(req.body).indexOf('username') === -1
      || Object.keys(req.body).indexOf('password') === -1
      ) {
    res.status(400).json({ message: 'Sorry! Your request must consist of a username and password.' });
    return;
  }

  users.push(req.body);
  res.status(201).json(req.body);
});

server.post('/api/login', (req, res) => {
  if (users.filter(x => x.username===req.body.username&&x.password===req.body.password).length === 0) {
    res.status(400).json({ message: 'Sorry! Unknown user.' });
    return;
  }

  res.status(200).json({ message: `Welcome ${req.body.username}!` });
});

module.exports = server;
