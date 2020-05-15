const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./Employee');
// password - OqxLvBbNIt98fm4k;
// user- cnq
app.use(bodyParser.json());

const Employee = mongoose.model('employee');

const mongoUrl =
  'mongodb+srv://cnq:OqxLvBbNIt98fm4k@cluster0-onebj.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('connected to mongo');
});

mongoose.connection.on('error', err => {
  console.log('error', err);
});

app.get('/', (req, res) => {
  //res.send('Welcome to node js');
  Employee.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/send-data', (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    salary: req.body.salary,
    position: req.body.position,
    picture: req.body.picture,
  });
  employee
    .save()
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});
app.post('/delete', (req, res) => {
  Employee.findByIdAndRemove(req.body.id)
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});
app.post('/update', (req, res) => {
  Employee.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    salary: req.body.salary,
    position: req.body.position,
    picture: req.body.picture,
  })
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(3000, () => {
  console.log('server running');
});

// "name": "jas",
//     "email": "abc@gmail.com",
//     "phone": "1234567891",
//     "salary": "10 LPA",
//     "position": "web developer",
//     "picture":"some url"
