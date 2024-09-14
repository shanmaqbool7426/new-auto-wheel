const typeMapping = {
  cars: 'car',
  bikes: 'bike',
  trucks: 'truck',
};


export const formatPrice = (price) => {
    return price?.toFixed()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  

  // Utility function to calculate the time ago string
export const getTimeAgo = (lastUpdateDate) => {
    const timeDiff = new Date() - new Date(lastUpdateDate);
    const minutes = Math.floor(timeDiff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
  
    if (years > 0) return `Updated ${years} year${years > 1 ? "s" : ""} ago`;
    if (months > 0) return `Updated ${months} month${months > 1 ? "s" : ""} ago`;
    if (days > 0) return `Updated ${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `Updated ${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `Updated ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  
    return "Updated just now";
  };

  export const formatDate=(dateString)=> {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}
  

export const reorderSlug = (slug,view,sortBy) => {
  const basePath = slug[0];
  const makes = slug.filter((item) => item.startsWith('mk_'));
  const models = slug.filter((item) => item.startsWith('md_'));
  const cities = slug.filter((item) => item.startsWith('ct_'));
  const bodyType = slug.filter((item) => item.startsWith('bt_'));
  const page = slug.find((item) => item.startsWith('page_'));
  const price = slug.find((item) => item.startsWith('pr_'));
  const year = slug.find((item) => item.startsWith('yr_'));
  const mileage = slug.find((item) => item.startsWith('ml_'));
  const transmission = slug.find((item) => item.startsWith('tr_'));
  const drive = slug.find((item) => item.startsWith('dr_'));
  const exteriorColor = slug.find((item) => item.startsWith('cl_'));
  const fuelType = slug.find((item) => item.startsWith('ft_'));
  const condition = slug.find((item) => item.startsWith('cn_'));
  const featured = slug.find((item) => item.startsWith('ft_'));

  const dynamicSlug = [
      `t_${typeMapping[basePath]}`,
      ...makes,
      ...models,
      ...cities,
      ...bodyType,
      page,
      price,
      year,
      mileage,
      transmission,
      drive,
      exteriorColor,
      fuelType,
      condition,
      featured,
      sortBy
  ].filter(Boolean);

  return `/${dynamicSlug.join('/')}`;
};
 
export const formatToLacOrCrore = (value) => {
  if (value >= 10000000) { 
    return (value / 10000000).toFixed(1) + ' crore';
  } else if (value >= 100000) { 
    return (value / 100000).toFixed(1) + ' lac';
  }
  return  value?.toString() ?? 0; 
};



export const formatToMonthYear=(dateString)=> {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long' };
  return date.toLocaleDateString('en-US', options);
}


// utils/filterUtils.js

export const updateFiltersInUrl = (updatedFilters, type, searchParams,router) => {
  console.log(' ',type  )
  let customUrl = `/listing/${type}/search/-/`;
  Object.entries(updatedFilters).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      if (key === "make") [...new Set(value)].forEach(make => customUrl += `mk_${make.toLowerCase()}/`);
      if (key === "model") [...new Set(value)].forEach(model => customUrl += `md_${model.toLowerCase()}/`);
      if (key === "city") [...new Set(value)].forEach(city => customUrl += `ct_${city.toLowerCase()}/`);
      if (key === "bodyType") [...new Set(value)].forEach(bodyType => customUrl += `bt_${bodyType.toLowerCase()}/`);
      if (key === "price" && (value[0] !== 0 || value[1] !== 2000000000)) {
        customUrl += `pr_${value[0]}_${value[1]}/`;
      }
      if (key === "year" && (value[0] !== 2000 || value[1] !== 2024)) {
        customUrl += `yr_${value[0]}_${value[1]}/`;
      }
      if (key === "mileage" && (value[0] !== 0 || value[1] !== 2000000)) {
        customUrl += `ml_${value[0]}_${value[1]}/`;
      }
    } else if (typeof value === "string" && value) {
      if (key === "query") customUrl += `q_${value}/`;
      if (["condition", "transmission", "drive", "exteriorColor", "fuelType"].includes(key)) {
        customUrl += `${value}/`;
      }
      if (key === "view") customUrl += `view_${value}/`;
    } else if (typeof value === "number") {
      if (key === "page") customUrl += `page_${value}/`;
    }
  });
  const queryString = searchParams.toString();
  console.log('>>>>>',customUrl)
  router.push(queryString ? `${customUrl}?${queryString}` : customUrl, { scroll: false });
};

export const updateFilters = (prevFilters, type,filterName, value, isChecked, debounceTimeoutRef,searchParams,router) => {
  let updatedFilterValue;

  if (["make", "city", "model", "bodyType"].includes(filterName)) {
    const encodedValue = encodeURIComponent(value);
    if (isChecked) {
      updatedFilterValue = Array.from(new Set([...prevFilters[filterName], encodedValue]));
    } else {
      updatedFilterValue = prevFilters[filterName].filter(item => item !== encodedValue);
    }
  } else {
    updatedFilterValue = value;
  }

  const updatedFilters = {
    ...prevFilters,
    [filterName]: updatedFilterValue,
  };

  // if (debounceTimeoutRef.current) {
  //   clearTimeout(debounceTimeoutRef.current);
  // }

  // debounceTimeoutRef.current = setTimeout(() => {

    console.log('updatedFilters',updatedFilters)
    updateFiltersInUrl(updatedFilters,type, searchParams, router);
  // }, 600);

  return updatedFilters;
};
