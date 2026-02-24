// lib/emailService.ts
import { formatearMoneda } from '@/utils/CurrencyFormat';
import nodemailer from 'nodemailer';

interface OrderData {
    orderId: string;
    customerData: {
        name: string;
        email: string;
        telefono: number;
        mensaje?: string;
    };
    shippingData: {
        calle: string;
        colonia: string;
        cp: number;
        ciudad: string;
        estado: string;
    };
    items: Array<{
        name: string;
        price: number;
        quantity: number;
        image?: string;
    }>;
    total: number;
    paymentId?: string;
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const sendCustomerEmail = async (orderData: OrderData) => {
    const itemsList = orderData.items.map(item => `
        <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">$${item.price.toFixed(2)}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
    `).join('');

    const mailOptions = {
        from: `"Dominoes | Tu mesa de juegos" <${process.env.EMAIL_USER}>`,
        to: orderData.customerData.email,
        subject: `Confirmación de compra - Orden #${orderData.orderId}`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background-color: #B86112; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
                    .order-details { background-color: white; padding: 15px; border-radius: 8px; margin: 20px 0; }
                    table { width: 100%; border-collapse: collapse; }
                    th { background-color: #f0f0f0; padding: 8px; text-align: left; }
                    .total { font-size: 18px; font-weight: bold; color: #B86112; text-align: right; margin-top: 20px; }
                    .footer { text-align: center; margin-top: 20px; color: #666; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>¡Gracias por tu compra!</h1>
                    </div>
                    <div class="content">
                        <p>Hola <strong>${orderData.customerData.name}</strong>,</p>
                        <p>Hemos recibido tu orden correctamente. Nos comunicaremos contigo en breve para personalizar tu pedido.</p>
                        
                        <div class="order-details">
                            <h3>Detalles de la orden #${orderData.orderId}</h3>
                            
                            <h4>Productos:</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${itemsList}
                                </tbody>
                            </table>
                            
                            <div class="total">
                                Total: $${formatearMoneda(orderData.total)}
                            </div>
                            
                            <h4>Datos de envío:</h4>
                            <p>
                                ${orderData.shippingData.calle}<br>
                                ${orderData.shippingData.colonia}<br>
                                ${orderData.shippingData.ciudad}, ${orderData.shippingData.estado} CP ${orderData.shippingData.cp}
                            </p>
                            
                            ${orderData.customerData.mensaje ? `
                                <h4>Notas del pedido:</h4>
                                <p>${orderData.customerData.mensaje}</p>
                            ` : ''}
                        </div>
                        
                        <p>Si tienes alguna pregunta, responde a este correo o comunicate via whatsapp al +52 81-3234-9830.</p>
                    </div>
                    <div class="footer">
                        <p>© ${new Date().getFullYear()} Dominoes | Tu mesa de juegos. Todos los derechos reservados.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error:', error);
    }
};

export const sendAdminEmail = async (orderData: OrderData) => {
    const itemsList = orderData.items.map(item => `
        <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">$${formatearMoneda(item.price)}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">$${formatearMoneda(item.price * item.quantity)}</td>
        </tr>
    `).join('');

    const mailOptions = {
        from: `"Sistema de Ventas" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `NUEVA VENTA - Orden #${orderData.orderId}`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background-color: #28a745; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
                    .customer-info { background-color: white; padding: 15px; border-radius: 8px; margin: 20px 0; }
                    table { width: 100%; border-collapse: collapse; }
                    th { background-color: #f0f0f0; padding: 8px; text-align: left; }
                    .total { font-size: 18px; font-weight: bold; color: #28a745; text-align: right; margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>¡Nueva Venta Realizada!</h1>
                    </div>
                    <div class="content">
                        <p><strong>Orden:</strong> #${orderData.orderId}</p>
                        <p><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
                        
                        <div class="customer-info">
                            <h3>Datos del Cliente:</h3>
                            <p>
                                <strong>Nombre:</strong> ${orderData.customerData.name}<br>
                                <strong>Email:</strong> ${orderData.customerData.email}<br>
                                <strong>Teléfono:</strong> ${orderData.customerData.telefono}<br>
                                ${orderData.customerData.mensaje ? `<strong>Notas:</strong> ${orderData.customerData.mensaje}<br>` : ''}
                            </p>
                            
                            <h3>Dirección de envío:</h3>
                            <p>
                                ${orderData.shippingData.calle}<br>
                                ${orderData.shippingData.colonia}<br>
                                ${orderData.shippingData.ciudad}, ${orderData.shippingData.estado} CP ${orderData.shippingData.cp}
                            </p>
                        </div>
                        
                        <h3>Productos:</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${itemsList}
                            </tbody>
                        </table>
                        
                        <div class="total">
                            Total: $${formatearMoneda(orderData.total)}
                        </div>
                        
                        ${orderData.paymentId ? `<p><strong>ID de pago:</strong> ${orderData.paymentId}</p>` : ''}
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error:', error);
    }
};