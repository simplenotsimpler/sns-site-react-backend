const axios = require("axios");
//TODO: combine mongodb requests into a facade
const getBasics = async (req, res, next) => {
  try {
    const api_key = process.env.MONGO_DATA_API_KEY;
    let url = process.env.MONGO_DATA_BASE_URI;

    url = `${url}/basics`;

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

    const basics = axiosResponse.data;

    res.json({ basics });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { getBasics };
