import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Grid, Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Routes, Route, Link, useParams } from 'react-router-dom';

interface Tile {
  id: number;
  imageUrl: string;
  description: string;
  category: string;
}

const tiles: Tile[] = [
  {
    id: 1,
    imageUrl: "https://shot.screenshotapi.net/screenshot?token=9B5BMQH-TBT4EQP-NHTEP60-EZ8VFKA&url=https%3A%2F%2Fdfinity.org%2F&width=800&height=800&full_page=true&fresh=true&output=image&file_type=png&wait_for_event=load",
    description: "DFINITY Foundation website",
    category: "Websites"
  },
  {
    id: 2,
    imageUrl: "https://shot.screenshotapi.net/screenshot?token=9B5BMQH-TBT4EQP-NHTEP60-EZ8VFKA&url=https%3A%2F%2Fdashboard.internetcomputer.org%2F&width=800&height=800&full_page=true&fresh=true&output=image&file_type=png&wait_for_event=load",
    description: "Internet Computer Dashboard",
    category: "Tools"
  },
  {
    id: 3,
    imageUrl: "https://shot.screenshotapi.net/screenshot?token=9B5BMQH-TBT4EQP-NHTEP60-EZ8VFKA&url=https%3A%2F%2Fforum.dfinity.org%2F&width=800&height=800&full_page=true&fresh=true&output=image&file_type=png&wait_for_event=load",
    description: "DFINITY Forum",
    category: "Community"
  },
  {
    id: 4,
    imageUrl: "https://shot.screenshotapi.net/screenshot?token=9B5BMQH-TBT4EQP-NHTEP60-EZ8VFKA&url=https%3A%2F%2Fidentity.ic0.app%2F&width=800&height=800&full_page=true&fresh=true&output=image&file_type=png&wait_for_event=load",
    description: "Internet Identity",
    category: "Tools"
  },
  {
    id: 5,
    imageUrl: "https://shot.screenshotapi.net/screenshot?token=9B5BMQH-TBT4EQP-NHTEP60-EZ8VFKA&url=https%3A%2F%2Fnns.ic0.app%2F&width=800&height=800&full_page=true&fresh=true&output=image&file_type=png&wait_for_event=load",
    description: "NNS App",
    category: "Tools"
  }
];

const categories = ['All', ...new Set(tiles.map(tile => tile.category))];

function TileGrid({ category }: { category: string }) {
  const filteredTiles = category === 'All' ? tiles : tiles.filter(tile => tile.category === category);

  return (
    <Grid container spacing={2}>
      {filteredTiles.map((tile) => (
        <Grid item xs={12} sm={6} md={4} key={tile.id}>
          <Card>
            <CardMedia
              component="img"
              image={tile.imageUrl}
              alt={tile.description}
              sx={{
                height: 200,
                objectFit: 'cover',
                objectPosition: 'top',
              }}
            />
            <CardContent>
              <Typography variant="body2" gutterBottom>
                {tile.description}
              </Typography>
              <Box display="flex" justifyContent="flex-end">
                <IconButton aria-label="github" href="https://github.com/dfinity" target="_blank" rel="noopener noreferrer">
                  <GitHubIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

function CategoryPage() {
  const { category = 'All' } = useParams<{ category: string }>();
  return <TileGrid category={category} />;
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const drawer = (
    <div>
      <List>
        {categories.map((category) => (
          <ListItem button key={category} component={Link} to={`/category/${category}`}>
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
      >
        {drawer}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Internet Computer Screenshots
        </Typography>
        <Routes>
          <Route path="/" element={<CategoryPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
