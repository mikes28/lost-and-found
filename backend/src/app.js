const express = require('express');
const app = express();
const port = 3000;

const itemsRoutes = require('./routes/itemsRoutes');
const claimsRoutes = require('./routes/claimsRoutes');

app.use(express.json());


app.use('/api/items', itemsRoutes);
app.use('/api/claims', claimsRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});