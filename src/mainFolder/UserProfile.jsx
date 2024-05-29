import {React, useContext, useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';

import { Box, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { BasicModal } from './Modal';
import { contextVal } from './context';
import { BASE_URL } from './constant';

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


export default function ProfileCard() {
  const [signUpOpen, setSignUpOpen] = useState(false)
  const context = useContext(contextVal);
  const [user, setUser] = useState({});
  const [image, setimage] = useState("");
  const [imgData, setImgData] = useState({
    img: "",
    id: "",
  });  



  const handleOpen = () =>{
      setSignUpOpen(true)
  }
  const handleClose = () =>{
      setSignUpOpen(false)
  }
  // let userData = localStorage.getItem("user")
  // userData = JSON.parse(userData)

  useEffect(() => {
    let userData = localStorage.getItem("user");
    userData = JSON.parse(userData);
    if (userData) {
      setUser(userData);
    }
  }, [image,signUpOpen]);

  const getData = async (data) => {
    const response = await axios.put(
      `${BASE_URL}uploadimage`,
      data
    );
    if (response) {
      setimage(response.data.img);
      setUser({ ...user, img: response.data.img });
    } else {
    }
  };
  const onlyUser = async (e) => {
    try {
      let reader = new FileReader();

      reader.onload = (e) => {
        if (e.loaded) {
          getData({ ...imgData, img: reader.result, id: user._id });
          setimage(reader.result);
          let user_img = JSON.parse(localStorage.getItem("user"));
          user_img.img = reader.result;
          if (user_img?.img) {
            setUser(user_img);
          }
          localStorage.setItem("user", JSON.stringify(user_img));
        } else {
          context.setSnackbar({
            state: true,
            message: "Image size is too big",
          });
        }
      };
    } catch (error) {
    }
  };
   
  return (
    <Box sx={{width:"100%",display: "flex"}} > 
    <Card sx={{ maxWidth: 345,bgcolor: "white",marginTop:"10px", width: "100%",height: "390px",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>

    <CardMedia image={user.img} sx={{ height: 200 }}>
            <label for="file-upload">
            <EditIcon sx={{color:"#9f9d9d"}} />

            </label>
           
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={onlyUser}
            />
           

          </CardMedia>
      <CardContent sx={{textAlign:"center"}}>
        <Typography variant="h5" component="div">
          Name : {user?.name}
        </Typography>
        <Typography variant="body2" color={"text.secondary"}>
         Email : {user?.email}
        </Typography>
        <Typography variant="body2" color={"text.secondary"}>
         Role : {user?.role}
        </Typography>
        <Box>


        {
            icons.map((ele)=>(

                <IconButton>{ele.icon}</IconButton>
            ))
        }
        </Box>
        
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" onClick={handleOpen} disableRipple>Edit</Button>
      </CardActions>
      <BasicModal signUpOpen={signUpOpen} handleClose={handleClose}  />
    </Card>
  </Box>
  );
}
