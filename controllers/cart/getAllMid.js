import Cart from "../../data/models/saleBox.js";

export const getAllMid = async (req, res) => {
  try {
    const result = await Cart.findAll();

    if (result.length === 0) {
      return res.status(404).json({ message: "Carts have not yet!" });
    }

    res.status(200).json(result);
  } catch (e) {
    return res.status(400).send("Error from getAllMidCart:\n" + e.message);
  }
};
