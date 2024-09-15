const Cart = require("../../data/models/saleBox.js");

const deleteCartMid = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findByPk(id);
    if (!cart) {
      return res.status(404).send("cart not found");
    }
    const result = await Cart.destroy({ where: { id } });
    res.status(200).send("Cart succesfully deleted");
    next();
  } catch (er) {
    return res.status(400).send("Error from deleteCartMid: " + er.message);
  }
};
module.exports = { deleteCartMid };
