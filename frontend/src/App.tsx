import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import { Box, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 800,
  margin: '2rem auto',
  padding: theme.spacing(2),
}));

const StyledImage = styled('img')({
  width: '100%',
  height: 'auto',
});

function App() {
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScreenshotUrl = async () => {
      try {
        const url = await backend.getScreenshotUrl();
        setScreenshotUrl(url);
      } catch (error) {
        console.error('Error fetching screenshot URL:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScreenshotUrl();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Internet Computer Screenshot
      </Typography>
      <StyledCard>
        <CardContent>
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : screenshotUrl ? (
            <>
              <StyledImage src={screenshotUrl} alt="Internet Computer Screenshot" />
              <Typography variant="body1" sx={{ mt: 2 }}>
                This screenshot showcases the Internet Computer website, demonstrating the capabilities of the IC platform.
              </Typography>
            </>
          ) : (
            <Typography color="error">
              Failed to load the screenshot. Please try again later.
            </Typography>
          )}
        </CardContent>
      </StyledCard>
    </Box>
  );
}

export default App;
