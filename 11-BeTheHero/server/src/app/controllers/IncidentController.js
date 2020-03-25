import connection from "../../database/connection";

export default {
  async index(req, res) {
    const { page = 1 } = req.query;

    const count = await connection("incidents").count().first();

    const incidents = await connection("incidents")
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "incidents.*",
        "ongs.name",
        "ongs.email",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf",
      ]);

    res.header("X-Total-Count", count["count(*)"]);

    return res.status(200).json({ incidents });
  },
  async store(req, res) {
    const ong_id = req.headers.authorization;
    const { title, description, value } = req.body;

    const incident = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id,
    });

    return res.status(201).json({ incident });
  },
  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await connection("incidents")
      .where("id", id)
      .select("ong_id")
      .first();

    if (ong_id !== incident.ong_id) {
      return res.status(401).json({ message: "Exclusão não autorizada." });
    }

    await connection("incidents").where("id", id).delete();

    return res.status(201).json({ message: "Exclusão realizada." });
  },
};
