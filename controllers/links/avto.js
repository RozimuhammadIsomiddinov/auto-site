import Car from "../../data/models/automobile.js";

export const addLinkAvto = async (req, res) => {
  const { id } = req.params;
  const { video_link } = req.body;
  try {
    const [updated] = await Car.update({ video_link }, { where: { id } });
    if (updated) {
      res
        .status(200)
        .json({ message: "Successfully updated video link", video_link });
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (e) {
    res
      .status(400)
      .json({ message: "Error from addLinkAvto", error: e.message });
  }
};

export const deleteLinkAvto = async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await Car.update({ video_link: "" }, { where: { id } });

    if (updated) {
      return res.status(200).json({
        message: `Successfully deleted video_link from car with id ${id}`,
      });
    } else {
      return res.status(404).json({ message: `Car with id ${id} not found` });
    }
  } catch (e) {
    res
      .status(400)
      .json({ message: "Error from deleteLinkAvto", error: e.message });
  }
};
