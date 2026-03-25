import { useEffect, useState } from 'react';

const REQUESTS_STORAGE_KEY = 'website-requests';

const initialRequestForm = {
  name: '',
  phone: '',
  email: '',
  websiteType: '',
  budget: '',
  description: '',
};

const typingPhrases = ['I build apps...', 'I solve problems...', 'I use AI...'];

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A2.02 2.02 0 1 0 5.3 7.04 2.02 2.02 0 0 0 5.25 3Zm15.19 9.88c0-3.46-1.85-5.07-4.33-5.07-2 0-2.9 1.1-3.4 1.87V8.5H9.33c.04.79 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.68.13-.92.27-.68.9-1.38 1.96-1.38 1.38 0 1.93 1.04 1.93 2.57V20h3.38v-7.12Z"
        fill="currentColor"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 .5C5.65.5.5 5.73.5 12.2c0 5.18 3.3 9.58 7.9 11.13.58.1.79-.25.79-.57 0-.28-.01-1.02-.02-2-3.22.72-3.9-1.58-3.9-1.58-.53-1.36-1.3-1.72-1.3-1.72-1.06-.74.08-.72.08-.72 1.17.09 1.79 1.22 1.79 1.22 1.05 1.83 2.76 1.3 3.43 1 .1-.78.41-1.3.74-1.6-2.57-.3-5.27-1.31-5.27-5.83 0-1.29.46-2.34 1.2-3.16-.12-.3-.52-1.5.11-3.12 0 0 .98-.32 3.2 1.21a10.9 10.9 0 0 1 5.82 0c2.22-1.53 3.2-1.21 3.2-1.21.63 1.62.23 2.82.11 3.12.75.82 1.2 1.87 1.2 3.16 0 4.53-2.7 5.52-5.28 5.82.42.37.79 1.08.79 2.19 0 1.58-.02 2.86-.02 3.25 0 .32.2.68.8.57 4.59-1.55 7.88-5.95 7.88-11.13C23.5 5.73 18.35.5 12 .5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function WebsiteRequestModal({
  formData,
  errors,
  successMessage,
  onChange,
  onClose,
  onSubmit,
}) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="project-modal request-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="website-request-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <p className="modal-kicker">Website request</p>
            <h2 id="website-request-title">Get Your Website</h2>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close modal">
            x
          </button>
        </div>

        <form className="modal-form" onSubmit={onSubmit}>
          <div className="field-grid">
            <label className="field">
              <span>Name</span>
              <input
                name="name"
                value={formData.name}
                onChange={onChange}
                placeholder="Your full name"
              />
              {errors.name ? <small>{errors.name}</small> : null}
            </label>

            <label className="field">
              <span>Phone Number</span>
              <input
                name="phone"
                value={formData.phone}
                onChange={onChange}
                placeholder="+91 98765 43210"
              />
              {errors.phone ? <small>{errors.phone}</small> : null}
            </label>
          </div>

          <div className="field-grid">
            <label className="field">
              <span>Email</span>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={onChange}
                placeholder="you@example.com"
              />
              {errors.email ? <small>{errors.email}</small> : null}
            </label>

            <label className="field">
              <span>Type of Website</span>
              <select name="websiteType" value={formData.websiteType} onChange={onChange}>
                <option value="">Select a website type</option>
                <option value="Portfolio">Portfolio</option>
                <option value="Business">Business</option>
                <option value="E-commerce">E-commerce</option>
              </select>
              {errors.websiteType ? <small>{errors.websiteType}</small> : null}
            </label>
          </div>

          <label className="field">
            <span>Budget</span>
            <input
              name="budget"
              value={formData.budget}
              onChange={onChange}
              placeholder="Your estimated budget"
            />
            {errors.budget ? <small>{errors.budget}</small> : null}
          </label>

          <label className="field">
            <span>Project Description</span>
            <textarea
              name="description"
              rows="5"
              value={formData.description}
              onChange={onChange}
              placeholder="Describe the website you want to build"
            />
            {errors.description ? <small>{errors.description}</small> : null}
          </label>

          {successMessage ? <p className="success-banner">{successMessage}</p> : null}

          <div className="modal-actions">
            <button type="button" className="project-button project-button-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="project-button project-button-primary">
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestForm, setRequestForm] = useState(initialRequestForm);
  const [requestErrors, setRequestErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = typingPhrases[phraseIndex];
    const isPhraseComplete = typedText === currentPhrase;
    const isPhraseEmpty = typedText === '';

    let delay = 90;

    if (!isDeleting && isPhraseComplete) {
      delay = 1400;
    } else if (isDeleting && !isPhraseEmpty) {
      delay = 45;
    } else if (isDeleting && isPhraseEmpty) {
      delay = 220;
    }

    const timer = window.setTimeout(() => {
      if (!isDeleting && !isPhraseComplete) {
        setTypedText(currentPhrase.slice(0, typedText.length + 1));
        return;
      }

      if (!isDeleting && isPhraseComplete) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && !isPhraseEmpty) {
        setTypedText(currentPhrase.slice(0, typedText.length - 1));
        return;
      }

      setIsDeleting(false);
      setPhraseIndex((current) => (current + 1) % typingPhrases.length);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [isDeleting, phraseIndex, typedText]);

  function handleOpenRequestModal() {
    setIsRequestModalOpen(true);
  }

  function handleCloseRequestModal() {
    setIsRequestModalOpen(false);
    setRequestErrors({});
    setSuccessMessage('');
    setRequestForm(initialRequestForm);
  }

  function handleRequestChange(event) {
    const { name, value } = event.target;

    setRequestForm((current) => ({
      ...current,
      [name]: value,
    }));

    setRequestErrors((current) => {
      if (!current[name]) {
        return current;
      }

      const nextErrors = { ...current };
      delete nextErrors[name];
      return nextErrors;
    });
  }

  function handleRequestSubmit(event) {
    event.preventDefault();

    const nextErrors = {};

    if (!requestForm.name.trim()) {
      nextErrors.name = 'Name is required.';
    }

    if (!requestForm.phone.trim()) {
      nextErrors.phone = 'Phone number is required.';
    }

    if (!requestForm.email.trim()) {
      nextErrors.email = 'Email is required.';
    }

    if (!requestForm.websiteType.trim()) {
      nextErrors.websiteType = 'Website type is required.';
    }

    if (!requestForm.budget.trim()) {
      nextErrors.budget = 'Budget is required.';
    }

    if (!requestForm.description.trim()) {
      nextErrors.description = 'Project description is required.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setRequestErrors(nextErrors);
      setSuccessMessage('');
      return;
    }

    const existingRequests = JSON.parse(window.localStorage.getItem(REQUESTS_STORAGE_KEY) || '[]');
    const nextRequest = {
      ...requestForm,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };

    window.localStorage.setItem(
      REQUESTS_STORAGE_KEY,
      JSON.stringify([nextRequest, ...existingRequests]),
    );

    setSuccessMessage('\u2705 Request received! We will contact you soon.');
    setRequestErrors({});
    setRequestForm(initialRequestForm);
  }

  return (
    <>
      <section className="hero-section" id="home" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="hero-brand-mark" aria-hidden="true">
            <img src="/sanjay.png" alt="" />
          </div>
          <p className="hero-kicker">AI-powered web experiences</p>
          <h1 id="hero-title">
            Hi, I&apos;m Sanjay <span aria-hidden="true">{'\u{1F44B}'}</span>
          </h1>
          <p className="hero-role">AI + MERN Developer</p>
          <p className="hero-typing" aria-live="polite">
            <span>{typedText}</span>
            <span className="typing-caret" aria-hidden="true" />
          </p>
          <p className="hero-description">
            I build real-world products using AI workflows, React interfaces, and
            full-stack web technologies that move from concept to working launch.
          </p>

          <div className="hero-actions">
            <a className="hero-button hero-button-primary" href="#projects">
              View Projects
            </a>
            <a className="hero-button hero-button-secondary" href="mailto:sanjay@example.com">
              Contact Me
            </a>
            <button type="button" className="hero-button hero-button-glow" onClick={handleOpenRequestModal}>
              {'\u{1F680}'} Get Your Website
            </button>
          </div>

          <div className="hero-socials" aria-label="Social links">
            <a
              className="social-link"
              href="https://www.linkedin.com/in/sanjay-sundar-b1a5503b2?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
              <span>LinkedIn</span>
            </a>
            <a
              className="social-link"
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <GitHubIcon />
              <span>GitHub</span>
            </a>
          </div>

          <a className="scroll-indicator" href="#projects" aria-label="Scroll to projects">
            <span className="scroll-mouse" aria-hidden="true">
              <span className="scroll-dot" />
            </span>
            <span>Scroll down</span>
          </a>
        </div>

        <div className="hero-visual">
          <div className="profile-shell">
            <div className="profile-badge">Available for freelance</div>
            <div className="profile-frame">
              <img
                className="profile-image"
                src="/profile.jpg"
                alt="Sanjay portrait"
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                  event.currentTarget.parentElement?.classList.add('profile-fallback');
                }}
              />
            </div>
            <div className="profile-card profile-card-top">
              <span>Shipping ideas into polished products</span>
            </div>
            <div className="profile-card profile-card-bottom">
              <strong>MERN + AI</strong>
              <span>Interfaces, APIs, automation</span>
            </div>
          </div>
        </div>
      </section>

      {isRequestModalOpen ? (
        <WebsiteRequestModal
          formData={requestForm}
          errors={requestErrors}
          successMessage={successMessage}
          onChange={handleRequestChange}
          onClose={handleCloseRequestModal}
          onSubmit={handleRequestSubmit}
        />
      ) : null}
    </>
  );
}
