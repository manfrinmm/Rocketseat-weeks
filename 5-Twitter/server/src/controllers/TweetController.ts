import { Request, Response } from "express";

import Tweet from "../models/schemas/Tweet";

class TweetController {
  async index(req: Request, res: Response) {
    const tweets = await Tweet.find().sort("-created_at");

    return res.json(tweets);
  }

  async store(req: Request, res: Response) {
    const { author, content } = req.body;

    const tweet = await Tweet.create({ author, content, likes: [] });

    req.io.emit("tweet:new", tweet);

    return res.status(201).json(tweet);
  }
}

export default new TweetController();
