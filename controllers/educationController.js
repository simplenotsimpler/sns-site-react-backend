const axios = require("axios");

const getEducation = async (req, res, next) => {
  try {
    const api_key = process.env.MONGO_DATA_API_KEY;
    let url = process.env.MONGO_DATA_BASE_URI;

    url = `${url}/education`;

    let config = {
      method: "get",
      url: `${url}`,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "api-key": `${api_key}`,
      },
    };

    const axiosResponse = await axios(config);

    const education = axiosResponse.data;

    const sortedEducation = education
      .slice()
      .sort((a, b) => new Date(b.endDate) - new Date(a.endDate));

    const filteredEducation = sortedEducation.filter(
      (education) => education.showOnResume === true
    );
    res.json(filteredEducation);
  } catch (error) {
    next(error);
  }
};

module.exports = { getEducation };
