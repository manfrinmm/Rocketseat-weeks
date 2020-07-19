import React, { useCallback, useMemo } from "react";

import like from "../../assets/like.svg";
import liked from "../../assets/liked.svg";
import api from "../../services/api";
import "./tweet.css";

interface TweetProps {
  tweet: {
    likes: string[];
    _id: string;
    author: string;
    content: string;
  };
}

const Tweet: React.FC<TweetProps> = ({ tweet }) => {
  const { _id, author, content, likes } = tweet;

  const handleLike = useCallback(async () => {
    const loggedUser = localStorage.getItem("@GoTwitter:username");

    if (!loggedUser) {
      return;
    }

    let requestRoute;
    if (likes.includes(loggedUser)) {
      requestRoute = `/tweet/${_id}/dislikes`;
    } else {
      requestRoute = `/tweet/${_id}/likes`;
    }

    await api.post(requestRoute, {
      author: loggedUser,
    });
  }, [_id, likes]);

  const likeIcon = useMemo((): string => {
    const loggedUser = localStorage.getItem("@GoTwitter:username");

    if (!loggedUser) {
      return like;
    }

    return likes.includes(loggedUser) ? liked : like;
  }, [likes]);

  return (
    <li className="tweet">
      <strong>{author}</strong>
      <p>{content}</p>
      <button type="button" onClick={handleLike}>
        <img src={likeIcon} alt="like" />
        {likes.length}
      </button>
    </li>
  );
};

export default Tweet;
