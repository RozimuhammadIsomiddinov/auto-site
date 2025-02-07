const { getAllNews } = require("../../data/functions/news");

const getMidNews = async (req, res) => {
  try {
    const result = await getAllNews(req.query.page, req.query.pageSize);
    if (result.length === 0) {
      return res.status(404).json({ message: "No news available!" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      message: "Error from getMidNews",
      error: err.message,
    });
  }
};
module.exports = { getMidNews };
