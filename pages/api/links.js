import db from '../../firebase';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const snapshot = await db.collection('adminLinks').orderBy("timestamp", "desc").get();
            const links = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return res.status(200).json(links);
        } catch (error) {
            return res.status(500).json({ error: "Failed to fetch links" });
        }
    } else if (req.method === 'POST') {
        try {
            const { name, url, note } = req.body;
            await db.collection('adminLinks').add({
                name,
                url,
                note: note || "",
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
            });
            return res.status(201).json({ message: "Link added successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Failed to add link" });
        }
    } else {
        return res.status(405).json({ error: "Method Not Allowed" });
    }
}
