import { Link } from 'react-router-dom';

import { blogPosts } from '../data/blogs';

export default function BlogSection() {
  return (
    <section className="blog-section" id="blog" aria-labelledby="blog-title">
      <div className="blog-header">
        <div className="section-copy">
          <p className="section-kicker">Writing</p>
          <h2 id="blog-title">A few notes on design, React, and building products.</h2>
          <p className="section-description">
            Short blog posts that explain how I think about interfaces, AI features,
            and practical product work.
          </p>
        </div>
      </div>

      <div className="blog-grid">
        {blogPosts.map((post, index) => (
          <article className="blog-card" key={post.id} style={{ animationDelay: `${index * 100}ms` }}>
            <div className="blog-meta">
              <span className="project-tag">{post.category}</span>
              <span className="blog-date">{post.date}</span>
            </div>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <Link className="blog-link" to={`/blog/${post.id}`}>
              Read article
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
