const express = require('express');
const cors = require('cors');
const itemRoutes = require('./routes/items');
const { createTables } = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

createTables();

app.use('/items', itemRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
