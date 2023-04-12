import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


// Pass props from contact list. Must have SOS state passed down from...
export default function TripViewingCard() {
    

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardMedia
        sx={{ height: 175 }}
        // google maps screenshot
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {/* Here is were we'd insert contact's name and possibly travel destination */}
          Contact Buddy is on a journey home.
        </Typography>
        <Typography variant="body2" color="text.secondary">
            
        </Typography>
      </CardContent>
      <CardActions>
        {/* conditionally render these buttons when SOS is active on trip */}
        {/* {sosIsActive && <Button size="small">Join Chat</Button>}
        {sosIsActive && <Button size="small">Decline S O S</Button>} */}
        <Button size='small'> Join Chat</Button>
        <Button size='small'> Decline SOS</Button>

      </CardActions>
    </Card>
  );
}
