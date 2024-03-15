/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/system";
import { FunctionComponent, useEffect, useState } from "react";
import "./index.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/system/Unstable_Grid";
import like from "../../assets/likes.svg";
import liked from "../../assets/liked.svg";
import bookmark from "../../assets/Bookmark.svg";
import bookmarked from "../../assets/Bookmarked.svg";
import { getCategory } from "../../api/api";
import { ICategory } from "../../interface";
import {  NewPostss } from "../../modules/auth/api";
import { Api, Types } from "../../modules/auth";
import shareIcon from "../../assets/shareIcon.svg"  
import logouser from "../../assets/user.png"

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const [likes, setLikes] = useState(0);
  const [bookmarkedd, setBookmark] = useState(0);
  const [clickedCategory, setClickedCategory] = useState();
  const [currentParent, setParent] = useState();
  const [categoryfiltered, setCategoryFiltered] = useState<ICategory[]>([]);
  
  //timeselect
  const [selectedTime, setSelectedTime] = useState<string>("00:00");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(event.target.value);
  };

  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
  const minutes = Array.from({ length: 4 }, (_, i) => String(i * 15).padStart(2, '0'));
  const options = hours.flatMap(hour => minutes.map(minute => `${hour}:${minute}`));


  const [category, setCategory] = useState<ICategory[]>([
    {
      name: "",
      parent: null,
      id: null,
      data: undefined,
      success: false,
      category:null,
    },
  ]);
  const [posts, setPosts] = useState<Types.IForm.PostsApi[]>(
   [ {
      id: null,
      name: "",
      price: "",
      description: "",
      category: undefined,
      duration: "",
      image: "",
      user: {
        full_name: "",
        address: {
          id: null,
          region: "",
          district: "",
          mahalla: "",
          house: "",
        },
        image: "",
        },
        is_like: "",
        is_saved: "",
      data: undefined,
      filteredPosts:undefined
    },]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const { data: categoryData, success } = await getCategory();
        if (success) {
          categoryData.unshift(categoryData.splice(36, 1)[0]);
          setCategory(categoryData);

          const { data: postData } = await NewPostss();
          const filteredPosts = postData.map(post => ({
            ...post,
            category: categoryData.find((cat: any) => cat.id === post.category)
          }));
          setPosts(filteredPosts);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  
  const categoryfilteredPosts = async (id:any) => {
    try {
      const {data} = await Api.CategoryPosts(id)
      console.log(data);
      const filteredPosts = data.map(post =>({
        ...post,
        category: category.find((cat:any) => cat.id === post.category)
      }))
      setPosts(filteredPosts)
    } catch (error) {
      console.log(error);
    }
  }
  const CategoryFilter = async(id: any) => {
    const categoryparent = category.filter((item) => item.parent === id);
    if(id === 36){
      const { data } = await NewPostss();
      setPosts(data)
    }
    categoryfilteredPosts(id)
    setCategoryFiltered(categoryparent);
    setClickedCategory(id);
  };

  const categoryParent = (id: any) => {
    setParent(id);
    categoryfilteredPosts(id)
  };

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
    <>
      <Box>
        <Box
          className={"chippers"}
          sx={{
            marginTop: "24px",
            marginRight: "60px",
            marginLeft: "0px",
            width: "100%",
          }}
        >
          <Box
            className={"chippers"}
            sx={{
              overflow: "scroll",
              overflowY: "hidden",
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "center",
              width: "100%",
              padding: "0px 30px",
            }}
          >
            
            {category
              .filter((item) => item.parent === null)
              .map(({ name, id }: ICategory) => (
                <button
                  key={id}
                  className={
                    clickedCategory === id ? "activeddButton" : "activedButton"
                  }
                  onClick={() => CategoryFilter(id)}
                  style={{ whiteSpace: "nowrap" }}
                  // style={clickedCategory === id ?{borderRadius:"100px",background:"black",color:"white",display:"flex",flexWrap:"nowrap"}:{marginRight:"10px",marginBottom:"10px",borderRadius:"100px",display:"flex",flexWrap:"nowrap"}}
                >
                  {name}
                </button>
              ))}
          </Box>
          <hr style={{ width: "100%" }} />
          <Box
            className={"chippers"}
            sx={{
              overflow: "scroll",
              overflowY: "hidden",
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "center",
              width: "100%",
              padding: "0px 30px",
            }}
          >
            {categoryfiltered?.map(({ name, id }: ICategory) => (
              <button
                key={id}
                className={
                  currentParent === id ? "activeddButton" : "activedButton"
                }
                onClick={() => categoryParent(id)}
                style={{
                  marginTop: "10px",
                 
                  whiteSpace: "nowrap",
                }}
              >
                {name}
              </button>
            ))}
          </Box>
        </Box>
        <Box>
          <Grid width="100%" container spacing={2} padding={2}>
                {posts?.map(
                  ({  description,  category:postCategory, image: postImage, user, price, id }: Types.IForm.PostsApi) => (
                    <Grid   xs={12} sm={12} md={6} lg={6} key={id} sx={posts.length === 1 ? {marginLeft:"0px"}:{}}>
                    <Card sx={{ width: "100%", boxShadow: "none" }} >
                    <CardHeader
                  sx={{ paddingLeft: "0px", paddingRight: "5px" }}
                  avatar={
                    <Avatar aria-label="recipe">
                      <img src={user.image === null ? logouser:user.image} width={30} height={30} alt="" />
                    </Avatar>
                  }
                  action={
                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <Button
                        variant="outlined"
                        sx={{
                          border: "1px solid #B5B5B5",
                          borderRadius: "100px",
                          color:"#000"
                        }}
                      >
                        Book
                      </Button>
                      <IconButton aria-label="settings" sx={{"&:hover": {backgroundColor:"white"}}}>
                        <img src={shareIcon} alt="" />  
                      </IconButton>
                    </Box>
                  }
                  title={user.full_name}
                  subheader={<Typography sx={{whiteSpace:"nowrap",fontSize:"13px",'@media (max-width: 1150px)': {
                    whiteSpace:"break-spaces"
                  }}}>{user.address.region+" "+user.address.district+" "+user.address.mahalla+" "+user.address.house}</Typography>}
                />
                <CardMedia
                  sx={{ objectFit: "fill", borderRadius: "20px" }}
                  component="img"
                  height="600"
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
                    {price} <span style={{ color: "#E2A882" }}>SUM</span>
                  </Typography>
                </CardContent>
                    </Card>
                    </Grid>
                  )
                )}
              
          </Grid>
        </Box>
        <select value={selectedTime} onChange={handleChange}>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      </Box>
    </>
  );
};

export default Home;
