const typeMapping = {
  cars: "car",
  bikes: "bike",
  trucks: "truck",
};

export const formatPrice = (price) => {
  return price?.toFixed()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatPriceInFactors = (price) => {
  if (price >= 1_000_000_000) {
    return (price / 1_000_000_000).toFixed(2) + "B"; // Billions
  } else if (price >= 1_000_000) {
    return (price / 1_000_000).toFixed(2) + "M"; // Millions
  } else {
    return price.toString(); // Less than a million
  }
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
  if (minutes > 0)
    return `Updated ${minutes} minute${minutes > 1 ? "s" : ""} ago`;

  return "Updated just now";
};

export const TimeAgo = (lastUpdateDate) => {
  const timeDiff = new Date() - new Date(lastUpdateDate);
  const minutes = Math.floor(timeDiff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

  return "just now";
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export const reorderSlug = (slug = [], view, sortBy) => {
  if (!slug || slug.length === 0) {
    return '-';
  }

  const dynamicSlug = [];
  const filters = {
    makes: [],
    models: [],
    variants: [],
    cities: [],
    cityAreas: [],
    bodyTypes: [],
    price: null,
    year: null,
    mileage: null,
    transmission: null,
    drive: null,
    exteriorColor: null,
    fuelType: null,
    condition: null,
    query: null,
  };

  // Process each segment of the slug
  slug.forEach((segment) => {
    if (segment === '-') return;

    const [prefix, ...rest] = segment.split('_');
    const value = rest.join('_');

    switch (prefix) {
      case 'mk':
        filters.makes.push(value);
        break;
      case 'md':
        filters.models.push(value);
        break;
      case 'vt':
        filters.variants.push(value);
        break;
      case 'ct':
        filters.cities.push(value);
        break;
      case 'ca':
        filters.cityAreas.push(value);
        break;
      case 'bt':
        filters.bodyTypes.push(value);
        break;
      case 'pr':
        filters.price = value;
        break;
      case 'yr':
        filters.year = value;
        break;
      case 'ml':
        filters.mileage = value;
        break;
      case 'tr':
        filters.transmission = value;
        break;
      case 'dr':
        filters.drive = value;
        break;
      case 'cl':
        filters.exteriorColor = value;
        break;
      case 'ft':
        filters.fuelType = value;
        break;
      case 'cn':
        filters.condition = value;
        break;
      case 'q':
        filters.query = value;
        break;
    }
  });

  // Build the dynamic slug in the correct order
  dynamicSlug.push('-');

  if (filters.makes.length) {
    filters.makes.forEach(make => dynamicSlug.push(`mk_${make}`));
  }
  if (filters.models.length) {
    filters.models.forEach(model => dynamicSlug.push(`md_${model}`));
  }
  if (filters.variants.length) {
    filters.variants.forEach(variant => dynamicSlug.push(`vt_${variant}`));
  }
  if (filters.cities.length) {
    filters.cities.forEach(city => dynamicSlug.push(`ct_${city}`));
  }
  if (filters.cityAreas.length) {
    filters.cityAreas.forEach(area => dynamicSlug.push(`ca_${area}`));
  }
  if (filters.bodyTypes.length) {
    filters.bodyTypes.forEach(type => dynamicSlug.push(`bt_${type}`));
  }
  if (filters.price) dynamicSlug.push(`pr_${filters.price}`);
  if (filters.year) dynamicSlug.push(`yr_${filters.year}`);
  if (filters.mileage) dynamicSlug.push(`ml_${filters.mileage}`);
  if (filters.transmission) dynamicSlug.push(`tr_${filters.transmission}`);
  if (filters.drive) dynamicSlug.push(`dr_${filters.drive}`);
  if (filters.exteriorColor) dynamicSlug.push(`cl_${filters.exteriorColor}`);
  if (filters.fuelType) dynamicSlug.push(`ft_${filters.fuelType}`);
  if (filters.condition) dynamicSlug.push(`cn_${filters.condition}`);
  if (filters.query) dynamicSlug.push(`q_${filters.query}`);
  if (sortBy) dynamicSlug.push(sortBy);

  return dynamicSlug.join('/');
};

export const getBreadCrumbMake = (slug) => {
  const makes = slug
    .filter((item) => item.startsWith("mk_")) // Filter items that start with "mk_"
    .map((item) => item.replace("mk_", "")); // Remove the "mk_" prefix
  return makes.join(", "); // Return as comma-separated string
};

export const reorderSlugNew = (slug, view, sortBy, type) => {
  const makes = slug.filter((item) => item.startsWith("mk_"));
  const models = slug.filter((item) => item.startsWith("md_"));
  const variants = slug.filter((item) => item.startsWith("vt_"));
  const cities = slug.filter((item) => item.startsWith("ct_"));
  const bodyType = slug.filter((item) => item.startsWith("bt_"));
  const page = slug.find((item) => item.startsWith("page_"));
  const price = slug.find((item) => item.startsWith("pr_"));
  const year = slug.find((item) => item.startsWith("yr_"));
  const mileage = slug.find((item) => item.startsWith("ml_"));
  const transmission = slug.find((item) => item.startsWith("tr_"));
  const drive = slug.find((item) => item.startsWith("dr_"));
  const exteriorColor = slug.find((item) => item.startsWith("cl_"));
  const fuelType = slug.find((item) => item.startsWith("ft_"));
  const condition = slug.find((item) => item.startsWith("cn_"));
  const featured = slug.find((item) => item.startsWith("ft_"));
  const address = slug.find((item) => item.startsWith("ad_"));

  const dynamicSlug = [
    `t_${type}`,
    ...makes,
    ...models,
    ...variants,
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
    address,
    sortBy,
  ].filter(Boolean);

  return `/${dynamicSlug.join("/")}`;
};

export const formatToLacOrCrore = (value) => {
  if (value >= 10000000) {
    return (value / 10000000).toFixed(1) + " crore";
  } else if (value >= 100000) {
    return (value / 100000).toFixed(1) + " ";
  }
  return value?.toString() ?? 0;
};

export const formatToMonthYear = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long" };
  return date.toLocaleDateString("en-US", options);
};

// utils/filterUtils.js

export const updateFiltersInUrl = (
  updatedFilters,
  type,
  searchParams,
  router
) => {
  let customUrl = `/listing/${type}/search/-/`;
  Object.entries(updatedFilters).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      if (key === "make")
        [...new Set(value)].forEach(
          (make) => (customUrl += `mk_${make.toLowerCase()}/`)
        );
      if (key === "model")
        [...new Set(value)].forEach(
          (model) => (customUrl += `md_${model.toLowerCase()}/`)
        );
      if (key === "city")
        [...new Set(value)].forEach(
          (city) => (customUrl += `ct_${city.toLowerCase()}/`)
        );
      if (key === "bodyType")
        [...new Set(value)].forEach(
          (bodyType) => (customUrl += `bt_${bodyType.toLowerCase()}/`)
        );
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
      if (
        [
          "condition",
          "transmission",
          "drive",
          "exteriorColor",
          "fuelType",
        ].includes(key)
      ) {
        customUrl += `${value}/`;
      }
      if (key === "view") customUrl += `view_${value}/`;
    } else if (typeof value === "number") {
      if (key === "page") customUrl += `page_${value}/`;
    }
  });
  const queryString = searchParams.toString();
  router.push(queryString ? `${customUrl}?${queryString}` : customUrl, {
    scroll: false,
  });
};

