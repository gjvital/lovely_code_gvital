const axios = require('axios');
const pgp = require('pg-promise')();

// Configuring the connection to PostgreSQL
const db = pgp('postgres://postgres:1234@127.0.0.1:5432/users_github');


async function selectItemFromDatabase(userId) {
  try {         
    // Query and display all records in the table
    const result = await db.one('SELECT id, name, location FROM users_github WHERE id = $1', [userId]);
    console.log('selected user:');
    console.table(result);
  } catch (error) {
    console.error('Error accessing GitHub API or inserting into database:', error.message);
  } finally {
    // Closes the connection to the database
    pgp.end();
  }
}

// Calls the function with the users array
selectItemFromDatabase(5108906);