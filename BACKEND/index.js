const connectTOMongo = require('./BD');
const express = require('express')
connectTOMongo();
const cors = require('cors'); 

const app = express()
const port = 5000

app.use(cors());
app.use(express.json());

//routes calling
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})