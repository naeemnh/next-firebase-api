import db from "../../../utils/db";
import { test } from "../../../utils/log";

export default async (req, res) => {
  try {
    const { slug } = req.body;
    const entries = await db.collection("entries").get();
    const entriesData = entries.docs.map((entry) => entry.data());
    test(slug, "slug of the post");
    if (entriesData.some((entry) => entry.slug === slug)) {
      res.status(400).end();
    } else {
      const { id } = await db.collection("entries").add({
        ...req.body,
        createdAt: new Date().toISOString(),
      });
      res.status(200).json({ id });
    }
  } catch (e) {
    res.status(400).end();
  }
};
