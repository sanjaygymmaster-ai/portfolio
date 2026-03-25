import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useProjects } from '../hooks/useProjects';

const ADMIN_STORAGE_KEY = 'isAdmin';
const ADMIN_PASSWORD = 'sanjay123';

const emptyForm = {
  title: '',
  description: '',
  image: '',
  live: '',
  github: '',
  learned: '',
};

const emptyLoginForm = {
  password: '',
};

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function ProjectImage({ title, image }) {
  return (
    <div className="project-image-wrap">
      <img
        className="project-image"
        src={image}
        alt={`${title} preview`}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.style.display = 'none';
          event.currentTarget.parentElement?.classList.add('image-fallback');
        }}
      />
      <span className="image-overlay" aria-hidden="true" />
    </div>
  );
}

function AddProjectModal({
  formData,
  errors,
  onChange,
  onClose,
  onSubmit,
}) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-project-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <p className="modal-kicker">New project</p>
            <h2 id="add-project-title">Add Project</h2>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close modal">
            x
          </button>
        </div>

        <form className="modal-form" onSubmit={onSubmit}>
          <label className="field">
            <span>Project Title</span>
            <input
              name="title"
              value={formData.title}
              onChange={onChange}
              placeholder="Project name"
            />
            {errors.title ? <small>{errors.title}</small> : null}
          </label>

          <label className="field">
            <span>Description</span>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={onChange}
              placeholder="Short project summary"
            />
            {errors.description ? <small>{errors.description}</small> : null}
          </label>

          <label className="field">
            <span>Image URL</span>
            <input
              name="image"
              value={formData.image}
              onChange={onChange}
              placeholder="https://example.com/project-image.png"
            />
            {errors.image ? <small>{errors.image}</small> : null}
          </label>

          <div className="field-grid">
            <label className="field">
              <span>Live Demo Link</span>
              <input
                name="live"
                value={formData.live}
                onChange={onChange}
                placeholder="https://your-demo.com"
              />
              {errors.live ? <small>{errors.live}</small> : null}
            </label>

            <label className="field">
              <span>GitHub Link</span>
              <input
                name="github"
                value={formData.github}
                onChange={onChange}
                placeholder="https://github.com/you/repo"
              />
              {errors.github ? <small>{errors.github}</small> : null}
            </label>
          </div>

          <label className="field">
            <span>What I Learned</span>
            <input
              name="learned"
              value={formData.learned}
              onChange={onChange}
              placeholder="Authentication, API integration, UI design"
            />
            {errors.learned ? <small>{errors.learned}</small> : null}
          </label>

          <div className="modal-actions">
            <button type="button" className="project-button project-button-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="project-button project-button-primary">
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AdminLoginModal({
  formData,
  error,
  onChange,
  onClose,
  onSubmit,
}) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="project-modal admin-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-login-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <p className="modal-kicker">Admin access</p>
            <h2 id="admin-login-title">Admin Login</h2>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close modal">
            x
          </button>
        </div>

        <form className="modal-form" onSubmit={onSubmit}>
          <label className="field">
            <span>Password</span>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={onChange}
              placeholder="Enter admin password"
            />
            {error ? <small>{error}</small> : null}
          </label>

          <div className="modal-actions">
            <button type="button" className="project-button project-button-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="project-button project-button-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const navigate = useNavigate();
  const [projects, setProjects] = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [loginForm, setLoginForm] = useState(emptyLoginForm);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const savedAdminState = window.localStorage.getItem(ADMIN_STORAGE_KEY);
    setIsAdmin(savedAdminState === 'true');
  }, []);

  useEffect(() => {
    window.localStorage.setItem(ADMIN_STORAGE_KEY, String(isAdmin));
  }, [isAdmin]);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setFormData(emptyForm);
    setErrors({});
  }

  function handleOpenLoginModal() {
    setIsLoginModalOpen(true);
  }

  function handleCloseLoginModal() {
    setIsLoginModalOpen(false);
    setLoginForm(emptyLoginForm);
    setLoginError('');
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => {
      if (!current[name]) {
        return current;
      }

      const nextErrors = { ...current };
      delete nextErrors[name];
      return nextErrors;
    });
  }

  function handleLoginChange(event) {
    const { name, value } = event.target;

    setLoginForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (loginError) {
      setLoginError('');
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {};

    if (!formData.title.trim()) {
      nextErrors.title = 'Project title is required.';
    }

    if (!formData.description.trim()) {
      nextErrors.description = 'Description is required.';
    }

    if (!formData.image.trim()) {
      nextErrors.image = 'Image URL is required.';
    }

    if (!formData.live.trim()) {
      nextErrors.live = 'Live demo link is required.';
    }

    if (!formData.github.trim()) {
      nextErrors.github = 'GitHub link is required.';
    }

    const learnedItems = formData.learned
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    if (learnedItems.length === 0) {
      nextErrors.learned = 'Add at least one learning point.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const newProject = {
      id: `${slugify(formData.title)}-${Date.now()}`,
      title: formData.title.trim(),
      description: formData.description.trim(),
      fullDescription: formData.description.trim(),
      image: formData.image.trim(),
      screenshots: [formData.image.trim()],
      live: formData.live.trim(),
      github: formData.github.trim(),
      learned: learnedItems,
      techStack: ['React', 'JavaScript'],
      problemsFaced: ['Project setup and feature planning'],
      solutions: ['Built an iterative workflow and shipped a working first version'],
      tag: 'New Launch',
    };

    setProjects((current) => [newProject, ...current]);
    handleCloseModal();
  }

  function handleLoginSubmit(event) {
    event.preventDefault();

    if (loginForm.password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      handleCloseLoginModal();
      return;
    }

    setLoginError('Incorrect password.');
  }

  function handleDelete(projectId) {
    setProjects((current) => current.filter((project) => project.id !== projectId));
  }

  return (
    <>
      <section className="projects-section" id="projects" aria-labelledby="projects-title">
        <div className="section-hero">
          <div className="section-copy">
            <p className="section-kicker">Some of my recent work</p>
            <h1 id="projects-title">
              My Projects <span aria-hidden="true">{'\u{1F680}'}</span>
            </h1>
            <p className="section-description">
              A curated set of products shaped with clean UI, practical frontend
              architecture, and a stronger focus on product feel than generic
              portfolio cards.
            </p>
          </div>

          <div className="hero-panel" aria-label="Projects overview">
            <div className="hero-panel-top">
              <div className="hero-stat">
                <span className="hero-stat-value">{String(projects.length).padStart(2, '0')}</span>
                <span className="hero-stat-label">featured builds</span>
              </div>

              <div className="projects-admin-actions">
                <button type="button" className="admin-login-button" onClick={handleOpenLoginModal}>
                  {isAdmin ? 'Admin Mode' : 'Admin Login'}
                </button>
                {isAdmin ? (
                  <button type="button" className="add-project-button" onClick={handleOpenModal}>
                    + Add Project
                  </button>
                ) : null}
              </div>
            </div>

            <div className="hero-stat">
              <span className="hero-stat-value">UI + Logic</span>
              <span className="hero-stat-label">end-to-end execution</span>
            </div>
            <div className="hero-orb" aria-hidden="true" />
          </div>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <article
              className="project-card"
              key={project.id}
              style={{ animationDelay: `${index * 120}ms` }}
              onClick={() => navigate(`/project/${project.id}`)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  navigate(`/project/${project.id}`);
                }
              }}
              role="link"
              tabIndex={0}
            >
              <ProjectImage title={project.title} image={project.image} />

              <div className="project-body">
                <div className="project-meta">
                  <span className="project-tag">{project.tag}</span>
                  <div className="project-meta-actions">
                    <span className="project-number">0{index + 1}</span>
                    {isAdmin ? (
                      <button
                        type="button"
                        className="delete-project-button"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleDelete(project.id);
                        }}
                        aria-label={`Delete ${project.title}`}
                      >
                        Delete
                      </button>
                    ) : null}
                  </div>
                </div>

                <div className="project-text">
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                </div>

                <div className="project-actions">
                  <a
                    className="project-button project-button-primary"
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => event.stopPropagation()}
                  >
                    Live Demo
                  </a>
                  <a
                    className="project-button project-button-secondary"
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => event.stopPropagation()}
                  >
                    GitHub
                  </a>
                </div>

                <div className="learned-panel">
                  <h3>What I Learned</h3>
                  <ul>
                    {project.learned.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {isModalOpen ? (
        <AddProjectModal
          formData={formData}
          errors={errors}
          onChange={handleChange}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />
      ) : null}

      {isLoginModalOpen ? (
        <AdminLoginModal
          formData={loginForm}
          error={loginError}
          onChange={handleLoginChange}
          onClose={handleCloseLoginModal}
          onSubmit={handleLoginSubmit}
        />
      ) : null}
    </>
  );
}
