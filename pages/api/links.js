import { db } from "../../firebase";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const snapshot = await db.collection("links").orderBy("createdAt", "desc").get();
      const links = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return res.status(200).json({ success: true, links });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  if (req.method === "POST") {
    const { title, url } = req.body;

    if (!title || !url) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    try {
      const newLink = await db.collection("links").add({
        title,
        url,
        createdAt: new Date()
      });
      return res.status(201).json({ success: true, id: newLink.id });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  if (req.method === "PUT" || req.method === "PATCH") {
    const { id, title, url } = req.body;

    if (!id || !title || !url) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    try {
      await db.collection("links").doc(id).update({ title, url });
      return res.status(200).json({ success: true, message: "Link updated" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Missing ID" });
    }

    try {
      await db.collection("links").doc(id).delete();
      return res.status(200).json({ success: true, message: "Link deleted" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  return res.status(405).json({ success: false, message: "Method Not Allowed" });
}
