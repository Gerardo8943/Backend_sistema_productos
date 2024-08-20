require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const clientRoutes = require('./routes/clientRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const completePurchaseRoutes = require('./routes/completePurchaseRoutes');

const app = express();

// Configura CORS para permitir solicitudes desde cualquier origen
app.use(cors()); // Permite todos los orígenes por defecto
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Backend is running');
});

// Cargar las rutas
app.use('/api/products', productRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/complete-purchase', completePurchaseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
