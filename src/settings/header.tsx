import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function a11yProps(index: number) {
  return {
    'aria-controls': `simple-tabpanel-${index}`,
    id: `simple-tab-${index}`,
  };
}

function SettingsHeader() {
  const router = useRouter();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (router.asPath === '/settings/datawarehouse') {
      setValue(1);
    } else if (router.pathname === '/settings/integrations') {
      setValue(2);
    } else {
      setValue(0);
    }
  }, [router.asPath, router.pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) {
      router.push('/settings/team');
    } else if (newValue === 1) {
      router.push('/settings/datawarehouse');
    } else if (newValue === 2) {
      router.push('/settings/integrations');
    }
  };

  return (
    <>
      <Typography gutterBottom variant="h1">
        Settings
      </Typography>
      <Box mb={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          aria-label="basic tabs example"
          onChange={handleChange}
          value={value}
        >
          <Tab label="Manage users" {...a11yProps(0)} />
          <Tab label="Snowflake connection" {...a11yProps(1)} />
          <Tab label="Integrations" {...a11yProps(2)} />
        </Tabs>
      </Box>
    </>
  );
}

export default SettingsHeader;
