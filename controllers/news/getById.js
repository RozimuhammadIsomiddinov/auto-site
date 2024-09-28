const { getByIdNews } = require("../../data/functions/news");

const getMidNewsById = async (req, res) => {
  try {
    const result = await getByIdNews(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "News not found!" });
    }
    res.status(200).json(result);
  } catch (err) {
    if (!res.headersSent) {
      res.status(400).json({
        message: "Error from getMidNewsById",
        error: err.message,
      });
    }
  }
};
module.exports = { getMidNewsById };
