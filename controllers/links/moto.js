const Motorcycle = require("../../data/models/moto");

const addLinkMoto = async (req, res) => {
  const { id } = req.params;
  const { video_link } = req.body;
  try {
    const [updated] = await Motorcycle.update(
      { video_link },
      { where: { id } }
    );
    if (updated) {
      res
        .status(200)
        .json({ message: "Successfully updated video link", video_link });
    } else {
      res.status(404).json({ message: "Moto not found" });
    }
  } catch (e) {
    res
      .status(400)
      .json({ message: "Error from addLinkMoto", error: e.message });
  }
};

const deleteLinkMoto = async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await Motorcycle.update(
      { video_link: "" },
      { where: { id } }
    );

    if (updated) {
      return res.status(200).json({
        message: `Successfully deleted video_link from moto with id ${id}`,
      });
    } else {
      return res.status(404).json({ message: `Moto with id ${id} not found` });
    }
  } catch (e) {
    res
      .status(400)
      .json({ message: "Error from deleteLinkMoto", error: e.message });
  }
};

module.exports = { addLinkMoto, deleteLinkMoto };
