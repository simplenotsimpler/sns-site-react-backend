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
      "query": "query {viewer { pinnedItems(first: 10) {repos: nodes { ... on Repository { name description url homepageUrl openGraphImageUrl stargazerCount createdAt updatedAt pushedAt forks {totalCount} watchers { totalCount } topics: repositoryTopics(first: 20) { nodes { topic { name } } } languages(first: 20, orderBy: {field: SIZE, direction: DESC}) { edges {node { name } } } } } } } }"
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

    console.log("projects:", projects);

    const projectsWithFlatStuff = projects.map((project) => {
      return {
        ...project,
        topics: project.topics.nodes.map((node) => node.topic.name),
        languages: project.languages.edges.map((edge) => edge.node.name),
      };
    });

    //brickyard dates in GitHub not accurate since the repo is a container for the site screenshot and basic info. dates are approximate
    //brickyard around time of modern-table 1.0.6 release
    projectsWithFlatStuff.find(
      (project) => project.name === "brickyard-ceramics"
    ).createdAt = "2020-06-15";

    //last modified per the headers.
    projectsWithFlatStuff.find(
      (project) => project.name === "brickyard-ceramics"
    ).pushedAt = "2021-10-08";

    //manually add languages since source code not stored in GitHub
    projectsWithFlatStuff.find(
      (project) => project.name === "brickyard-ceramics"
    ).languages= ["HTML", "CSS"]
    console.log("projectsWithFlatStuff", projectsWithFlatStuff);
    //sort pinnedRepos by stargazerCount
    // projects.sort((a, b) => b.stargazerCount - a.stargazerCount);

    //sort by pushedAt
    const sortedProjects = projectsWithFlatStuff
      .slice()
      .sort((a, b) => new Date(b.pushedAt) - new Date(a.pushedAt));

    res.json(sortedProjects);
  } catch (error) {
    next(error);
  }
};

module.exports = { getProjects };
