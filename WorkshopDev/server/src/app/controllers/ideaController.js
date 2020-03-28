import db from "../../config/database";

export default {
  index(req, res) {
    db.all(`SELECT * FROM ideas`, function(err, rows) {
      if (err) {
        console.log(err);
        return res.send("Erro no banco de dados");
      }

      const reversedIdeas = rows.reverse();

      return res.render("ideias", { ideas: reversedIdeas });
    });
  },

  lastIdeas(req, res) {
    const lastIdeas = [];

    db.all(`SELECT * FROM ideas`, function(err, rows) {
      if (err) {
        console.log(err);
        return res.send("Erro no banco de dados");
      }

      const reversedIdeas = rows.reverse();

      for (let idea of reversedIdeas) {
        if (lastIdeas.length > 2) {
          break;
        }

        lastIdeas.push(idea);
      }

      return res.render("index", {
        lastIdeas
      });
    });
  },

  store(req, res) {
    const inputs = Object.keys(req.body);
    const data = Object.values(req.body);

    const query = `INSERT INTO ideas(${inputs}) VALUES(?,?,?,?,?)`;

    db.run(query, data, function(err) {
      if (err) {
        console.log(err);

        res.status(500).send("Erro no servidor.");
      }

      console.log(this);
    });

    res.redirect("/ideias");
  },
  delete(req, res) {
    const { id } = req.params;

    db.run(`DELETE FROM ideas WHERE id = ${id}`, function(err) {
      if (err) {
        console.log(err);

        return res.status(500).send("Erro ao excluir dado.");
      }

      return res.redirect("/ideias");
    });
  }
};
