import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

function ensureAnalyticsScript() {
  if (!measurementId || document.getElementById('ga-script')) {
    return;
  }

  const script = document.createElement('script');
  script.id = 'ga-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, { send_page_view: false });
}

export function usePageAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (!measurementId) {
      return;
    }

    ensureAnalyticsScript();

    window.gtag?.('config', measurementId, {
      page_path: `${location.pathname}${location.search}${location.hash}`,
      page_title: document.title,
    });
  }, [location]);
}
