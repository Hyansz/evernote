const { sql } = require("@vercel/postgres");

async function insertData(req, res) {
    try {
        if (req.method !== "POST") {
            return res
                .status(405)
                .json({ message: "Method tidak diperbolehkan" });
        }

        const { title, contain } = req.body;

        const rows = await sql` INSERT INTO note (title,contain)
        VALUES (${title},${contain})`;

        res.status(200).json({ message: "Success", data: rows });
    } catch (e) {
        console.log("ADA ERROR ", e);
        return res.status(500).json({ message: "Terjadi error," });
    }
}

export default insertData;
