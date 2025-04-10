import Cart from "../models/saleBox.js";
import Users from "../models/user.js";
import Car from "../models/automobile.js";
import Motorcycle from "../models/moto.js";
import CommerceCar from "../models/commerce.js";

export const addToCart = async (userId, productId, quantity, productType) => {
  try {
    const findUser = await Users.findByPk(userId);
    let findProduct;

    switch (productType) {
      case "car":
        findProduct = await Car.findByPk(productId);
        break;
      case "motorcycle":
        findProduct = await Motorcycle.findByPk(productId);
        break;
      case "commerce":
        findProduct = await CommerceCar.findByPk(productId);
        break;
      default:
        return { message: "Invalid product type" };
    }

    if (!findUser) {
      return { message: "User not found" };
    }
    if (!findProduct) {
      return { message: "Product not found" };
    }

    const quantityInt = parseInt(quantity, 10);
    if (isNaN(quantityInt) || quantityInt <= 0) {
      return { message: "Invalid quantity" };
    }

    const existingCartItem = await Cart.findOne({
      where: {
        user_id: userId,
        product_id: productId,
        product_type: productType,
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
        product_type: productType,
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
