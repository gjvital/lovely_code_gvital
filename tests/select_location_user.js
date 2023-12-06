    const axios = require('axios');
    const pgp = require('pg-promise')();

    // Configuring the connection to PostgreSQL
    const db = pgp('postgres://postgres:1234@127.0.0.1:5432/users_github');

    async function selectUsersByLocation(location) {
        try {
        // Query to select users based on location
        const result = await db.any('SELECT id, name, location FROM users_github WHERE location = $1', [location]);
    
        console.log(`Users in location ${location}:`);
        result.forEach(user => {
            console.log(`ID: ${user.id}, Name: ${user.name}, Location: ${user.location}`);
            console.table(result);
        });
    
        if (result.length === 0) {
            console.log('No users found at this location.');
        }
        } catch (error) {
        console.error('Error when selecting users by location in the table:', error.message);
        } finally {
        // Closes the connection to the database
        pgp.end();
        }
    }
    
    //Replace desired location
    selectUsersByLocation('lisbon portugal');