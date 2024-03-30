/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/system";
import Grid from "@mui/system/Unstable_Grid";
import { FunctionComponent, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import like from "../../../assets/likes.svg";
import liked from "../../../assets/liked.svg";
import bookmark from "../../../assets/Bookmark.svg";
import bookmarked from "../../../assets/Bookmarked.svg";
import { Api, Types } from "../../../modules/auth";
import { getCategory } from "../../../api/api";

interface MasterPostsProps {
    
}
 
const MasterPosts: FunctionComponent<MasterPostsProps> = () => {


    
    const [likes, setLikes] = useState(0);
    const [bookmarkedd, setBookmark] = useState(0);
    const [userpostsid,setuserpostsid] = useState(0)
    const [posts, setPosts] = useState<Types.IForm.PostsApi[]>([]);
       useEffect(()=>{
        const userProfil = async () => {
          try {
            const {data} = await Api.UserProfil()
            
            setuserpostsid(data.id)
          } catch (error) {
            console.log(error);
            
          }
        }
        userProfil()
       })
       
       useEffect(()=>{
        const fetchData = async () => {
       try {
        const { data: categoryData } = await getCategory();

        const { data: postData } = await Api.UserPosts(userpostsid);
        const filteredPosts = postData.map(post => ({
          ...post,
          category: categoryData.find((cat: any) => cat.id === post.category)
        }));
        setPosts(filteredPosts);
       } catch (error) {
        console.log(error);
       }
    }
    fetchData()
       },[userpostsid])

       const Likes = async () => {
        if (likes === 0) {
          setLikes(1);
        } else {
          setLikes(0);
        }
      };
      const Bookmarkes = async () => {
        if (bookmarkedd === 0) {
          setBookmark(1);
        } else {
          setBookmark(0);
        }
      };


    return ( 
    <Box>
    <Grid width="100%" container spacing={2} padding={4}>
                {posts?.map(
                  ({  description,  category:postCategory, image: postImage,  price, id }: Types.IForm.PostsApi) => (
                    <Grid container spacing={0} xs={12} sm={12} md={6} lg={4} key={id} sx={posts.length === 1 ? {marginLeft:"0px"}:{}}>
                    <Card sx={{ width: "100%", boxShadow: "none" }} >
                    
                <CardMedia
                  sx={{ objectFit: "fill", borderRadius: "20px" }}
                  component="img"
                  height="400"
                  image={postImage}
                  alt="Paella dish"
                />
                <CardActions
                  disableSpacing
                  sx={{ justifyContent: "space-between" }}
                >
                  <IconButton onClick={Likes}>
                    {likes === 0 ? (
                      <img
                        src={like}
                        style={{ marginRight: "10px" }}
                        alt="like"
                      />
                    ) : (
                      <img
                        src={liked}
                        style={{ marginRight: "10px" }}
                        alt="likes"
                      />
                    )}
                    {likes}
                  </IconButton>
                  <IconButton onClick={Bookmarkes}>
                    {bookmarkedd === 0 ? (
                      <img src={bookmark}  alt="bookmark" />
                    ) : (
                      <img
                        src={bookmarked}
                        alt="bookmarked"
                      />
                    )}
                  </IconButton>
                </CardActions>
                <CardContent sx={{ paddingTop: "0px" }}>
                  <Typography variant="body2" sx={{fontSize:"18px"}} color="text.secondary">
                    {description}
                  </Typography>
                </CardContent>
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      padding: "12px 14px",
                      borderRadius: "100px",
                      background: "#F5EFE1",
                      // color: "rgb(181, 181, 181, 1)",
                      whiteSpace:"nowrap",
                      fontFamily: "Inter,sans-serif",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal"
                    }}
                    color="text.secondary"
                  >
                    {postCategory?.name}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "22px", fontWeight: 700, color: "black" }}
                  >
                     {new Intl.NumberFormat().format(parseFloat(price)*10)} <span style={{ color: "#E2A882" }}>SUM</span>
                  </Typography>
                </CardContent>
                    </Card>
                    </Grid>
                  )
                )}
              
          </Grid>
    </Box>
     );
}
 
export default MasterPosts;