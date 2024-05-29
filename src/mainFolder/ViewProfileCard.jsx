import {React, useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import img from "../mainFolder/img8.jpg"
import { Box, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { BasicModal } from './Modal';

const icons = [
    {
        id:0,
        icon:<InstagramIcon style={{color:"#E1306C"}} />
    },
    {
        id:1,
        icon:<FacebookIcon style={{color:"blue"}}  />
    },
    {
        id:2,
        icon:<XIcon style={{color:"black"}}  />
    },
    {
        id:3,
        icon:<LinkedInIcon style={{color:"blue"}}  />
    },
]


export default function ViewProfileCard({data}) {

    const userData = data
  
   
  return (
    <Box sx={{width:"100%",display: "flex",justifyContent: "center"}} > 

    <Card sx={{ maxWidth: 345,bgcolor: "white",marginTop:"140px", width: "100%",height: "340px" }}>
      <CardMedia
        sx={{ height: 190}}
        image={img}
      />
      <CardContent sx={{textAlign:"center"}}>
        <Typography variant="h5" component="div">
          Name : {userData?.name}
        </Typography>
        <Typography variant="body2" color={"text.secondary"}>
         Email : {userData?.email}
        </Typography>
        <Typography variant="body2" color={"text.secondary"}>
         Role : {userData?.role}
        </Typography>
        <Box>


        {
            icons.map((ele)=>(

                <IconButton>{ele.icon}</IconButton>
            ))
        }
        </Box>
        
      </CardContent>
      {/* <CardActions>
        <Button variant="contained" size="small" onClick={handleOpen} disableRipple>Edit</Button>
      </CardActions>
      <BasicModal signUpOpen={signUpOpen} handleClose={handleClose}  /> */}
    </Card>
  </Box>
  );
}
