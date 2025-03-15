import Offer from "../../data/models/offer.js";

export const createOffer = async (req, res) => {
  const { name, surname, phone } = req.body;
  try {
    const result = await Offer.create({ name, surname, phone });
    return res.status(201).json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
