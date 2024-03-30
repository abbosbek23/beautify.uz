/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionComponent, useState } from "react";
import logouser from "../../assets/user.png";
import like from "../../assets/likes.svg";
import liked from "../../assets/liked.svg";
import bookmark from "../../assets/Bookmark.svg";
import bookmarked from "../../assets/Bookmarked.svg";
import Booking from "./booking/booking";
import {
  Typography,
  Avatar,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  Card,
} from "@mui/material";
import { Box } from "@mui/system";
import { Api,} from "../../modules/auth";

interface PostsProps {
     name: string;
  id: number | null;
  description: string;
  categoryPosition: {
    name: string;
  };
  imagePost: string;
  user: {
    id: number | null;
    full_name: string;
    address: {
      id: number | null;
      region: string;
      district: string;
      mahalla: string;
      house: string;
    };
    image: string;
  };
  price: string;
  posts: any;
    is_like: any;
    is_bookmark: any;
    favorites_count:number | null;
  }

const Posts: FunctionComponent<PostsProps> = ({
  is_bookmark,
  is_like,
  id,
  description,
  categoryPosition,
  imagePost,
  user,
  price,
  favorites_count
}) => {
    const [likes, setLike] = useState(is_like ? 1 : 0);
    const [bookmarkedd, setBookmark] = useState(is_bookmark ? 1 : 0);


    const LikesPost = async() => {
      try {
        const { data } = await Api.Like({
          service: id,
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      setLike(likes === 0 ? 1 : 0);
    }

    const SavedPost = async() => {
      try {
        const { data } = await Api.Bookmarks({
          service: id,
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      setBookmark(bookmarkedd === 0 ? 1 : 0);
    }

return (
    // <Grid width="100%" container spacing={2} padding={2}>
    //   {posts.map(({ description,is_like,favorites_count,is_saved, category: postCategory, image: postImage, user, price, id}) => (
       
          <Card sx={{ width: "100%", boxShadow: "none" }}>
            <CardHeader
              sx={{ paddingLeft: "0px", paddingRight: "5px" }}
              avatar={
                <Avatar aria-label="recipe">
                  <img src={user.image === null ? logouser : user.image} width={40} height={40} alt="" />
                </Avatar>
              }
              action={
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginRight: "10px" }}>
                  <Booking id={user.id} />
                </Box>
              }
              title={user.full_name}
              subheader={
                <Typography
                  sx={{
                    whiteSpace: "nowrap",
                    fontSize: "13px",
                    "@media (max-width: 1150px)": { whiteSpace: "break-spaces" },
                  }}
                >
                  {user.address.region + " " + user.address.district + " " + user.address.mahalla + " " + user.address.house}
                </Typography>
              }
            />
            <CardMedia sx={{ objectFit: "fill", borderRadius: "20px" }} component="img" height="600" image={imagePost} alt="Paella dish" />
            <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
            <Box
                          onClick={LikesPost}
                          sx={{ display: "flex", alignItems: "center", marginLeft: "0px" }}
                        >
                          {likes === 1 ? (
                            <img
                              src={liked}
                              style={{ marginRight: "10px", marginLeft: "0px" }}
                              alt="likes"
                            />
                          ) : (
                            <img
                              src={like}
                              style={{ marginRight: "10px", marginLeft: "0px" }}
                              alt="like"
                            />
                          )}
                          <Typography
                            sx={{
                              color: "#000",
                              fontFamily: "Inter,sans-serif",
                              fontSize: "28px",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "normal",
                            }}
                          >
                            {likes === 1 ? (favorites_count ? favorites_count + 1 : 1) : (favorites_count || 0)}
                          </Typography>
                        </Box>
                        <Box
                          onClick={SavedPost}
                          sx={{ display: "flex", alignItems: "center", marginRight: "0px" }}
                        >
                          {bookmarkedd === 1 ? (
                            <img
                              src={bookmarked}
                              alt="bookmarked"
                              width={31}
                              height={31}
                              style={{ marginRight: "0px", marginLeft: "0px" }}
                            />
                          ) : (
                            <img
                              src={bookmark}
                              width={36}
                              height={36}
                              style={{ marginRight: "0px", marginLeft: "0px" }}
                              alt="bookmark"
                            />
                          )}
                        </Box>
            </CardActions>
            <CardContent sx={{ paddingTop: "0px" }}>
              <Typography variant="body2" sx={{ fontSize: "18px" }} color="text.secondary">
                {description}
              </Typography>
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
                {categoryPosition?.name}
              </Typography>
              <Typography sx={{ fontSize: "22px", fontWeight: 700, color: "black" }}>
                {new Intl.NumberFormat().format(parseFloat(price) * 10)} <span style={{ color: "#E2A882" }}>SUM</span>
              </Typography>
            </CardContent>
          </Card>
  );
};

export default Posts;
