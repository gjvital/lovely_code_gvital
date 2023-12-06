const axios = require('axios');
const pgp = require('pg-promise')();

// Configuring the connection to PostgreSQL
const db = pgp('postgres://postgres:1234@127.0.0.1:5432/users_github');


async function fetchDataFromGitHub(usernames) {
  try {
    for (const username of usernames) {
      // Make a request to the GitHub API
      const response = await axios.get(`https://api.github.com/users/${username}`);
      const userData = response.data;

      // Insert data into the database
      await db.none('INSERT INTO users_github(id, name, location) VALUES($1, $2, $3)', [userData.id, userData.name, userData.location]);

      console.log(`User data ${username} inserted into the database.`);
    }

    //Query and display all records in the table
    const result = await db.any('SELECT * FROM users_github');
    console.log('selected table:');
    console.table(result);
  } catch (error) {
    console.error('Error accessing GitHub API or inserting into database:', error.message);
  } finally {
    // Closes the connection to the database
    pgp.end();
  }
}

// Calls the function with the users array
const username = ['vitaly-t','clarabez','mateus','julio','maria','codebuil'];
fetchDataFromGitHub(username);