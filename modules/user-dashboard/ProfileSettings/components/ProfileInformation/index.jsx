'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Box, Title, Group, Button, Collapse } from '@mantine/core';
import Card from '@/components/user-dashboard/Card';
import useProfileInformation from './useProfileInformation';
import styles from './ProfileInformation.module.css';
import buttonStyles from '@/styles/user-dashboard/Button.module.css';
import { IconPencil, IconChevronDown, IconChevronUp } from '@tabler/icons-react';

export default function ProfileInformation({ profileData }) {
  const [bannerImage, setBannerImage] = useState();
  const [showAllHours, setShowAllHours] = useState(false);

  const {
    form,
    handleSubmit,
    handleImageUpload,
    bgfile,
    profileFile
  } = useProfileInformation();

  useEffect(() => {
    setBannerImage(bgfile);
  }, [bgfile]);

  const formatDayName = (day) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  const renderWorkingHours = (workingHours) => {
    if (!workingHours) return profileData.salesHours;

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    // Compact view (default)
    const compactView = (
      <>
        <Box className={styles.timingRow}>
          <Box className={styles.timingDays}>Mon-Fri:</Box>
          <Box className={styles.timingHours}>
            {workingHours.monday?.isOpen 
              ? `${workingHours.monday.start}-${workingHours.monday.end}`
              : 'Closed'}
          </Box>
        </Box>
        <Box className={styles.timingRow}>
          <Box className={styles.timingDays}>Sat-Sun:</Box>
          <Box className={styles.timingHours}>
            {workingHours.saturday?.isOpen 
              ? `${workingHours.saturday.start}-${workingHours.saturday.end}`
              : 'Closed'}
          </Box>
        </Box>
      </>
    );

    // Detailed view
    const detailedView = days.map(day => (
      <Box key={day} className={styles.timingRow}>
        <Box className={styles.timingDays}>{formatDayName(day)}:</Box>
        <Box className={styles.timingHours}>
          {workingHours[day]?.isOpen 
            ? `${workingHours[day].start}-${workingHours[day].end}`
            : 'Closed'}
        </Box>
      </Box>
    ));

    return (
      <Box className={styles.timingContainer}>
        {!showAllHours ? compactView : detailedView}
        <Button
          variant="subtle"
          size="xs"
          onClick={() => setShowAllHours(!showAllHours)}
          className={styles.toggleButton}
          rightIcon={showAllHours ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
        >
          {showAllHours ? 'Show Less' : 'Show All Hours'}
        </Button>
      </Box>
    );
  };

  console.log('profileFile', profileData);

  return (
    <Card noContentPadding radius="md">
      <Box className={styles.profileBanner}>
        <img src={bannerImage ? bannerImage : profileData.bannerImage} alt="Profile Banner" width={354} height={140} />
        <Button 
          variant="subtle" 
          name='bannerFileInput'
          className={styles.editButton} 
          onClick={() => document.getElementById('bannerFileInput').click()} // Trigger file input
        >
          <IconPencil />
        </Button>
        <input
          type="file"
          id="bannerFileInput"
          style={{ display: 'none' }} // Hide the input
          accept="image/*"
          onChange={handleImageUpload}
        />

        <Box className={styles.profilePicture}>
          <Image
          
            src={profileFile ? profileFile : profileData.profileImage}
            alt="Profile"
            width={144}
            height={144}
          />
          <Button 
            variant="subtle" 
            className={styles.editButton} 
            onClick={() => document.getElementById('profileFileInput').click()} // Trigger file input
          >
            <IconPencil />
          </Button>
          <input
            type="file"
            id="profileFileInput"
            name='profileFileInput'
            style={{ display: 'none' }} // Hide the input
            accept="image/*"
            onChange={handleImageUpload}
          />
        </Box>
      </Box>
      <Box className={styles.profileInfoContent}>
        <Box className={styles.userPersonalDetails}>
          <Title className={styles.profileInfoTitle} order={3} align="center">
            {profileData.fullName} {/* Display full name from profileData */}
          </Title>
          <Box className={styles.userEmail}>{profileData.email}</Box>
          <Group justify="center" className={styles.followerGroup}>
            <Group gap='0'>
              <Box className={styles.userFollowers}>
                <Box>Followers</Box>
                <Box className={styles.followerCount}>{profileData.followers.length} {/* Display follower count */}</Box>
              </Box>
              <Box className={styles.userFollowers}>
                <Box>Following</Box>
                <Box className={styles.followerCount}>{profileData.following.length} {/* Display following count */}</Box>
              </Box>
            </Group>
          </Group>
          <Box className={styles.userStatus}>{profileData.isVerified ? 'Verified' : 'Not Verified'}</Box>
        </Box>
        <Box className={styles.userContactDetials}>
          <Box className={styles.contactGroup}>
            <Box className={styles.contactLabel}>Phone No</Box>
            <Box className={styles.contactTitle}>{profileData.phone}</Box> {/* Display phone number */}
          </Box>
          <Box className={styles.contactGroup}>
            <Box className={styles.contactLabel}>Address</Box>
            <Box className={styles.contactTitle}>{profileData.locationAddress}</Box> {/* Display location */}
          </Box>
          <Box className={styles.contactGroup}>
            <Box className={styles.contactLabel}>Working Hours</Box>
            <Box className={styles.contactTitle}>
              {renderWorkingHours(profileData.workingHours)}
            </Box>
          </Box>
          <Box className={styles.contactGroup}>
            <Box className={styles.contactLabel}>Last Login</Box>
            <Box className={styles.contactTitle}>{new Date(profileData.updatedAt).toLocaleString()}</Box> {/* Display last login */}
          </Box>

          <Box className={buttonStyles.holder} style={{ marginTop: '24px' }}>
            <Button
              radius="20px"
              color='#E90808'
              fullWidth
              classNames={{
                root: buttonStyles.root,
              }}
            >
              Delete Account
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}