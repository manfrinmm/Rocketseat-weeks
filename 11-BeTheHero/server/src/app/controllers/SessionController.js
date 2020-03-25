import connection from "../../database/connection";

export default {
  async store(req, res) {
    const { id } = req.body;

    const ong = await connection("ongs").where("id", id).select("name").first();

    if (!ong) {
      return res.status(404).json({ message: "ONG não encontrada." });
    }

    return res.status(200).json({ ong });
  },
};
