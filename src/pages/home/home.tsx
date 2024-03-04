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
import { red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Grid from "@mui/system/Unstable_Grid";
import postImage from "../../assets/8e3saek8.png"
import ShareIcon from '@mui/icons-material/Share';
import like from "../../assets/likes.svg"
import liked from "../../assets/liked.svg"
import bookmark from "../../assets/Bookmark.svg"
import bookmarked from "../../assets/Bookmarked.svg"
import { getCategory } from "../../api/api";
import { ICategory } from "../../interface";


interface HomeProps {
  name:string
}


const Home: FunctionComponent<HomeProps> = () => {
  const [likes, setLikes] = useState(0);
  const [bookmarkedd, setBookmark] = useState(0);
  const [clickedCategory,setClickedCategory] = useState()
  const [currentParent,setParent] = useState()


  const [category,setCategory] = useState<ICategory[]>([{
    name:"",
    parent:null,
    id:null
  }])
  const [categoryfiltered,setCategoryFiltered] = useState([])

  useEffect(()=>{
    (async () => {
      const {data}: ICategory[] = await getCategory();

      setCategory(data)
    })();
  },[])

   const CategoryFilter = (id:any) =>{
      const categoryparent = category.filter(item => item.parent === id)
      setCategoryFiltered(categoryparent)
      setClickedCategory(id)
   }

   const categoryParent = (id: any) =>{
      setParent(id)
   }
   
  const Likes = async () => {
    if(likes === 0){
      setLikes(1)
    }else{
      setLikes(0)
    }
  }
  const Bookmarkes = async () => {
    if(bookmarkedd === 0){
      setBookmark(1)
    }else{
      setBookmark(0)
    }
  }
  return (
    <>
      <Box>
        <Box
          className={"chippers"}
          sx={{
            marginTop: "24px",
            marginRight: "60px",
            marginLeft: "0px",
            overflow: "scroll",
            overflowY: "hidden",
            width:"100%"
          }}
        >
          <Box sx={{display:"flex",flexWrap:"nowrap",alignItems:"center",width:"100%",padding:"0px 30px"}}>
          {
            category.filter(item => item.parent === null).map(({name,id}:ICategory)=><button
            key={id} 
            className={clickedCategory === id ? "activeddButton":"activedButton"} 
            onClick={()=>CategoryFilter(id)}
            style={clickedCategory === id ?{borderRadius:"100px",background:"black",color:"white",display:"flex",flexWrap:"nowrap"}:{marginRight:"10px",marginBottom:"10px",borderRadius:"100px",display:"flex",flexWrap:"nowrap"}}
            >{name}</button>)
          }
          </Box>
          <hr style={{width:"100%"}}/>
          <Box sx={{display:"flex",flexWrap:"nowrap",alignItems:"center",width:"100%",padding:"0px 30px"}}>
          {
            categoryfiltered?.map(({name,id}:ICategory)=><button
            key={id} 
            className={currentParent === id ? "activeddButton":"activedButton"} 
            onClick={()=>categoryParent(id)}
            style={{marginTop:"10px"}}
            >{name}</button>)
          }
          </Box>
        </Box>
        <Box>
          <Grid width="100%" container spacing={2} padding={5}>
            <Grid item xs={6}>
              <Card sx={{ width:"100%", boxShadow: "none",}}>
                <CardHeader sx={{paddingLeft:"0px",paddingRight:"15px"}}
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      R
                    </Avatar>
                  }
                  action={
                    <>
                      <Button variant="outline" sx={{border:"1px solid #B5B5B5",borderRadius:"100px"}}>Band qilish</Button>
                      <IconButton aria-label="settings">
                        <ShareIcon/>
                      </IconButton>
                    </>
                  }
                  title="Shrimp and Chorizo Paella"
                  subheader="September 14, 2016"
                />
                <CardMedia
                sx={{objectFit:"fill",borderRadius:"20px"}}
                  component="img"
                  height="600"
                  image={postImage}
                  alt="Paella dish"
                />
                <CardActions disableSpacing sx={{justifyContent:"space-between"}}>
                  <IconButton>
                 {
                  likes === 0 ? (<img src={like} onClick={Likes} style={{marginRight:"10px"}} alt="like"/>):(<img src={liked} style={{marginRight:"10px"}} onClick={Likes} alt="likes"/>)
                 }{likes}
                 </IconButton>
                 <IconButton>
                 {
                  bookmarkedd === 0 ? (<img src={bookmark} onClick={Bookmarkes} alt="bookmark"/>):(<img src={bookmarked} onClick={Bookmarkes} alt="bookmarked"/>)
                 }
                 </IconButton>
                </CardActions>
                <CardContent sx={{paddingTop:"0px"}}>
                  <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun
                    meal to cook together with your guests. Add 1 cup of frozen
                    peas along with the mussels, if you like.
                  </Typography>
                </CardContent>
                <CardContent sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <Typography sx={{width:"90px",padding:"12px 20px",borderRadius:"100px",background:"rgba(98, 93, 211, 0.15)",color:"#625DD3"}}>
                    Styling
                  </Typography>
                  <Typography sx={{fontSize: "22px",fontWeight:700,color:"black"}}>
                  250,000 <span style={{color:"#625DD3"}}>SUM</span>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ width:"100%", boxShadow: "none" }}>
                <CardHeader sx={{paddingLeft:"0px",paddingRight:"15px"}}
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      R
                    </Avatar>
                  }
                  action={
                    <>
                      <Button  variant="outline" sx={{border:"1px solid #B5B5B5",borderRadius:"100px"}}>Band qilish</Button>
                      <IconButton aria-label="settings">
                        <ShareIcon/>
                      </IconButton>
                    </>
                  }
                  title="Shrimp and Chorizo Paella"
                  subheader="September 14, 2016"
                />
                <CardMedia
                  sx={{objectFit:"fill",borderRadius:"20px"}}
                  component="img"
                  height="600"
                  image={postImage}
                  alt="Paella dish"
                />
                <CardActions disableSpacing sx={{justifyContent:"space-between"}}>
                  <IconButton>
                 {
                  likes === 0 ? (<img src={like} onClick={Likes} alt="like"/>):(<img src={liked} onClick={Likes} alt="likes"/>)
                 }{likes}
                 </IconButton> 
                 <IconButton>
                 {
                  bookmarkedd === 0 ? (<img src={bookmark} onClick={Bookmarkes} alt="bookmark"/>):(<img src={bookmarked} onClick={Bookmarkes} alt="bookmarked"/>)
                 }
                 </IconButton>
                </CardActions>
                <CardContent sx={{paddingTop:"0px"}}>
                  <Typography  variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun
                    meal to cook together with your guests. Add 1 cup of frozen
                    peas along with the mussels, if you like.
                  </Typography>
                </CardContent>
                <CardContent sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <Typography sx={{width:"90px",padding:"12px 20px",borderRadius:"100px",background:"rgba(98, 93, 211, 0.15)",color:"#625DD3"}}>
                    Styling
                  </Typography>
                  <Typography sx={{fontSize: "22px",fontWeight:700,color:"black"}}>
                  250,000 <span style={{color:"#625DD3"}}>SUM</span>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Home;