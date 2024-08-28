import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography, IconButton, CircularProgress } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

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
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Box p={2}>
                <Typography color="error">{error}</Typography>
              </Box>
            ) : (
              <CardMedia
                component="img"
                image={SCREENSHOT_URL}
                alt="Internet Computer Screenshot"
              />
            )}
            <CardContent>
              <Typography variant="body2" gutterBottom>
                This screenshot showcases the Internet Computer website, demonstrating the capabilities of the IC platform.
              </Typography>
              <Box display="flex" justifyContent="flex-end">
                <IconButton aria-label="github" href="https://github.com/dfinity" target="_blank" rel="noopener noreferrer">
                  <GitHubIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
