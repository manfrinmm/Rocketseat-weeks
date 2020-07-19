import { Request, Response } from "express";

import Tweet from "../models/schemas/Tweet";

class DislikeController {
  async store(req: Request, res: Response) {
    const { id } = req.params;
    const { author } = req.body;

    const tweet = await Tweet.findById(id);

    if (!tweet) {
      return res.status(400).json({ message: "Tweet not found" });
    }

    if (!tweet.likes.includes(author)) {
      return res.status(400).json({ message: "Tweet already disliked" });
    }

    tweet.likes = tweet.likes.filter(authorLiked => authorLiked !== author);

    await tweet.save();

    req.io.emit("tweet:dislike", tweet);

    return res.status(201).json(tweet);
  }
}

export default new DislikeController();
