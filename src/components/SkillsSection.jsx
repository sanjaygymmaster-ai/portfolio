import { useEffect, useRef, useState } from 'react';

const skills = [
  { name: 'HTML', percentage: 92 },
  { name: 'CSS', percentage: 88 },
  { name: 'JavaScript', percentage: 86 },
  { name: 'React', percentage: 84 },
  { name: 'Node', percentage: 78 },
];

function SkillCard({ name, percentage, active, index }) {
  return (
    <article
      className={`skill-card${active ? ' is-active' : ''}`}
      style={{ animationDelay: `${index * 110}ms` }}
    >
      <div
        className="skill-ring"
        style={{ '--progress': `${percentage}%` }}
        aria-label={`${name} proficiency ${percentage}%`}
      >
        <div className="skill-ring-core">
          <strong>{percentage}%</strong>
        </div>
      </div>

      <div className="skill-copy">
        <h3>{name}</h3>
        <div className="skill-bar-track" aria-hidden="true">
          <span
            className="skill-bar-fill"
            style={{ '--bar-width': active ? `${percentage}%` : '0%' }}
          />
        </div>
      </div>
    </article>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`skills-section${isVisible ? ' is-visible' : ''}`}
      id="skills"
      aria-labelledby="skills-title"
    >
      <div className="skills-header">
        <div className="section-copy">
          <p className="section-kicker">Core skills</p>
          <h2 id="skills-title">Tools and technologies I use to build real products.</h2>
          <p className="section-description">
            A quick view of my current frontend and backend strengths, shown with
            animated progress indicators once the section enters the screen.
          </p>
        </div>
      </div>

      <div className="skills-grid">
        {skills.map((skill, index) => (
          <SkillCard
            key={skill.name}
            name={skill.name}
            percentage={skill.percentage}
            active={isVisible}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
