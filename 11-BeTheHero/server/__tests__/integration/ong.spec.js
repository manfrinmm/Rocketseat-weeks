import request from "supertest";

import app from "../../src/app";
import connection from "../../src/database/connection";

describe("ONG", () => {
  afterEach(async () => {
    await connection.migrate.rollback();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create a new ONG", async () => {
    const data = {
      name: "maria",
      email: "maria@teste.com",
      whatsapp: "4213214028922",
      city: "jatai",
      uf: "GO",
    };

    const response = await request(app).post("/ongs").send(data);

    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8);
  });
});
