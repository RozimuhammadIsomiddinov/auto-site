import Cart from "../../data/models/saleBox.js";

export const deleteCartMid = async (req, res) => {
  try {
    const { id } = req.params; // cart ID
    const cart = await Cart.findByPk(id);

    if (!cart) {
      return res.status(404).send("Cart not found");
    }

    await Cart.destroy({ where: { id } });

    res.status(200).send("Cart successfully deleted");
  } catch (er) {
    return res.status(400).send("Error from deleteCartMid: " + er.message);
  }
};
