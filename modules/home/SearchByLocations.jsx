'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { City } from 'country-state-city';
import { Autocomplete } from "@mantine/core";
import { useRouter } from "next/navigation";

const SearchByLocations = () => {
  const router = useRouter();

  const [cityOptions, setCityOptions] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);  // Loading state for button

  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const handleInputChange = (input) => {
    setQuery(input);

    if (input.length > 0) {
      const cities = City.getCitiesOfCountry('PK');

      const filtered = cities
        .filter((city) =>
          city.name.toLowerCase().startsWith(input.toLowerCase())
        )
        .map((city) => city.name);
        
        if (filtered.length==1) {
          const cityQuery =  `/ct_${filtered[0].toLowerCase()}`;
          const searchUrl = `/listing/cars/search/-${cityQuery}`;
          router.push(searchUrl)?.finally(() => {
            setLoading(false);  // Reset loading state after redirect
          });
        }
   
      setCityOptions(filtered);
    } else {
      setCityOptions([]); // Clear the options if input is empty
    }
  };
  const locations = [
    { name: 'Karachi', slug: 'ct_karachi', image: '/locations/karachi.svg' },
    { name: 'Islamabad', slug: 'ct_islamabad', image: '/locations/islamabad.svg' },
    { name: 'Lahore', slug: 'ct_lahore', image: '/locations/lahore.svg' },
    { name: 'Faisalabad', slug: 'ct_faisalabad', image: '/locations/faisalabad.svg' },
    { name: 'Peshawar', slug: 'ct_peshawar', image: '/locations/peshawar.svg' },
  ];
  return (
    <section className="search-by-location py-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="category-title d-flex justify-content-between align-items-center">
              <h3 className="fw-bold mb-0">
                Get trusted used Cars
                <span className="text-primary ms-1">Nearby</span>
              </h3>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-8">
            <div className="row">
              {locations.map((location) => (
                <div className="col" key={location.slug}>
                  <div className="card locations-card">
                    <div className="card-body text-center">
                      <Link href={`/listing/cars/search/-/${location.slug}`} className="text-decoration-none">
                        <Image
                          src={location.image}
                          width={80}
                          height={95}
                          alt={location.name}
                        />
                        <h5 className="mb-0 my-3 location-info">
                          <span className="text-muted d-block">Used cars in</span>
                          <span className="fw-semibold mt-1 d-inline-block text-dark city-name">
                            {location.name}
                          </span>
                        </h5>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="row">
              {locations.map((location) => (
                <div className="col" key={location.slug}>
                  <div className="card locations-card">
                    <div className="card-body text-center">
                      <Link href={`/listing/cars/search/-/${location.slug}`} className="text-decoration-none">
                        <Image
                          src={location.image}
                          width={80}
                          height={95}
                          alt={location.name}
                        />
                        <h5 className="mb-0 my-3 location-info">
                          <span className="text-muted d-block">Used cars in</span>
                          <span className="fw-semibold mt-1 d-inline-block text-dark city-name">
                            {location.name}
                          </span>
                        </h5>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="position-relative h-100 ms-5">
              <h5 className="lh-base text-center input-label py-4">
                I am looking to buy a second <br /> hand car in
              </h5>
              <div className="input-with-icon">
                <span className="icon">
                  <FaLocationDot />
                </span>
                {/* <input
                  type="text"
                  placeholder="Enter your city"
                  className="location-input form-control"
                /> */}
                <Autocomplete
                  label=""
                  placeholder="Enter your city"
                  data={cityOptions}
                  value={query}
                  onChange={handleInputChange}
                  withScrollArea={false}
                  styles={{ dropdown: { maxHeight: 250, overflowY: 'auto' } }}
                  mt="md"
                />
              </div>
              <div className="locations-background">
                <Image
                  src={"/locations/locations-bg.svg"}
                  width={500}
                  height={500}
                  className="img-fluid"
                  alt="Location Vector Background"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchByLocations;
