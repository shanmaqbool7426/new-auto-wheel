export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;


console.log("GA_TRACKING_ID",GA_TRACKING_ID);
// Track page views
export const pageview = (url, additionalParams = {}) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
    ...additionalParams
  });

  // Log for debugging
  console.log('GA Pageview:', {
    url,
    ...additionalParams
  });
};

// Track custom events
export const event = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    category: category,
    label: label,
    custom_value: value,
  });

  console.log("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  }); 
};
