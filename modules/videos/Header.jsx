import { Box,Text, Title } from '@mantine/core';
import Search from '@/components/videos/search';

const Header = () => {
  return (
    <Box className="background-search-verlay" mb={{ base: 150, md: 100 }} mt='58'>
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5">
            <Title c='#FFF' order={3} mb="md">
              Autoweels Videos
            </Title>
            <Text c='#FFF'>
              Find information about the latest cars reviews in the market
            </Text>
          </div>
          <div className="col-md-12">
            <Box className="search-wrapper-card" mt="xl">
            <Search/>
            </Box>
          </div>
        </div>
      </div>
    </Box>
  )
}

export default Header
