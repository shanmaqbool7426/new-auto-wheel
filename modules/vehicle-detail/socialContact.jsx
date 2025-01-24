'use client'
import React,{useState} from 'react'
import {
LocationPinIcon,
 PhoneIcon,
 WhatsappIcon,
} from "@/components/Icons";
const SocialContact = ({detail}) => {
    const [showPhone, setShowPhone] = useState(false)
    
    const sellerAddress = detail?.data?.seller?.address || detail?.data?.seller?.locationAddress || 'Address not available'
    const phoneNumber = detail?.data?.seller?.phoneNumber || detail?.data?.contactInfo?.mobileNumber
    const whatsappNumber = detail?.data?.seller?.whatsappNumber || detail?.data?.seller?.phoneNumber || detail?.data?.contactInfo?.mobileNumber
    const maskedNumber = phoneNumber 
        ? `(${phoneNumber.slice(0, 2)}${'*'.repeat(7)})` 
        : '(**********)'
    return (
        <>
            <div className="col-12">
                <div className="card seller-phone-card mb-3">
                    <div className="card-body gap-2">
                        <PhoneIcon />
                        <h5 className="fw-bold mb-0">
                            {showPhone ? phoneNumber : maskedNumber}
                        </h5>
                        {!showPhone && (
                            <span 
                                className="text-decoration-underline text-muted" 
                                onClick={() => setShowPhone(!showPhone)}
                            >
                                Show Number
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="card whatsapp-icon mb-3">
                    <div 
                        className="card-body gap-2 align-items-center" 
                        onClick={() => window.open(`https://api.whatsapp.com/send/?phone=${whatsappNumber}&text&app_absent=0&lang=en`, '_blank')}
                        style={{ cursor: 'pointer' }}
                    >
                        <WhatsappIcon />
                        <h5 className="fw-bold mb-0">CHAT VIA WHATSAPP</h5>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="card address-card mb-3">
                    <div className="card-body gap-2 align-items-center text-primary">
                        <LocationPinIcon />
                        <div className="text-muted address-info">
                            {sellerAddress}
                            {detail?.data?.seller?.salesHours && (
                                <div>
                                    Timings: {detail.data.seller.salesHours || '9AM to 9PM'}
                                </div>
                                // <ul className="list-unstyled mb-0 text-muted mt-2">
                                //     <li>
                                //         Mon to Fri
                                //         <span className="ms-5">
                                //             Timings: {detail.data.seller.salesHours || '9AM to 9PM'}
                                //         </span>
                                //     </li>
                                //     <li>
                                //         Sat & Sun
                                //         <span className="ms-5">
                                //             Timings: {detail.data.seller.salesHours || '11AM to 6PM'}
                                //         </span>
                                //     </li>
                                // </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SocialContact