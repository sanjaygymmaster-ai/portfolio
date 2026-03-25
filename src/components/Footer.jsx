import { useEffect, useState } from 'react';

const countNamespace = import.meta.env.VITE_COUNTAPI_NAMESPACE || 'sanjay-portfolio';
const countKey = import.meta.env.VITE_COUNTAPI_KEY || 'visits';

export default function Footer() {
  const [visits, setVisits] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadCount() {
      try {
        const response = await fetch(`https://api.countapi.xyz/hit/${countNamespace}/${countKey}`);
        const data = await response.json();

        if (!ignore && typeof data.value === 'number') {
          setVisits(data.value);
        }
      } catch {
        if (!ignore) {
          setVisits(null);
        }
      }
    }

    loadCount();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <footer className="site-footer">
      <p>
        <span>👀 {visits ?? '--'} visits</span>
        <span className="footer-separator">•</span>
        <span>Built with React + Analytics</span>
      </p>
    </footer>
  );
}
