import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box, IconButton, Tooltip, Skeleton } from '@mui/material';
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
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const filteredTiles = category === 'All' ? tiles : tiles.filter(tile => tile.category === category);

  useEffect(() => {
    setLoadedImages([]);
  }, [category]);

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => [...prev, id]);
  };

  return (
    <Grid container spacing={2}>
      {filteredTiles.map((tile) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={tile.id}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', maxWidth: 300 }}>
            <Box sx={{ position: 'relative', paddingTop: '56.25%', overflow: 'hidden' }}>
              {!loadedImages.includes(tile.id) && (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  animation="wave"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                />
              )}
              <CardMedia
                component="img"
                image={tile.imageUrl}
                alt={tile.description}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top',
                  display: loadedImages.includes(tile.id) ? 'block' : 'none',
                }}
                onLoad={() => handleImageLoad(tile.id)}
              />
            </Box>
            <CardContent sx={{ flexGrow: 1, p: 2 }}>
              <Typography variant="subtitle1" gutterBottom noWrap>
                {tile.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {tile.category}
              </Typography>
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Tooltip title="Visit Website">
                  <IconButton
                    aria-label="visit website"
                    href={tile.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
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
                      size="small"
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
