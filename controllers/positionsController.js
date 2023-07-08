const axios = require("axios");

const getPositions = async (req, res, next) => {
  try {
    const api_key = process.env.MONGO_DATA_API_KEY;
    let url = process.env.MONGO_DATA_BASE_URI;

    url = `${url}/positions`;

    let config = {
      method: "get",
      url: `${url}`,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "api-key": `${api_key}`,
      },
    };

    const axiosResponse = await axios(config);
    const currentDate = new Date().toISOString().split("T")[0];

    const positions = axiosResponse.data;

    //https://github.com/simplenotsimpler/github-portfolio-simplified/blob/main/server/middlewares/fetch-positions.js
    //make a copy so don't mutate original
    const sortedPositions = positions
      .slice()
      //sort positions by date
      .sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
      //replace with present
      .map((position) => ({
        ...position,
        ...(position.endDate === currentDate && { endDate: "Present" }),
      }));

    const filteredPositions = sortedPositions.filter(
      (position) => position.showOnResume === true
    );

    res.json(filteredPositions);
  } catch (error) {
    next(error);
  }
};

module.exports = { getPositions };
