/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from "@mui/system";
import { FunctionComponent, useEffect, useState } from "react";
import navbarbackIcon from "../../assets/navbarbackIcon.svg"
import {
    Typography,
    Avatar,
    CardActions,
    CardContent,
    CardMedia,
    CardHeader,
    Card,
  } from "@mui/material";
  import logouser from "../../assets/user.png";
import liked from "../../assets/liked.svg";

import { useNavigate } from "react-router-dom";
import { Api, Types } from "../../modules/auth";
import Grid from "@mui/system/Unstable_Grid";
import { getCategory } from "../../api/api";
interface MylikesProps {
    
}
 
const Mylikes: FunctionComponent<MylikesProps> = () => {

    const navigate = useNavigate()

    const [likes,setLiked] = useState<Types.IForm.getLikesPosts[]>([])
    const [posts,setPost] = useState<Types.IForm.PostsApi[]>([])
    const [showMore, setShowMore] = useState(false);


    useEffect(()=>{
      const getLikedPost = async() => {
        try {
            const {data} = await Api.getLikes()
            console.log(data);
            setLiked(data)
        } catch (error) {
            console.log(error);
            
        }
      }
      getLikedPost()
    },[])

    useEffect(()=> {
        const fetchData = async () => {
            try {
             const { data: categoryData } = await getCategory();
     
             const { data: postData } = await Api.NewPostss({search:""});
             const filteredPosts = postData.map(post => ({
               ...post,
               category: categoryData.find((cat: any) => cat.id === post.category)
             }));
             setPost(filteredPosts);
            } catch (error) {
             console.log(error);
            }
        }
        fetchData()   
    },[])

    return ( 
        <Box>
            <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        
        paddingLeft: "40px",
        paddingRight: "40px",
        marginTop: "32px",
        marginBottom: "31px",
      }}
    >
      <img
        width={32}
        onClick={() => navigate(-1)}
        style={{ cursor: "pointer", marginLeft: "0px",marginRight:"42%" }}
        height={32}
        src={navbarbackIcon}
        alt="backicon"
      />
      <Typography
        sx={{
          color: "#000",
          fontFamily: "Inter,sans-serif",
          fontSize: "25px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "normal",
        }}
      >
        Liked Posts
      </Typography>
      </Box>
      <Box>
      <Grid container spacing={2} padding={2} sx={{margin:"0px"}}>
      { likes.length > 0 ? (likes.map(({ service }) => {
  const likedPost = posts.find((post) => post.id === service);
  if (likedPost) {
    return (
      <Grid  key={likedPost.id} xs={12} sm={6} md={4} lg={4} spacing={0} container>
        <Card sx={{ width: "100%", boxShadow: "none" }}>
          <CardHeader
            sx={{ paddingLeft: "0px", paddingRight: "5px" }}
            avatar={
              <Avatar aria-label="recipe">
                <img src={likedPost.user.image === null ? logouser : likedPost.user.image} width={40} height={40} alt="" />
              </Avatar>
            }
            title={likedPost.user.full_name}
          />
          <CardMedia sx={{ objectFit: "fill", borderRadius: "20px" }} component="img" height="500" image={likedPost.image} alt="Paella dish" />
          <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", marginLeft: "0px" }}>
              <img
                src={liked}
                style={{ marginRight: "10px", marginLeft: "0px" }}
                alt="likes"
              />
            </Box>
          </CardActions>
         <CardContent sx={{ paddingTop: "0px",paddingBottom:"0px"}}>
            {likedPost.description && (
  <CardContent sx={{ paddingTop: "0px" }}>
    <Typography variant="body2" sx={{ fontSize: "18px", height: showMore ? "auto" : "30px", overflow: "hidden" }} color="text.secondary">
      {likedPost.description}
    </Typography>
    {likedPost.description.length > 10 && (
      <Typography onClick={() => setShowMore(!showMore)} sx={{ cursor: "pointer", color: "black" }}>
        {showMore ? "short" : "..."}
      </Typography>
    )}
  </CardContent>
)}
            </CardContent>
          <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography
              sx={{
                padding: "12px 14px",
                borderRadius: "100px",
                background: "#F5EFE1",
                whiteSpace: "nowrap",
                fontFamily: "Inter,sans-serif",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
              color="text.secondary"
            >
              {likedPost.category.name}
            </Typography>
            <Typography sx={{ fontSize: "22px", fontWeight: 700, color: "black" }}>
              {new Intl.NumberFormat().format(parseFloat(likedPost.price) * 1)} <span style={{ color: "#E2A882" }}>SUM</span>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  }
        return null;
      })):(<Box><Typography sx={{fontSize:"25px",textAlign:"center"}}>You don't have liked services</Typography></Box>)}
      </Grid>
      </Box>
        </Box>
     );
}
 
export default Mylikes;