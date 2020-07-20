import { Request, Response } from "express";

import Box from "../models/Box";
import File from "../models/File";

class FileController {
  async store(req: Request, res: Response) {
    const { id } = req.params;
    const { file } = req;

    const box = await Box.findById(id);

    if (!box) {
      return res.status(400).json({ message: "Box not found" });
    }

    const fileCreated = await File.create({
      title: file.originalname,
      path: file.filename,
    });

    box.files?.push(fileCreated);

    await box.save();

    req.io.sockets.in(box._id).emit("box:newFile", fileCreated);

    return res.status(201).json(box);
  }
}

export default new FileController();
