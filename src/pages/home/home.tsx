/* eslint-disable no-prototype-builtins */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/system";
import { FunctionComponent, useEffect, useState } from "react";
import "./index.css";
import Grid from "@mui/system/Unstable_Grid";
import { getCategory } from "../../api/api";
import { ICategory } from "../../interface";
import {  NewPostss } from "../../modules/auth/api";
import { Api, Types } from "../../modules/auth";
// import shareIcon from "../../assets/shareIcon.svg"  

// import SelectServiceModal from "./booking/selectservicemodal";

import Posts from "./posts";

interface HomeProps {
  search:string;
}

const Home: FunctionComponent<HomeProps> = ({search}) => {
  console.log(search);
  
  const [clickedCategory, setClickedCategory] = useState();
  const [currentParent, setParent] = useState();
  const [categoryfiltered, setCategoryFiltered] = useState<ICategory[]>([]);
  // const [Liked,setLiked] = useState(false)

  

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
        id:null,
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
      filteredPosts:undefined,
      favorites_count:null,
    },]
  );

  useEffect(() => {
    document.body.style.backgroundColor = "#FFF"
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
      console.log(id);
      setCategoryFiltered(categoryparent);
    setClickedCategory(id);
    return
    }
    categoryfilteredPosts(id)
    setCategoryFiltered(categoryparent);
    setClickedCategory(id);
  };

  const categoryParent = (id: any) => {
    setParent(id);
    categoryfilteredPosts(id)
  };



  
console.log(posts);

  

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
         {/* <Posts posts={posts}/>  */}
         <Grid container spacing={2} padding={2} sx={{margin:"0px"}}>
  {posts?.map(({ description, category: postCategory, favorites_count, image: postImage, user, price, id, is_like, is_saved }: Types.IForm.PostsApi) => (
    <Grid container
    spacing={0}
    xs={12}
    sm={12}
    md={6}
    lg={6}
    key={id}
    sx={posts.length === 1 ? { marginLeft: "0px" } : {}}>
      <Posts is_bookmark={is_saved} is_like={is_like} favorites_count={favorites_count} id={id} posts={posts} description={description} categoryPosition={postCategory} imagePost={postImage} user={user} price={price} name={""} />
    </Grid>
  ))}
</Grid>
</Box>
        
        
      </Box>
    </>
  );
};

export default Home;
