const fetch = require('node-fetch');

async function fetchGraphQL(operationsDoc, variables) {
  const res = await fetch('http://localhost:3001/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
    }),
  });
  return await res.json();
}

const index = async (req, res) => {
  const query = `{
    users {
      id
      name
    }
  }`;
  const data = await fetchGraphQL(query, {});
  console.log(data);
  return res.render('index', {
    users: data.data.users,
  });
};

module.exports = {
  index,
};
