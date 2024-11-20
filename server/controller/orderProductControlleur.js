const { OrderProduct, Product, User } = require("../indexdatabase");

const createOrderProduct = async (req, res) => {
  const { userId, productId, quantity, priceAtPurchase, date, orderStatus } =
    req.body;

  try {
    const newOrderProduct = await OrderProduct.create({
      userId,
      productId,
      quantity,
      priceAtPurchase,
      date,
      orderStatus,
    });

    await newOrderProduct.update({ orderStatus: "complete" });
    console.log("Order created successfully:", newOrderProduct);
    // await Promise.all(orderPromises);

    res.status(201).send({
      message: "Order product created successfully",
      orderProductId: newOrderProduct.orderProductId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server error", error: err.message });
  }
};

const getOrderProductByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      return res
        .status(404)
        .json({ message: "There is no order under this user" });
    }

    const orderProduct = await OrderProduct.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          attributes: ["productId", "name"],
        },
      ],
    });

    if (!orderProduct.length) {
      return res
        .status(404)
        .json({ message: "No order found for this product" });
    }

    return res.status(200).json(orderProduct);
  } catch (error) {
    console.error("Error fetching product ratings:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createOrderProduct,
  getOrderProductByUserId,
};
