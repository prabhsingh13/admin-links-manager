import fs from 'fs';
import path from 'path';

// API to get links
export default function handler(req, res) {
    const filePath = path.join(process.cwd(), 'public', 'adminLinks.json');

    if (req.method === 'GET') {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            const jsonData = JSON.parse(data);
            res.status(200).json(jsonData);
        } catch (error) {
            res.status(500).json({ error: "Failed to read data" });
        }
    } else if (req.method === 'POST') {
        try {
            const { links } = req.body;
            if (!links) return res.status(400).json({ error: "Invalid data" });

            fs.writeFileSync(filePath, JSON.stringify({ links }, null, 2));
            res.status(200).json({ message: "Links updated successfully" });
        } catch (error) {
            res.status(500).json({ error: "Failed to update data" });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
