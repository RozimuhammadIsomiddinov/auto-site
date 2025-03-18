import { getAllNews } from "../../data/functions/news.js";

const getMidNews = async (req, res) => {
  try {
    const result = await getAllNews(req.query.page, req.query.pageSize);

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      message: "Error from getMidNews",
      error: err.message,
    });
  }
};

export { getMidNews };
