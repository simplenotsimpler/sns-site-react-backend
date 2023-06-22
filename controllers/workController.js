const axios = require("axios");

const getWork = async (req, res, next) => {
  try {
    const api_key = process.env.MONGO_DATA_API_KEY;
    let url = process.env.MONGO_DATA_BASE_URI;

    url = `${url}/work`;

    let config = {
      method: "get",
      url: `${url}`,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "api-key": `${api_key}`,
      },
    };

    const axiosResponse = await axios(config);
    console.log();

    const work = axiosResponse.data;

    res.json(work);
  } catch (error) {
    next(error);
  }
};

module.exports = { getWork };
