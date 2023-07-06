# SNS React Site Backend

Express proxy API backend for [SNS React front-end](https://github.com/simplenotsimpler/sns-site-react). Fetches data from GitHub and MongoDB Data API.

## Details:

- Loosely based on https://github.com/bradtraversy/node-api-proxy-server in order to hide API keys
- Fetches pinned GitHub repos using the [GitHub GraphQL API](https://docs.github.com/en/graphql).
- Fetches other portfolio data via a MongoDB Data API which serves data from a MongoDB Atlas database (free tier). This allows staying on the free tier and avoid having to allow all IP addresses.

# License

This project is [MIT licensed](./LICENSE).
