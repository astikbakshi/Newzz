import React, { useEffect , useState} from 'react'
import Spinner from './Spinner';
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  



const capitalizeFirstLetter = (string) =>{
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const updateNews = async()=>{

  props.setProgress(10);
     const url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=46e3e37c413b4b6fbb7fcacaf93c2f3b&page=1&pageSize=${props.pageSize}`;
    
     setLoading(true)
     let data = await fetch(url);
     props.setProgress(30);
     let parsedData = await data.json();
     props.setProgress(70);
     console.log(parsedData);
     setArticles(parsedData.articles)
     setTotalResults(parsedData.totalResults)
     setLoading(false)
    
    //  console.log(parsedData.data);
    props.setProgress(100);
}

useEffect(() => {
  updateNews();
   document.title = `Newzz - ${capitalizeFirstLetter(props.category)}`;

}, [])


 

  
  

  

  const fetchMoreData = async () => {
    const url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=46e3e37c413b4b6fbb7fcacaf93c2f3b&page=${page+1}&pageSize=${props.pageSize}`;

   setPage(page+1)

let data = await fetch(url);
      let parsedData = await data.json();

      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
  }

 
    return (
      <>
        <h3 className="text-center" style = {{margin : '35px 0px', marginTop : '90px'}}>Newzz - Top {capitalizeFirstLetter(props.category)} Headlines</h3> 
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={loading || <Spinner/>}
        >
          <div className="container">
        <div className="row">
          { articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
             <NewsItem title={element.title?element.title:""} description={element.description?element.description.split(" ").splice(0,30).join(" "):""} imgUrl={element.urlToImage?element.urlToImage: "https://us.123rf.com/450wm/alhovik/alhovik1709/alhovik170900031/86481591-breaking-news-background-world-global-tv-news-banner-design.jpg?ver=6"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
   
             </div>
          })}
         
          
          
        </div>
        </div>
        </InfiniteScroll>
        

      
        
       
      </>
    )
  
}

News.defaultProps = {
  country:'in',
  pageSize: 8,
  category:'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News
