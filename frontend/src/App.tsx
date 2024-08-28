import React, { useState, useEffect } from 'react';
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

const SCREENSHOT_URL = "https://shot.screenshotapi.net/screenshot?token=9B5BMQH-TBT4EQP-NHTEP60-EZ8VFKA&url=https%3A%2F%2Fdfinity.org%2F&width=800&height=800&full_page=true&fresh=true&output=image&file_type=png&wait_for_event=load";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setLoading(false);
    img.onerror = () => {
      setLoading(false);
      setError('Failed to load the screenshot. Please try again later.');
    };
    img.src = SCREENSHOT_URL;
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
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <>
              <StyledImage src={SCREENSHOT_URL} alt="Internet Computer Screenshot" />
              <Typography variant="body1" sx={{ mt: 2 }}>
                This screenshot showcases the Internet Computer website, demonstrating the capabilities of the IC platform.
              </Typography>
            </>
          )}
        </CardContent>
      </StyledCard>
    </Box>
  );
}

export default App;
