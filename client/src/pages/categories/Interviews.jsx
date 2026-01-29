import React from "react";
import { Link } from "react-router-dom";
import { interviews } from "../../data/interviews";

export default function Interviews() {
  const posts = interviews.slice(0, 3);
  return (
    <section className="featured-posts" aria-label="Featured posts">
      <h2>Featured Posts</h2>
      <div className="featured-posts-list">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/interviews/${post.slug}`}
            className="featured-post-card"
            style={{
              backgroundImage: `url(${post.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="featured-post-content">
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
