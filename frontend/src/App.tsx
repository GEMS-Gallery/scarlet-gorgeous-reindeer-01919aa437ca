import React, { useState, lazy, Suspense } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, Button, Container, CircularProgress, useTheme, useMediaQuery, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import WebIcon from '@mui/icons-material/Web';
import BuildIcon from '@mui/icons-material/Build';
import PeopleIcon from '@mui/icons-material/People';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import MenuIcon from '@mui/icons-material/Menu';
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

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.default,
    borderRight: 'none',
    [theme.breakpoints.up('sm')]: {
      marginTop: '64px',
    },
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        {categories.map((category) => (
          <StyledListItem
            button
            key={category}
            onClick={() => {
              navigate(`/category/${category}`);
              if (isMobile) setMobileOpen(false);
            }}
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
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
            GEM's Showcase
          </Typography>
          <Box>
            <Button
              color="inherit"
              startIcon={<CodeIcon />}
              sx={{ mr: 2 }}
              href="https://beta.gems.fr1-dmz1.dfinity.network/"
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
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <StyledDrawer variant="permanent" open>
            {drawer}
          </StyledDrawer>
        )}
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Container maxWidth="xl">
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
