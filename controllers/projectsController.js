const axios = require("axios");

const getProjects = async (req, res, next) => {
  try {
    const token = process.env.GH_TOKEN;
    const url = process.env.GH_URL;

    /* 
      NOTE: 
      can't sort by stargazerCount in query 
      pinnedItems doesn't accept argument 'orderBy
    */

    const ghQueryJSON = `
    {
      "query": "query {viewer { pinnedItems(first: 10) {repos: nodes { ... on Repository { name description url homepageUrl openGraphImageUrl stargazerCount createdAt updatedAt forks {totalCount} watchers { totalCount } repositoryTopics(first: 20) { nodes { topic { name } } } languages(first: 20, orderBy: {field: SIZE, direction: DESC}) { languageList:edges {language: node { name } } } } } } } }"
    }
    `;

    let config = {
      method: "post",
      url: `${url}`,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      data: ghQueryJSON,
      timeout: 3000,
    };

    const axiosResponse = await axios(config);

    const {
      data: {
        viewer: {
          pinnedItems: { repos: projects },
        },
      },
    } = axiosResponse.data;

    //sort pinnedRepos by stargazerCount
    projects.sort((a, b) => b.stargazerCount - a.stargazerCount);

    res.json(projects);
  } catch (error) {
    next(error);
  }
};

module.exports = { getProjects };
