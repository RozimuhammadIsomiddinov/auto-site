import { getCarById, addCar } from "../../data/functions/autombiles.js";

export const createMidCar = async (req, res, next) => {
  try {
    const {
      image,
      country,
      year,
      cost,
      milage,
      fuel,
      volume,
      horsepower,
      drive,
      checkpoint,
      doors,
      body,
      statement,
      description,
    } = req.body;

    if (
      !image ||
      !country ||
      !year ||
      !cost ||
      !milage ||
      !fuel ||
      !volume ||
      !horsepower ||
      !drive ||
      !checkpoint ||
      !doors ||
      !body ||
      !description
    ) {
      return res.status(400).send("Required fields are missing");
    }

    const result = await addCar(req.body);

    const minicar = await getCarById(result.id);

    if (!minicar) {
      return res.status(404).send("Product have got in DataBase yet");
    }

    res.status(201).send(`Successfully added:\n${JSON.stringify(result)}`);
    next();
  } catch (e) {
    return res.status(400).send("Error from createMidCar:\n" + e.message);
  }
};
