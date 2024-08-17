import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loader from "./Loader";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };

  PropTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0,
      
    };
    document.title="monkey News-"+this.props.category;
  }

  async updateNews() {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4bf1a56c3e4b45fb9c1923aae5ab14f8&page=1&pagesize=${this.props.pagesize}`;
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults,
    });
    this.props.setProgress(100);
  }

  async componentDidMount(props) {
    this.updateNews();
  }
  handleprevClick = async () => {
    this.setState({
      page: this.state.page - 1,
    });
    this.updateNews();
  };

  handlenextClick = async () => {
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pagesize)
    ) {
    } else {
      this.updateNews();
      this.setState({
        page: this.state.page + 1,
      });
    }
  };

  fetchMoreData = async() => {
    
   this.setState({
    page:this.state.page+1
   })
   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4bf1a56c3e4b45fb9c1923aae5ab14f8&page=1&pagesize=${this.props.pagesize}`;
   let data = await fetch(url);
   let parsedata = await data.json();
   this.setState({
     articles:this.state.articles.concat(parsedata.articles) ,
     totalResults: parsedata.totalResults,
   });
  };
  render() {
    return (
      <div>
      
          <h1 className="text-center">News Monkey - Top Headlines</h1>
          {/* {this.state.loading ? "" : <Loader />} */}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loader/>}>
  <div className="container my-3 ">
          <div className="row my-3">
         
            {this.state.articles.map((element) => {
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
              disabled={this.state.page <= 1}
              className="btn btn-dark mx-3"
              onClick={this.handleprevClick}
            >
              &larr; previous
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pagesize)
              }
              className="btn btn-dark mx-3"
              onClick={this.handlenextClick}
            >
              Next &rarr;
            </button> */}
          </div>
       
      </div>
    );
  }
}

export default News;
