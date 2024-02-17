const express = require('express');
const app = express();

app.use(express.json());
app.get('/', (req, res) => {
    console.log('running');
    return res.send("data running");
});
app.use('/api', require('./routes/index'));

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening');
});