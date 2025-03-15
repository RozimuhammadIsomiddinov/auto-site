import CommerceCar from "../../data/models/commerce.js";

export const addLinkCommerce = async (req, res) => {
  const { id } = req.params;
  const { video_link } = req.body;

  try {
    const [updated] = await CommerceCar.update(
      { video_link },
      { where: { id } }
    );
    if (updated) {
      res
        .status(200)
        .json({ message: "Successfully updated video link", video_link });
    } else {
      res.status(404).json({ message: "Commerce not found" });
    }
  } catch (e) {
    res
      .status(400)
      .json({ message: "Error from addLinkCommerce", error: e.message });
  }
};

export const deleteLinkCommerce = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await CommerceCar.update(
      { video_link: "" },
      { where: { id } }
    );
    if (updated) {
      return res.status(200).json({
        message: `Successfully deleted video_link from Commerce with id ${id}`,
      });
    } else {
      return res
        .status(404)
        .json({ message: `Commerce with id ${id} not found` });
    }
  } catch (e) {
    return res
      .status(400)
      .json({ message: "Error from deleteLinkCommerce", error: e.message });
  }
};
