import { Link, useParams } from 'react-router-dom';

import { blogPosts } from '../data/blogs';

export default function BlogDetail() {
  const { id } = useParams();
  const post = blogPosts.find((item) => item.id === id);

  if (!post) {
    return (
      <section className="blog-detail-page page-transition">
        <div className="detail-shell not-found-shell">
          <p className="section-kicker">Blog not found</p>
          <h1>That article does not exist.</h1>
          <p className="section-description">The URL may be invalid or the post was removed.</p>
          <Link className="hero-button hero-button-primary" to="/">
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="blog-detail-page page-transition">
      <article className="blog-detail-shell">
        <Link className="detail-back" to="/">
          ← Back to portfolio
        </Link>

        <header className="blog-detail-header">
          <div className="blog-meta">
            <span className="project-tag">{post.category}</span>
            <span className="blog-date">{post.date}</span>
          </div>
          <h1>{post.title}</h1>
          <p className="section-description">{post.description}</p>
        </header>

        <div className="blog-detail-content">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </section>
  );
}
