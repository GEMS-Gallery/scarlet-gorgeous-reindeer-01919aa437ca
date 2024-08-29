import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box, IconButton, Tooltip, CircularProgress, List, ListItem, ListItemText, ListItemAvatar, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import CommentIcon from '@mui/icons-material/Comment';

interface Tile {
  id: number;
  imageUrl: string;
  description: string;
  category: string;
  websiteUrl: string;
  githubUrl?: string;
}

interface Comment {
  id: number;
  text: string;
  author: string;
  timestamp: Date;
}

interface TileGridProps {
  category: string;
  tiles: Tile[];
  viewType: 'grid' | 'list';
}

const TileGrid: React.FC<TileGridProps> = ({ category, tiles, viewType }) => {
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const [comments, setComments] = useState<{ [key: number]: Comment[] }>({});
  const [openCommentModal, setOpenCommentModal] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');
  const filteredTiles = category === 'All' ? tiles : tiles.filter(tile => tile.category === category);

  useEffect(() => {
    setLoadedImages([]);
  }, [category]);

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => [...prev, id]);
  };

  const handleOpenCommentModal = (tileId: number) => {
    setOpenCommentModal(tileId);
  };

  const handleCloseCommentModal = () => {
    setOpenCommentModal(null);
    setNewComment('');
  };

  const handleAddComment = (tileId: number) => {
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: Date.now(),
        text: newComment,
        author: 'Anonymous', // Replace with actual user name when authentication is implemented
        timestamp: new Date(),
      };
      setComments(prev => ({
        ...prev,
        [tileId]: [...(prev[tileId] || []), newCommentObj],
      }));
      setNewComment('');
    }
  };

  const renderCommentModal = (tileId: number) => (
    <Dialog open={openCommentModal === tileId} onClose={handleCloseCommentModal} maxWidth="sm" fullWidth>
      <DialogTitle>Comments</DialogTitle>
      <DialogContent>
        <List>
          {comments[tileId]?.map((comment) => (
            <ListItem key={comment.id}>
              <ListItemText
                primary={comment.text}
                secondary={`${comment.author} - ${comment.timestamp.toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
        <TextField
          fullWidth
          variant="outlined"
          label="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseCommentModal}>Cancel</Button>
        <Button onClick={() => handleAddComment(tileId)} color="primary">
          Add Comment
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderGridView = () => (
    <Grid container spacing={2}>
      {filteredTiles.map((tile) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={tile.id}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', maxWidth: 300 }}>
            <Box sx={{ position: 'relative', paddingTop: '56.25%', overflow: 'hidden' }}>
              {!loadedImages.includes(tile.id) && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <CircularProgress />
                </Box>
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
                <Tooltip title="Comments">
                  <IconButton
                    aria-label="comments"
                    onClick={() => handleOpenCommentModal(tile.id)}
                    size="small"
                  >
                    <CommentIcon />
                  </IconButton>
                </Tooltip>
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
          {renderCommentModal(tile.id)}
        </Grid>
      ))}
    </Grid>
  );

  const renderListView = () => (
    <List>
      {filteredTiles.map((tile) => (
        <ListItem
          key={tile.id}
          alignItems="flex-start"
          secondaryAction={
            <Box>
              <IconButton
                aria-label="comments"
                onClick={() => handleOpenCommentModal(tile.id)}
                size="small"
              >
                <CommentIcon />
              </IconButton>
              <IconButton
                aria-label="visit website"
                href={tile.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
              >
                <OpenInNewIcon />
              </IconButton>
              {tile.githubUrl && (
                <IconButton
                  aria-label="view on github"
                  href={tile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                >
                  <GitHubIcon />
                </IconButton>
              )}
            </Box>
          }
        >
          <ListItemAvatar>
            <Box sx={{ position: 'relative', width: 80, height: 80 }}>
              {!loadedImages.includes(tile.id) && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <CircularProgress size={24} />
                </Box>
              )}
              <Avatar
                variant="rounded"
                src={tile.imageUrl}
                alt={tile.description}
                sx={{
                  width: 80,
                  height: 80,
                  display: loadedImages.includes(tile.id) ? 'block' : 'none',
                }}
                imgProps={{
                  onLoad: () => handleImageLoad(tile.id),
                }}
              />
            </Box>
          </ListItemAvatar>
          <ListItemText
            primary={tile.description}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {tile.category}
                </Typography>
              </React.Fragment>
            }
          />
          {renderCommentModal(tile.id)}
        </ListItem>
      ))}
    </List>
  );

  return viewType === 'grid' ? renderGridView() : renderListView();
};

export default React.memo(TileGrid);
