export function generateBreadcrumbItems(params, type) {
  const items = [
    { title: 'Home', href: '/' },
    { title: type === 'bike' ? 'Used Bikes' : 'Used Cars', href: `/used-${type}s/search/-` }
  ];

  if (!params?.slug) return items;

  // Extract city if present
  const cityFilter = params.slug.find(item => item.startsWith('ct_'));
  const city = cityFilter ? decodeURIComponent(cityFilter.replace('ct_', '')).replace(/%20/g, ' ') : '';

  // Extract make filter
  const makeFilter = params.slug.find(item => item.startsWith('mk_'));
  const make = makeFilter ? decodeURIComponent(makeFilter.replace('mk_', '')).replace(/%20/g, ' ') : '';

  // Extract model filter
  const modelFilter = params.slug.find(item => item.startsWith('md_'));
  const model = modelFilter ? decodeURIComponent(modelFilter.replace('md_', '')).replace(/%20/g, ' ') : '';

  // Add city level if present
  if (city) {
    items.push({ 
      title: `${type === 'bike' ? 'Bikes' : 'Cars'} in ${city}`, 
      href: `/used-${type}s/search/-/ct_${encodeURIComponent(city)}` 
    });
  }

  // Add make level if present
  if (make) {
    items.push({
      title: `${make} ${type === 'bike' ? 'Bikes' : 'Cars'}${city ? ` in ${city}` : ''}`,
      href: `/used-${type}s/search/-${cityFilter ? '/ct_' + encodeURIComponent(city) : ''}/mk_${encodeURIComponent(make)}`
    });
  }

  // Add model level if present
  if (model && make) {
    items.push({
      title: `${make} ${model}${city ? ` in ${city}` : ''}`,
      href: `/used-${type}s/search/-${cityFilter ? '/ct_' + encodeURIComponent(city) : ''}/mk_${encodeURIComponent(make)}/md_${encodeURIComponent(model)}`
    });
  }

  return items;
} 