import React, { useEffect,useState } from "react";
import NewsItem from "./NewsItem";
import Loader from "./Loader";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  
 

   const updateNews= async()=> {
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4bf1a56c3e4b45fb9c1923aae5ab14f8&page=1&pagesize=${props.pagesize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(70);
    let parsedata = await data.json();
    setArticles(parsedata.articles)
    setTotalResults(parsedata.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(() =>{
    document.title="monkey News-"+props.category;
    updateNews();
  },[]) 

 
// const  handleprevClick = async () => {
// setPage(
//       page - 1,
//     );
//     updateNews();
//   };

//  const handlenextClick = async () => {
//     setPage(page + 1 >
//      updateNews()
//     ) 
//   };

   const fetchMoreData = async() => {
    setPage(page+1)
   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4bf1a56c3e4b45fb9c1923aae5ab14f8&page=${page+1}&pagesize=${props.pagesize}`;
   setPage(page+1)
   let data = await fetch(url);
   let parsedata = await data.json();
   setArticles(articles.concat(parsedata.articles))
   setTotalResults(parsedata.totalResults)
  };
  
    return (
      <div>
      
          <h1 className="text-center"style={{marginTop:"90px "}}>News Monkey - Top Headlines</h1>
      
          <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Loader/>}>
  <div className="container my-3 ">
          <div className="row my-3">
         
            {articles.map((element) => {
              return (
                
                <div className="col-md-4  " key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imgurl={element.urlToImage}
                    newsurl={element.url}
                  />
                </div>
              );
            })}
           
          </div>
       </div>
          </InfiniteScroll>

          <div className="container d-flex justify-content-between">
            {/* <button
              disabled={page <= 1}
              className="btn btn-dark mx-3"
              onClick={handleprevClick}
            >
              &larr; previous
            </button>
            <button
              disabled={
                page + 1 >
                Math.ceil(totalResults / props.pagesize)
              }
              className="btn btn-dark mx-3"
              onClick={handlenextClick}
            >
              Next &rarr;
            </button> */}
          </div>
       
      </div>
    );
  }



News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}
export default News;