export const updateFilters = (
  prevFilters,
  type,
  filterName,
  value,
  isChecked,
  debounceTimeoutRef,
  searchParams,
  router
) => {
  let updatedFilterValue;

  if (["make", "city", "model", "bodyType"].includes(filterName)) {
    const encodedValue = encodeURIComponent(value);
    if (isChecked) {
      updatedFilterValue = Array.from(
        new Set([...prevFilters[filterName], encodedValue])
      );
    } else {
      updatedFilterValue = prevFilters[filterName].filter(
        (item) => item !== encodedValue
      );
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

  updateFiltersInUrl(updatedFilters, type, searchParams, router);
  // }, 600);

  return updatedFilters;
};

export function capitalize(string) {
  if (typeof string !== "string" || string.length === 0) return string;
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export const getLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return null;
    }
  }
  return null;
};

export const setLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing ${key} to localStorage:`, error);
    }
  }
};


// /**
//  * Formats a price with comma separators.
//  * If the input is null, undefined, or invalid, returns '0'.
//  *
//  * @param {number|string|null|undefined} price - The price to format.
//  * @returns {string} - The formatted price or '0' if input is invalid.
//  */
// export function formatPrice(price) {
//   // Check if price is null or undefined
//   if (price === null || price === undefined) {
//     return '0';
//   }

//   // Convert the input to a number
//   const number = typeof price === 'number' ? price : parseFloat(price.toString().replace(/,/g, ''));

//   // Check if the converted number is a valid finite number
//   if (isNaN(number) || !isFinite(number)) {
//     return '0';
//   }

//   // Format the number with commas as thousand separators
//   // Using toLocaleString for better internationalization support
//   return number.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 0 });
// }
