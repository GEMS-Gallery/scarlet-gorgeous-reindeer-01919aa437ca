import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box, IconButton, Tooltip } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';

interface Tile {
  id: number;
  imageUrl: string;
  description: string;
  category: string;
  websiteUrl: string;
  githubUrl?: string;
}

interface TileGridProps {
  category: string;
  tiles: Tile[];
}

const TileGrid: React.FC<TileGridProps> = ({ category, tiles }) => {
  const filteredTiles = category === 'All' ? tiles : tiles.filter(tile => tile.category === category);

  return (
    <Grid container spacing={3}>
      {filteredTiles.map((tile) => (
        <Grid item xs={12} sm={6} md={6} lg={4} key={tile.id}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              image={tile.imageUrl}
              alt={tile.description}
              sx={{
                height: 250,
                objectFit: 'cover',
                objectPosition: 'top',
              }}
            />
            <CardContent sx={{ flexGrow: 1, p: 3 }}>
              <Typography variant="h6" gutterBottom>
                {tile.description}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {tile.category}
              </Typography>
              <Box display="flex" justifyContent="flex-end" mt={3}>
                <Tooltip title="Visit Website">
                  <IconButton
                    aria-label="visit website"
                    href={tile.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="large"
                  >
                    <OpenInNewIcon />
                  </IconButton>
                </Tooltip>
                {tile.githubUrl && (
                  <Tooltip title="View on GitHub">
                    <IconButton
                      aria-label="view on github"
                      href={tile.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="large"
                    >
                      <GitHubIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default React.memo(TileGrid);
