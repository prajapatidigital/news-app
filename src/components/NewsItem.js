import React from 'react'

const NewsItem =(props)=> {
   

 
    let {title,description,imgurl,newsurl} = props;
    return (
      <div>


        <div className="card my-3" style={{height:"100%"}}>
          <img src={!imgurl?"https://cdn.ndtv.com/common/images/ogndtv.png ":imgurl} className="card-img-top" alt="..." width={100} height={200}/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a  rel='noreferrer' href={newsurl}  target='_blank' className="btn btn-primary">read more</a>
          </div>
        </div>
      </div>
    )
}

export default NewsItem