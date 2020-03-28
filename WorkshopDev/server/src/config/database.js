const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db");

db.serialize(() => {
  // Criar a tabela
  // db.run(`CREATE TABLE IF NOT EXISTS ideas(
  //   id INTEGER PRIMARY KEY AUTOINCREMENT,
  //   title TEXT ,
  //   category TEXT,
  //   img_url TEXT,
  //   description TEXT,
  //   idea_url TEXT
  //  );`);

  // Inserir dados na tabela
  // db.run(`INSET INTO ideas(

  // ) VALUES();`);

  const query = `INSERT INTO ideas(
    title,
    category,
    img_url,
    description,
    idea_url
  )
  VALUES(?,?,?,?,?);`;

  const values = [
    "MAIOOORursos de programação",
    "Estudo",
    "https://image.flaticon.com/icons/svg/2728/2728995.svg",
    "Descrição da ideia tal",
    "https://www.google.com"
  ];

  // db.run(query, values, function(err) {
  //   err ? console.log(err) : console.log(this);
  // });

  // Deletar dados na tabela
  // db.run(`DELETE FROM ideas WHERE id = ?`, [1], err => {
  //   err ? console.log("err") : console.log("Deletado");
  // });

  // Consultar dados na tabela
  // db.all(`SELECT * FROM ideas`, (err, rows) => {
  //   err ? console.log(err) : console.log(rows);
  // });
});

export default db;
