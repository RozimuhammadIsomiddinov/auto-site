const Cart = require("../../data/models/saleBox.js");

const deleteCartMid = async (req, res) => {
  try {
    const { id } = req.params; //cart id
    const cart = await Cart.findByPk(id);
    if (!cart) {
      return res.status(404).send("cart not found");
    }
    const result = await Cart.destroy({ where: { id } });
    res.status(200).send("Cart succesfully deleted");
  } catch (er) {
    return res.status(400).send("Error from deleteCartMid: " + er.message);
  }
};
module.exports = { deleteCartMid };
