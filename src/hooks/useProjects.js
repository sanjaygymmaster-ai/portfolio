import { useEffect, useState } from 'react';

import { initialProjects, STORAGE_KEY } from '../data/projects';

export function useProjects() {
  const [projects, setProjects] = useState(initialProjects);

  useEffect(() => {
    const savedProjects = window.localStorage.getItem(STORAGE_KEY);

    if (!savedProjects) {
      return;
    }

    try {
      const parsedProjects = JSON.parse(savedProjects);

      if (Array.isArray(parsedProjects) && parsedProjects.length > 0) {
        setProjects(parsedProjects);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  return [projects, setProjects];
}
