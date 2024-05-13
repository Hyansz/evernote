require('dotenv').config({path:'.env.development.local'});

const {sql} = require('@vercel/postgres')

async function execute() {

    const deleteTable = await sql`drop table if exists note`;

    const createTable = await sql`
    CREATE TABLE IF NOT EXISTS note (
        id SERIAL PRIMARY KEY,
        title VARCHAR(30) NOT NULL,
        contain VARCHAR(1500) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        upload_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    ) 
    `;
    console.log(createTable)
}

execute()