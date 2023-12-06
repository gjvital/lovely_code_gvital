const axios = require('axios');
const pgp = require('pg-promise')();

// Configuring the connection to PostgreSQL
const db = pgp('postgres://postgres:1234@127.0.0.1:5432/users_github');

async function fetchDataFromGitHub(usernames) {
  try {
    for (const username of usernames) {
      // Make a request to the GitHub API
      const response = await axios.get(`https://api.github.com/users/${username}/repos`);
      const reposData = response.data;

      // Iterates over the repositories and inserts into the table
      for (const repo of reposData) {
        const language = repo.language || 'N/A';

        await db.none('INSERT INTO users_github_repo(language) VALUES($1)', [language]);
      }

      console.log(`User data ${username} inserted into the database.`);
    }

    // Query and display all records in the table
    const result = await db.any('SELECT * FROM users_github_repo');
    console.log('Selected table:');
    console.table(result);
  } catch (error) {
    console.error('Error accessing GitHub API or inserting into database:', error.message);
  } finally {
    // Closes the connection to the database
    pgp.end();
  }
}

// Calls the function with the users array
const usernames = ['mateus'];
fetchDataFromGitHub(usernames);