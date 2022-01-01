const {Order, cartItem} = require('../../order/models')
const Product = require('../models')
const {errorHandler} = require('../../../../utils/helpers/dbErrorHandler')

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate('products.product', 'name price')
        .exec((err, order) => {
            if (err || !order) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            req.order = order
            next()
        })
}


exports.create = (req, res) => {
    const order = new Order(req.body.order)

    order.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }

        const emailData = {
            to: 'team@lucid.haus',
            from: 'no-reply@lucid.haus',
            subject: `Yay! New Purchase: #${order.transactionId}`,
            html: `
            <p>Customer email: ${req.body.order.email}</p>
            <p>Total products: ${order.products.length}</p>
            <p>Total cost: $ ${order.amount}</p>
            <p>Login to <a href="https://lucid.haus/admin">dashboard</a> to see the order in detail.</p>`
        }
        sgMail.send(emailData)

        const customerReceipt = {
            to: req.body.order.email,
            from: 'no-reply@lucid.haus',
            subject: `Thanks for your purchase! - LucidHaus Order #${order.transactionId}`,
            html: `
            <img src="https://d1ogvuec9tg4jo.cloudfront.net/config/lh.png" width="150" height="150" />
            <p>We will send you an email when your order has shipped! Below are the details of the order:</p>
            <br />
            <div >
            </div>
            <p><strong>Order #:</strong> ${order.transactionId}</p>
            <p><strong>Order Total:</strong> $${order.amount}</p>
            <p><strong>Delivery Address:</strong> ${order.address} ${order.address2} ${order.city} ${order.zip} ${order.country}</p>
             <br />
             <p>Questions? Email <a href="mailto:team@lucid.haus">team@lucid.haus</a></p>
             <br />
             <strong><3 <3 <3</strong>
           `
        }
        sgMail.send(customerReceipt)

        res.json(data)
    })
}

exports.listOrders = (req, res) => {
    Order.find()
        .populate('user', '_id name address')
        .sort('-createdAt')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(orders)
        })
}

exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path('status').enumValues)
}

exports.updateOrderStatus = (req, res) => {

    Order.findById(req.body.orderId).exec((err, order) => {
        if (req.body.status === 'Shipped') {
            const customerReceipt = {
                to: order.email,
                from: 'no-reply@lucid.haus',
                subject: `Your order has shipped! - LucidHaus Order #${order.transactionId}`,
                html: `
            <img src="https://d1ogvuec9tg4jo.cloudfront.net/config/lh.png" width="150" height="150" />
            <p>Your order has shipped!</p>
            <br />
            <div >
            </div>
            <p><strong>Order #:</strong> ${order.transactionId}</p>
            <p><strong>Order Total:</strong> $${order.amount}</p>
            <p><strong>Delivery Address:</strong> ${order.address} ${order.address2} ${order.city} ${order.zip} ${order.country}</p>
             <br />
             <p>Questions? Email <a href="mailto:team@lucid.haus">team@lucid.haus</a></p>
             <br />
             <strong><3 <3 <3</strong>
           `
            }
            sgMail.send(customerReceipt)
        }

        // const products = []
        // {order.products.map((p) => {
        //     Product.findById(p._id).exec((err, product) => {
        //         const productName = product.name
        //         const productPhoto = `https://d1ogvuec9tg4jo.cloudfront.net/${product.photo}`
        //         const productSlug = `https://lucid.haus/shop/${product.slug}`
        //         const html = `<div style="display: flex; flex-direction: row;">
        //                           <img src=${productPhoto} width="150" height="150" />
        //                           <a href=${productSlug}>${productName}</a>
        //                       </div>`
        //
        //         return products.push(html)
        //     })
        // })}
        // console.log('PR', products)
    })

    Order.updateOne({_id: req.body.orderId}, {$set: {status: req.body.status}},
        (err, order) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(order)
        }
    )
}
