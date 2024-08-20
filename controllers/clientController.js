const db = require('../firebaseConfig');

exports.createClient = async (req, res) => {
    const newClient = req.body;
    await db.collection('clientes').add(newClient);
    res.status(201).send('Cliente registrado');
};
