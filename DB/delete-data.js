require('dotenv').config({path:'.env.development.local'});

const {sql} = require('@vercel/postgres')

async function execute() {

    try {

        const {rows} = await sql`
        DELETE FROM note WHERE id = 2; `
        console.log(rows)
    } catch (error) {
        console.log(error)
    }

}

execute()