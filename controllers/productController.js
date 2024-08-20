const db = require('../firebaseConfig');

exports.getProducts = async (req, res) => {
    const snapshot = await db.collection('productos').get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(products);
};
