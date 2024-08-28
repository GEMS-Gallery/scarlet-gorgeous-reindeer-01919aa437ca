import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Grid, Card, CardMedia, CardContent, Typography, Button, AppBar, Toolbar } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import WebIcon from '@mui/icons-material/Web';
import BuildIcon from '@mui/icons-material/Build';
import PeopleIcon from '@mui/icons-material/People';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';

interface Tile {
  id: number;
  imageUrl: string;
  description: string;
  category: string;
  websiteUrl: string;
}

const tiles: Tile[] = [
  {
    id: 1,
    imageUrl: "https://shot.screenshotapi.net/screenshot?token=9B5BMQH-TBT4EQP-NHTEP60-EZ8VFKA&url=https%3A%2F%2Fdfinity.org%2F&width=800&height=800&full_page=true&fresh=true&output=image&file_type=png&wait_for_event=load",
    description: "DFINITY Foundation website",
    category: "Websites",
    websiteUrl: "https://dfinity.org/"
  },
  {
    id: 2,
    imageUrl: "https://shot.screenshotapi.net/screenshot?token=9B5BMQH-TBT4EQP-NHTEP60-EZ8VFKA&url=https%3A%2F%2Fdashboard.internetcomputer.org%2F&width=800&height=800&full_page=true&fresh=true&output=image&file_type=png&wait_for_event=load",
    description: "Internet Computer Dashboard",
    category: "Tools",
    websiteUrl: "https://dashboard.internetcomputer.org/"
  },
  {
    id: 3,
    imageUrl: "https://shot.screenshotapi.net/screenshot?token=9B5BMQH-TBT4EQP-NHTEP60-EZ8VFKA&url=https%3A%2F%2Fforum.dfinity.org%2F&width=800&height=800&full_page=true&fresh=true&output=image&file_type=png&wait_for_event=load",
    description: "DFINITY Forum",
    category: "Community",
    websiteUrl: "https://forum.dfinity.org/"
  },
  {
    id: 4,
    imageUrl: "https://shot.screenshotapi.net/screenshot?token=9B5BMQH-TBT4EQP-NHTEP60-EZ8VFKA&url=https%3A%2F%2Fidentity.ic0.app%2F&width=800&height=800&full_page=true&fresh=true&output=image&file_type=png&wait_for_event=load",
    description: "Internet Identity",
    category: "Tools",
    websiteUrl: "https://identity.ic0.app/"
  },
  {
    id: 5,
    imageUrl: "https://shot.screenshotapi.net/screenshot?token=9B5BMQH-TBT4EQP-NHTEP60-EZ8VFKA&url=https%3A%2F%2Fnns.ic0.app%2F&width=800&height=800&full_page=true&fresh=true&output=image&file_type=png&wait_for_event=load",
    description: "NNS App",
    category: "Tools",
    websiteUrl: "https://nns.ic0.app/"
  }
];

const categories = ['All', ...new Set(tiles.map(tile => tile.category))];

function getCategoryIcon(category: string) {
  switch (category) {
    case 'Websites':
      return <WebIcon />;
    case 'Tools':
      return <BuildIcon />;
    case 'Community':
      return <PeopleIcon />;
    default:
      return <AllInclusiveIcon />;
  }
}

function TileGrid({ category }: { category: string }) {
  const filteredTiles = category === 'All' ? tiles : tiles.filter(tile => tile.category === category);

  return (
    <Grid container spacing={3}>
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
              <Typography variant="h6" gutterBottom>
                {tile.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {tile.category}
              </Typography>
              <Button 
                variant="outlined" 
                color="primary"
                href={tile.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<OpenInNewIcon />}
                fullWidth
                sx={{ mt: 2 }}
              >
                Visit Website
              </Button>
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
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {categories.map((category) => (
          <ListItem 
            button 
            key={category} 
            onClick={() => {
              navigate(`/category/${category}`);
              setMobileOpen(false);
            }}
          >
            <ListItemIcon>
              {getCategoryIcon(category)}
            </ListItemIcon>
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" color="default" elevation={0} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, borderBottom: '1px solid #E5E7EB' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" color="text.primary">
            Internet Computer Screenshots
          </Typography>
        </Toolbar>
      </AppBar>
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
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Routes>
          <Route path="/" element={<CategoryPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
