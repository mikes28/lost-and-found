const express = require('express');
const app = express();
const port = 3000;

const itemsRoutes = require('./routes/itemsRoutes');
const claimsRoutes = require('./routes/claimsRoutes');

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});

app.use('/api/items', itemsRoutes);
app.use('/api/claims', claimsRoutes);

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}

module.exports = app;