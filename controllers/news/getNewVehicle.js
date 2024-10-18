const { getNewcar } = require("../../data/functions/autombiles");
const { getNewCommerce } = require("../../data/functions/commerceCar");
const { getNewMoto } = require("../../data/functions/motos");
const getNewVehicleMid = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const [resultCars, resultCommerce, resultMotos] = await Promise.all([
      getNewcar(page, pageSize),
      getNewCommerce(page, pageSize),
      getNewMoto(page, pageSize),
    ]);

    // Combine results into a single object or array
    const combinedResults = {
      cars: resultCars,
      commerceCars: resultCommerce,
      motorcycles: resultMotos,
    };

    res.status(200).json(combinedResults);
  } catch (err) {
    res.status(400).json({
      message: "Error from getMidNewVehicle",
      error: err.message,
    });
    next(err);
  }
};

module.exports = getNewVehicleMid;
