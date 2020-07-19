import React, {
  useState,
  useCallback,
  ChangeEvent,
  KeyboardEvent,
  useEffect,
} from "react";

import socket from "socket.io-client";

import twitterLogo from "../../assets/twitter.svg";
import Tweet from "../../components/Tweet";
import api from "../../services/api";

import "./timeline.css";

interface TweetProps {
  likes: string[];
  _id: string;
  author: string;
  content: string;
  created_at: string;
}

const Timeline: React.FC = () => {
  const [newTweet, setNewTweet] = useState("");
  const [tweets, setTweets] = useState<TweetProps[]>([]);

  useEffect(() => {
    async function loadTweets(): Promise<void> {
      const response = await api.get("tweets");

      setTweets(response.data);
    }

    loadTweets();
  }, []);

  const subscribeToEvents = useCallback(() => {
    const io = socket("http://localhost:3333");

    io.on("tweet:new", (data: TweetProps) => {
      setTweets(state => [data, ...state]);
    });

    io.on("tweet:like", (data: TweetProps) => {
      setTweets(state =>
        state.map(tweet => (tweet._id === data._id ? data : tweet)),
      );
    });

    io.on("tweet:dislike", (data: TweetProps) => {
      setTweets(state =>
        state.map(tweet => (tweet._id === data._id ? data : tweet)),
      );
    });
  }, []);

  useEffect(() => {
    subscribeToEvents();
  }, [subscribeToEvents]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setNewTweet(event.target.value);
    },
    [],
  );

  const handleNewTweet = useCallback(
    async (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.keyCode !== 13) {
        return;
      }

      const author = localStorage.getItem("@GoTwitter:username");

      await api.post("tweets", {
        author,
        content: newTweet,
      });

      setNewTweet("");
    },
    [newTweet],
  );

  return (
    <div className="timeline-wrapper">
      <img src={twitterLogo} alt="GoTwitter" />

      <form>
        <textarea
          placeholder="O que está acontecendo ?"
          value={newTweet}
          onChange={handleInputChange}
          onKeyDown={handleNewTweet}
        />
      </form>

      <ul className="tweet-list">
        {tweets.map(tweet => (
          <Tweet key={tweet._id} tweet={tweet} />
        ))}
      </ul>
    </div>
  );
};

export default Timeline;
