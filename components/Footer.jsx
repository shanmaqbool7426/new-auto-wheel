"use client";
import { Container, Input, Text, Title } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BASE_URL } from "@/constants/api-endpoints";
import { fetchAPI } from "@/services/fetchAPI";
import Image from "next/image";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaPinterestP } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";

const footerSections = [
  { value: 'by-make', label: 'By Make' },
  { value: 'by-city', label: 'By City' },
  { value: 'explore-AussieMotor', label: 'Explore AussieMotor' },
  { value: 'AussieMotor', label: 'AussieMotor.com' },
  { value: 'sell-on-AussieMotor', label: 'Sell On AussieMotor' },
  { value: 'by-category', label: 'By Category' },
  { value: 'by-body-type', label: 'By Body Type' },
  { value: 'by-color', label: 'By Color' },
  { value: 'by-province', label: 'By Province' }
];

const Footer = () => {
  const pathname = usePathname();
  const [currentVehicleType, setCurrentVehicleType] = useState('car');
  const [footerData, setFooterData] = useState({
    byMake: [],
    byCity: [],
    byProvince: [],
    exploreAussieMotor: [],
    AussieMotor: [],
    byCategory: [],
    byBodyType: [],
    byColor: [],
    sellOnAussieMotor: []
  });

  useEffect(() => {
    // Extract vehicle type from pathname
    const pathParts = pathname?.split('/') || [];
    const vehicleType = pathParts.find(part => ['car', 'bike', 'truck'].includes(part)) || 'car';
    setCurrentVehicleType(vehicleType);
  }, [pathname]);

  useEffect(() => {
    const getFooterData = async () => {
      try {
        const res = await fetchAPI(`${BASE_URL}/api/footer`);
        const data =res
        // Organize data by sections
        const organizedData = {
          byMake: data?.data?.filter(item => item.section === "by-make" && item.status).sort((a, b) => a.order - b.order),
          byCity: data?.data?.filter(item => item.section === "by-city" && item.status).sort((a, b) => a.order - b.order),
          byProvince: data?.data?.filter(item => item.section === "by-province" && item.status).sort((a, b) => a.order - b.order),
          exploreAussieMotor: data?.data?.filter(item => item.section === "explore-AussieMotor" && item.status).sort((a, b) => a.order - b.order),
          AussieMotor: data?.data?.filter(item => item.section === "AussieMotor" && item.status).sort((a, b) => a.order - b.order),
          byCategory: data?.data?.filter(item => item.section === "by-category" && item.status).sort((a, b) => a.order - b.order),
          byBodyType: data?.data?.filter(item => item.section === "by-body-type" && item.status).sort((a, b) => a.order - b.order),
          byColor: data?.data?.filter(item => item.section === "by-color" && item.status).sort((a, b) => a.order - b.order),
          sellOnAussieMotor: data?.data?.filter(item => item.section === "sell-on-AussieMotor" && item.status).sort((a, b) => a.order - b.order)
        };

     

        setFooterData(organizedData);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };

    getFooterData();
  }, [currentVehicleType]);

  const renderFooterLinks = (section, vehicleType = null) => {
    let links = footerData[section] || [];
    if (vehicleType) {
      links = links.filter(item => item.vehicleType === vehicleType || item.vehicleType === 'all');
    }
    
    if (links.length === 0) return null;

    return links.map((item) => (
      <li key={item._id}>
      <Link 
        href={item.url}
        className="footer-link" 
        style={{
          fontSize: '12px',
          color: 'rgb(194 191 191)',
          textDecoration: 'none',
          transition: 'color 0.2s ease',
          display: 'block',
          marginBottom: '3px'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(194 191 191)'}
      >
        {item.title}
      </Link>
    </li>
    ));
  };

  const capitalizedVehicleType = currentVehicleType.charAt(0).toUpperCase() + currentVehicleType.slice(1);

  const iconStyle = {
    width: 38,
    height: 38,
    borderRadius: '50%',
    background: '#8c8c8c',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s',
    cursor: 'pointer'
  };

  return (
    <footer className="footer mt-4">
      <div className="container-xl">
        <div className="row">
          <div className="col-lg-9">
            <div className="row">
              <div className="col-lg-3 col-sm-4">
                <Title order={5} mt="md" mb="md" tt="uppercase" fw={600}>
                  {capitalizedVehicleType}s By Make
                </Title>
                <ul className="list-unstyled">
                  {renderFooterLinks("byMake", currentVehicleType)}
                </ul>
              </div>
              <div className="col-lg-3 col-sm-4">
                <Title order={5} mt="md" mb="md" tt="uppercase" fw={600}>
                  Cars By City
                </Title>
                <ul className="list-unstyled">
                  {renderFooterLinks("byCity")}
                </ul>
              </div>
              <div className="col-lg-3 col-sm-4">
                <Title order={5} mt="md" mb="md" tt="uppercase" fw={600}>
                  Explore AussieMotor
                </Title>
                <ul className="list-unstyled">
                  {renderFooterLinks("exploreAussieMotor")}
                </ul>
              </div>
              <div className="col-lg-3 col-sm-4">
                <Title order={5} mt="md" mb="md" tt="uppercase" fw={600}>
                AussieMotor.com
                </Title>
                <ul className="list-unstyled">
                {renderFooterLinks("AussieMotor")}
                  {/* {renderFooterLinks("byCategory")} */}
                  
                </ul>
              </div>

              <div className="col-lg-3 col-sm-4">
                <Title order={5} mt="md" mb="md" tt="uppercase" fw={600}>
                  {capitalizedVehicleType}s by Category
                </Title>
                <ul className="list-unstyled">
                  {renderFooterLinks("byCategory")}
                </ul>
              </div>

              <div className="col-lg-3 col-sm-4">
                <Title order={5} mt="md" mb="md" tt="uppercase" fw={600}>
                  Cars by Body Type
                </Title>
                <ul className="list-unstyled">
                  {renderFooterLinks("byBodyType")}
                </ul>
              </div>
              <div className="col-lg-3 col-sm-4">
                <Title order={5} mt="md" mb="md" tt="uppercase" fw={600}>
                  Cars by Color
                </Title>
                <ul className="list-unstyled">
                  {renderFooterLinks("byColor")}
                </ul>
              </div>
              <div className="col-lg-3 col-sm-4">
                <Title order={5} mt="md" mb="md" tt="uppercase" fw={600}>
                  Cars by Province
                </Title>
                <ul className="list-unstyled">
                  {renderFooterLinks("byProvince")}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
   
            <div>
              <Title order={5} mt="md" mb="md" tt="uppercase" fw={600}>
                Sell On AussieMotor
              </Title>
              <ul className="list-unstyled">
                {renderFooterLinks("sellOnAussieMotor")}
              </ul>
            </div>
            <div className="newsletter-section mt-5">
              <Title order={4} mb="md" fw={600} tt="uppercase">
                Subscribe to our Newsletter
              </Title>
             
              <Input
                mt="md"
                rightSection={
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 35 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="0.141846"
                      width="35"
                      height="35.15"
                      rx="6"
                      fill="#333333"
                    />
                    <path
                      d="M18.5125 22.9918C18.3125 22.7918 18.2165 22.5502 18.2245 22.2668C18.2325 21.9835 18.3368 21.7418 18.5375 21.5418L21.3625 18.7168H10.2125C9.92913 18.7168 9.69147 18.6208 9.49947 18.4288C9.30747 18.2368 9.2118 17.9995 9.21247 17.7168C9.21247 17.4335 9.30847 17.1958 9.50047 17.0038C9.69247 16.8118 9.9298 16.7162 10.2125 16.7168H21.3625L18.5125 13.8668C18.3125 13.6668 18.2125 13.4292 18.2125 13.1538C18.2125 12.8785 18.3125 12.6412 18.5125 12.4418C18.7125 12.2418 18.9501 12.1418 19.2255 12.1418C19.5008 12.1418 19.7381 12.2418 19.9375 12.4418L24.5125 17.0168C24.6125 17.1168 24.6835 17.2252 24.7255 17.3418C24.7675 17.4585 24.7881 17.5835 24.7875 17.7168C24.7875 17.8502 24.7665 17.9752 24.7245 18.0918C24.6825 18.2085 24.6118 18.3168 24.5125 18.4168L19.9125 23.0168C19.7291 23.2002 19.5001 23.2918 19.2255 23.2918C18.9508 23.2918 18.7131 23.1918 18.5125 22.9918Z"
                      fill="white"
                    />
                  </svg>
                }
                placeholder="Your Email Address..."
                size="md"
              />
            </div>
            {/* Follow Us On Section */}
            <div className="follow-us-section mt-4">
              <Title order={5} mb="xs" fw={600} tt="uppercase" style={{
                fontSize: '18px',
                marginBottom: '8px',
                marginTop: '100px',
                width: 'fit-content'
              }}>
                Follow Us On
              </Title>
              <div style={{ display: 'flex', gap: '18px', marginTop: '10px' }}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                  style={iconStyle}
                 >
                  <FaFacebookF color="#fff" size={16} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                  style={iconStyle}
>
                  <IoLogoYoutube color="#fff" size={16} />
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer"
                  style={iconStyle}
>
                  <FaPinterestP color="#fff" size={16} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                  style={iconStyle}
                  >
                  <FaTwitter color="#fff" size={16} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                  style={iconStyle}
>
                  <FaLinkedinIn color="#fff" size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="text-center">
          <span> {new Date().getFullYear()} AUSSIE MOTOR PTY LTD. All Rights Reserved.</span>
          {/* with links */}
          <p>

            <Link href="/main/terms" className="text-decoration-none text-white">Terms of Service</Link> | <Link href="/privacy" className="text-decoration-none text-white">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
