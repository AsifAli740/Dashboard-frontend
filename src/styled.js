import { Box, Button, Card, InputBase, Typography, alpha, styled } from "@mui/material";
import img from "./Images/imgg.jpg"

export const ImageWrapper = styled(Box)(()=>({
    width:"100%",
    height:"100vh",
    backgroundImage:`Url(${img})`,
    backgroundRepeat:"no-repeat",
    backgroundSize:"100% 100vh",
    color:"white",
    display:"flex",
    alignItems:"center",
}))

export const SignInWrapper = styled(Box)(()=>({
   display: 'flex',
   marginRight:"12px",
   flexDirection: 'column',
   alignItems: 'center',
   border:"1px solid black",
   padding:"20px",
  boxShadow:" rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
   
}))


export const CustomCard = styled(Card)(() => ({
    width: "20%",
    height: "200px",
    backgroundColor: "#ddd",
    color:"black",
  
    ['&:hover']: {
      backgroundColor: "#1e2a35",
      color: "white",
    },
  }));


export const DownloadButton = styled(Button)(() => ({
 
    ['&:hover']: {
      backgroundColor: "#1976d2",
      color: "white",
    },
  }));

export const ErrorShow = styled(Typography)(() => ({
 
  variant:"body1",
   fontSize:"12px",
    color:"red",
     paddingLeft:"6px"
  }));



  // ================ SEARCH BAR =======================================


  export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
  export const StyledAdduser = styled(Box)(({ theme }) => ({
    color: "rgb(13, 25, 51)",
    width: "100%",
    padding: theme.spacing(1, 1, 1, 0),
    "& p": {
      textOverflow: "ellipsis !important",
      color: "rgb(13, 25, 51)",
    },
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
      "&:focus": {
        width: "38ch",
      },
    },
  }));
