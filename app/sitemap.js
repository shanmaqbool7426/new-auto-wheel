export default async function sitemap() {
  const baseUrl = 'https://www.aussiemotor.com';
  const currentDate = new Date();
  
  // Core static pages
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/used-cars`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/new-cars`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/car-reviews`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/comparison`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bikes`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/auto-parts`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dealers`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // In a real implementation, you would fetch these dynamically from your database
  // This is a simulated example of dynamic routes
  const popularCarBrands = [
    'toyota', 'honda', 'mazda', 'ford', 'hyundai', 
    'kia', 'nissan', 'volkswagen', 'bmw', 'mercedes-benz'
  ];

  const popularCarModels = [
    'corolla', 'camry', 'civic', 'accord', 'mazda3', 
    'cx-5', 'ranger', 'i30', 'cerato', 'golf'
  ];

  // Generate brand pages
  const brandPages = popularCarBrands.map(brand => ({
    url: `${baseUrl}/used-cars/${brand}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Generate model pages (simplified example)
  const modelPages = [];
  popularCarBrands.forEach(brand => {
    popularCarModels.forEach(model => {
      // Only create relevant combinations
      if ((brand === 'toyota' && (model === 'corolla' || model === 'camry')) ||
          (brand === 'honda' && (model === 'civic' || model === 'accord')) ||
          (brand === 'mazda' && (model === 'mazda3' || model === 'cx-5')) ||
          (brand === 'ford' && model === 'ranger') ||
          (brand === 'hyundai' && model === 'i30') ||
          (brand === 'kia' && model === 'cerato') ||
          (brand === 'volkswagen' && model === 'golf')) {
        modelPages.push({
          url: `${baseUrl}/used-cars/${brand}/${model}`,
          lastModified: currentDate,
          changeFrequency: 'weekly',
          priority: 0.6,
        });
      }
    });
  });

  // In a real implementation, you would fetch these from your database
  const blogPosts = [
    { slug: 'best-used-cars-under-10000', date: new Date('2023-11-15') },
    { slug: 'how-to-buy-a-used-car-guide', date: new Date('2023-12-01') },
    { slug: 'electric-vehicles-vs-hybrid-cars', date: new Date('2024-01-10') },
    { slug: 'top-family-cars-of-2024', date: new Date('2024-02-05') },
    { slug: 'car-maintenance-tips-for-winter', date: new Date('2024-03-20') },
  ];

  const blogPages = blogPosts.map(post => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Combine all routes
  return [...staticRoutes, ...brandPages, ...modelPages, ...blogPages];
} 