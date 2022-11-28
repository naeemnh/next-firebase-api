import db from "../../utils/db";

export default async (req, res) => {
  const { query: id, method } = req;

  try {
    switch (method) {
      case "PUT":
        await db
          .collection("entries")
          .doc(id)
          .update({
            ...req.body,
            updatedAt: new Date().toISOString(),
          });
        break;
      case "GET":
        const doc = await db.collection("entries").doc(id).get();
        if (!doc.exists) res.status(404).end();
        else res.status(200).json(doc.data());
        break;
      case "DELETE":
        await db.collection("entries").doc(id).delete();
        break;
      default:
        res.status(200).end();
    }
  } catch (e) {
    res.status(400).end();
  }
};
