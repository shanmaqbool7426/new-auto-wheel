import ListingFilter from '@/components/listing/sidebar-filter'
import React from 'react'
import { Box, Card, Flex, Image, Text, Title, Badge,Group } from '@mantine/core';

const page = () => {
    return (
        <div className="container">
        <div className="row">
           <div className="col-md-3">
             <ListingFilter type={'car'} makes={makes} bodies={bodies} vehicles={popularVehicles?.data} />
 
 
           </div>
           <div className="col-md-9 mt-5"> 
           <Card shadow="sm" padding="lg" radius="md" withBorder>
       <Group noWrap>
         {/* Car Image */}
         {/* <Image src={fetchToyotaVehicles.resutls[0].image ?? ""} height={100} width={150} radius="md" /> */}
 
         {/* Car Details */}
         <div style={{ flex: 1 }}>
           {/* Car Title */}
           <Text weight={500} size="lg" style={{ marginBottom: '5px' }}>
             {'car.name'}
           </Text>
 
           {/* Car Specs */}
           <Text color="dimmed" size="sm">
             {'car.transmission'} | {'car.fuelType'} | {'car.engineSize'} cc
           </Text>
         </div>
 
         {/* Car Price */}
         <div>
           <Text weight={700} size="lg" color="green">
             {2322}
           </Text>
           {/* Ratings */}
           <Badge color="yellow" variant="filled" style={{ marginTop: '5px' }}>
             ★★★★☆
           </Badge>
         </div>
       </Group>
     </Card>
           </div>
         </div>
        </div>
    )
}

export default page