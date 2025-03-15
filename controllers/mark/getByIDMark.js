import Mark from "../../data/models/carMark.js";

export const getByIDMark = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(404).json({ message: "send an id" });

    const result = await Mark.findByPk(id);
    res.status(200).json(result?.mark_name);
  } catch (err) {
    res.status(400).json({ message: "Error from getByID", error: err.message });
  }
};
