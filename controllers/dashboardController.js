// controllers/dashboardController.js
const db = require('../firebaseConfig');

exports.getPendingPurchases = async (req, res) => {
    try {
        const snapshot = await db.collection('compras').where('status', '==', 'pending').get();
        if (snapshot.empty) {
            return res.json([]); // No hay compras pendientes
        }
        const purchases = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(purchases);
    } catch (error) {
        console.error('Error al obtener las compras pendientes:', error);
        res.status(500).send('Error al obtener las compras pendientes');
    }
};
