import { Request, Response } from "express";

import Box from "../models/Box";

class BoxController {
  async store(req: Request, res: Response) {
    const { title } = req.body;

    const box = await Box.create({
      title,
    });

    return res.status(201).json(box);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const box = await Box.findById(id).populate({
      path: "files",
      options: { sort: "-created_at" },
    });

    return res.json(box);
  }
}

export default new BoxController();
