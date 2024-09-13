import Cart from "../models/saleBox.js";
import Users from "../models/user.js";
import Car from "../models/automobile.js";

export const addToCart = async (userId, productId, quantity) => {
  try {
    const findUser = await Users.findByPk(userId);
    const findCar = await Car.findByPk(productId);

    if (!findUser || !findCar) {
      return { message: "User or product not found" };
    }

    const quantityInt = parseInt(quantity, 10);
    if (isNaN(quantityInt) || quantityInt <= 0) {
      return { message: "Invalid quantity" };
    }

    const existingCartItem = await Cart.findOne({
      where: {
        user_id: userId,
        product_id: productId,
      },
    });

    if (existingCartItem) {
      const updatedQuantity = existingCartItem.quantity + quantityInt;
      await existingCartItem.update({ quantity: updatedQuantity });

      return {
        message: "Quantity updated in your existing cart",
        data: existingCartItem.dataValues,
      };
    } else {
      const newCartItem = await Cart.create({
        user_id: userId,
        product_id: productId,
        quantity: quantityInt,
      });

      return {
        message: "New item added to the cart",
        data: newCartItem.dataValues,
      };
    }
  } catch (err) {
    return { message: "Error", error: err.message };
  }
};
