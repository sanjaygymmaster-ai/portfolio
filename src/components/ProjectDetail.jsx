import { Link, useParams } from 'react-router-dom';

import { useProjects } from '../hooks/useProjects';

function ExternalLink({ href, children, variant }) {
  return (
    <a
      className={`project-button ${variant}`}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const [projects] = useProjects();
  const project = projects.find((item) => item.id === id);

  if (!project) {
    return (
      <section className="project-detail-page page-transition">
        <div className="detail-shell not-found-shell">
          <p className="section-kicker">Project not found</p>
          <h1>That project does not exist.</h1>
          <p className="section-description">
            The project may have been removed from local storage or the URL is invalid.
          </p>
          <Link className="hero-button hero-button-primary" to="/">
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="project-detail-page page-transition">
      <div className="detail-shell">
        <div className="detail-topbar">
          <Link className="detail-back" to="/">
            ← Back to portfolio
          </Link>
          <span className="project-tag">{project.tag}</span>
        </div>

        <div className="detail-hero">
          <div className="detail-copy">
            <p className="section-kicker">Project detail</p>
            <h1>{project.title}</h1>
            <p className="section-description">{project.fullDescription || project.description}</p>

            <div className="detail-actions">
              <ExternalLink href={project.live} variant="project-button-primary">
                Live Demo
              </ExternalLink>
              <ExternalLink href={project.github} variant="project-button-secondary">
                GitHub
              </ExternalLink>
            </div>
          </div>

          <div className="detail-preview">
            <img
              src={project.image}
              alt={`${project.title} preview`}
              onError={(event) => {
                event.currentTarget.style.display = 'none';
                event.currentTarget.parentElement?.classList.add('image-fallback');
              }}
            />
          </div>
        </div>

        <div className="detail-grid">
          <article className="detail-card">
            <h2>Screenshots</h2>
            <div className="detail-gallery">
              {project.screenshots?.map((shot, index) => (
                <div className="detail-shot" key={`${shot}-${index}`}>
                  <img
                    src={shot}
                    alt={`${project.title} screenshot ${index + 1}`}
                    onError={(event) => {
                      event.currentTarget.style.display = 'none';
                      event.currentTarget.parentElement?.classList.add('image-fallback');
                    }}
                  />
                </div>
              ))}
            </div>
          </article>

          <article className="detail-card">
            <h2>Tech Stack</h2>
            <div className="tech-stack-list">
              {project.techStack?.map((tech) => (
                <span className="tech-pill" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
          </article>

          <article className="detail-card">
            <h2>Problems Faced</h2>
            <ul className="detail-list">
              {project.problemsFaced?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="detail-card">
            <h2>Solutions</h2>
            <ul className="detail-list">
              {project.solutions?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
