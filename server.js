const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const User = require('./api/routers/userRouter')

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Connect to MongoDB
// mongoose
//   .connect(db)
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

mongoose.connect('mongodb://localhost/final_project', {useNewUrlParser:true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function(){
    console.log('db connected')
})

// Use Routes
app.use('/user', User);

app.use((req, res, next)=> {
  const error = new Error('Not found');
  error.status = 404;
  next(error)
})
app.use((error, req, res, next)=>{
  res.status(error.status || 500)
  res.json({
      error:{
          message:error.message
      }
  })
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));