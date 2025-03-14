import { addToCart } from "../../data/functions/products.js";

export const createMid = async (req, res) => {
  const { user_id, quantity, product_type } = req.body;
  const { id } = req.params; // product ID

  if (!user_id || !id || !product_type) {
    return res.status(400).send("All fields are required.");
  }

  if (isNaN(user_id) || user_id <= 0) {
    return res.status(400).send("Valid user ID is required.");
  }

  try {
    const result = await addToCart(user_id, id, quantity, product_type);

    if (result.message === "not found anything") {
      return res.status(404).send(result.message);
    }

    res.status(201).json(result);
  } catch (e) {
    return res.status(400).send("Error from createMidCart:\n" + e.message);
  }
};
