const admin = require('firebase-admin');
const db = admin.firestore();
const nodemailer = require('nodemailer');

// Configuración de nodemailer para enviar correos usando Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // Asegúrate de configurar esto en tu archivo .env
        pass: process.env.EMAIL_PASS   // Asegúrate de configurar esto en tu archivo .env
    }
});

exports.createPurchase = async (req, res) => {
    const datosCompra = req.body;

    try {
        if (!datosCompra.nombre || !datosCompra.direccion || !datosCompra.telefono || !datosCompra.productos || !datosCompra.email) {
            return res.status(400).json({ message: 'Datos de compra incompletos' });
        }

        const purchaseRef = await db.collection('compras').add(datosCompra);
        res.status(200).json({ message: 'Compra completada', id: purchaseRef.id });
    } catch (error) {
        console.error('Error al completar la compra:', error.message);
        res.status(500).json({ message: 'Error al completar la compra', error: error.message });
    }
};

exports.confirmPurchase = async (req, res) => {
    const purchaseId = req.params.id;

    try {
        const purchaseRef = db.collection('compras').doc(purchaseId);
        const purchase = await purchaseRef.get();

        if (!purchase.exists) {
            return res.status(404).json({ message: 'La compra no existe.' });
        }

        const purchaseData = purchase.data();

        // Actualiza el estado de la compra en la base de datos
        await purchaseRef.update({ status: 'confirmed' });

        // Enviar correo de confirmación
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: purchaseData.email,
            subject: 'Confirmación de Compra',
            text: `Hola ${purchaseData.nombre}, tu compra  ha sido confirmada. Gracias por comprar con nosotros y disfruta de nuestro producto.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo:', error);
                return res.status(500).json({ message: 'Error al enviar el correo de confirmación.', error: error.message });
            } else {
                console.log('Correo enviado: ' + info.response);
                res.status(200).json({ message: 'Compra confirmada y correo enviado.' });
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Error al confirmar la compra.', error: error.message });
    }
};

exports.cancelPurchase = async (req, res) => {
    const purchaseId = req.params.id;

    try {
        const purchaseRef = db.collection('compras').doc(purchaseId);
        const purchase = await purchaseRef.get();

        if (!purchase.exists) {
            return res.status(404).json({ message: 'La compra no existe.' });
        }

        await purchaseRef.delete();

        res.status(200).json({ message: 'Compra rechazada y eliminada correctamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al rechazar la compra.', error: error.message });
    }
};
