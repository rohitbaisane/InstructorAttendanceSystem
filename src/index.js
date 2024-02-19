const express = require('express');
const app = express();
const { PORT } = require('./config/serverConfig');


app.use(express.json());
app.use('/api', require('./routes/index'));

app.listen(PORT, () => {
    console.log('Server is listening');
});