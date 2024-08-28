import React, { useState, lazy, Suspense } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, Button, Container, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import WebIcon from '@mui/icons-material/Web';
import BuildIcon from '@mui/icons-material/Build';
import PeopleIcon from '@mui/icons-material/People';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const LazyTileGrid = lazy(() => import('./components/TileGrid'));

interface Tile {
  id: number;
  imageUrl: string;
  description: string;
  category: string;
  websiteUrl: string;
  githubUrl?: string;
}

const tiles: Tile[] = [
  {
    id: 1,
    imageUrl: "https://shot.screenshotapi.net/screenshot?token=9B5BMQH-TBT4EQP-NHTEP60-EZ8VFKA&url=https%3A%2F%2Fdfinity.org%2F&width=800&height=800&full_page=true&fresh=true&output=image&file_type=png&wait_for_event=load",
    description: "DFINITY Foundation website",
    category: "Websites",
    websiteUrl: "https://dfinity.org/",
    githubUrl: "https://github.com/dfinity"
  },
  {
    id: 2,
    imageUrl: "https://shot.screenshotapi.net/screenshot?token=9B5BMQH-TBT4EQP-NHTEP60-EZ8VFKA&url=https%3A%2F%2Fdashboard.internetcomputer.org%2F&width=800&height=800&full_page=true&fresh=true&output=image&file_type=png&wait_for_event=load",
    description: "Internet Computer Dashboard",
    category: "Tools",
    websiteUrl: "https://dashboard.internetcomputer.org/",
    githubUrl: "https://github.com/dfinity/ic-dashboard"
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
    websiteUrl: "https://identity.ic0.app/",
    githubUrl: "https://github.com/dfinity/internet-identity"
  },
  {
    id: 5,
    imageUrl: "https://shot.screenshotapi.net/screenshot?token=9B5BMQH-TBT4EQP-NHTEP60-EZ8VFKA&url=https%3A%2F%2Fnns.ic0.app%2F&width=800&height=800&full_page=true&fresh=true&output=image&file_type=png&wait_for_event=load",
    description: "NNS App",
    category: "Tools",
    websiteUrl: "https://nns.ic0.app/",
    githubUrl: "https://github.com/dfinity/nns-dapp"
  }
];

const categories = ['All', ...new Set(tiles.map(tile => tile.category))];

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.default,
    borderRight: 'none',
    marginTop: '64px',
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  margin: '4px 8px',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
}));

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

function CategoryPage() {
  const { category = 'All' } = useParams<{ category: string }>();
  return (
    <Suspense fallback={<CircularProgress />}>
      <LazyTileGrid category={category} tiles={tiles} />
    </Suspense>
  );
}

function App() {
  const navigate = useNavigate();

  const drawer = (
    <div>
      <List>
        {categories.map((category) => (
          <StyledListItem
            button
            key={category}
            onClick={() => navigate(`/category/${category}`)}
          >
            <ListItemIcon>
              {getCategoryIcon(category)}
            </ListItemIcon>
            <ListItemText primary={category} />
          </StyledListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar position="fixed" color="inherit" elevation={0} sx={{ width: '100%' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
            IC Screenshots
          </Typography>
          <Box>
            <Button
              color="inherit"
              startIcon={<CodeIcon />}
              sx={{ mr: 2 }}
              href="https://smartcontracts.org/docs/quickstart/quickstart-intro.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Start Building
            </Button>
            <Button
              color="inherit"
              startIcon={<SchoolIcon />}
              href="https://internetcomputer.org/docs/current/developer-docs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <StyledDrawer
        variant="permanent"
      >
        {drawer}
      </StyledDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, ml: '240px' }}>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<CategoryPage />} />
            <Route path="/category/:category" element={
              <TransitionGroup>
                <CSSTransition key={location.pathname} classNames="fade" timeout={200}>
                  <CategoryPage />
                </CSSTransition>
              </TransitionGroup>
            } />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
