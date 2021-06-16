import React,{useState,useEffect} from 'react';
import alanBtn from  '@alan-ai/alan-sdk-web';
import NewsCards  from './components/NewsCards/NewsCards';
import useStyles from './styles.js'
import wordsToNumbers from 'words-to-numbers';
import { Typography } from '@material-ui/core';
import {IconContext} from "react-icons"
import {FaGithub, FaLinkedin, FaTwitter} from 'react-icons/fa'
import logo from './images/logo.png';
const alanKey='6549ccf48a6fa54dcb2528dc88ee69812e956eca572e1d8b807a3e2338fdd0dc/stage';
const App=()=>{
    const [newsArticles,setNewsArticles] = useState([]);
    const [activeArticle,setActiveArticle]=useState(-1);
    const classes=useStyles();
    
    useEffect(()=>{
        alanBtn({
            key:alanKey,
            onCommand:({command,articles,number})=>{
                if(command==='newHeadlines'){
                   setNewsArticles(articles);
                   setActiveArticle(-1);
                }else if(command==='highlight')
                {
                    setActiveArticle((prevActiveArticle)=>prevActiveArticle+1);
                }
                else if(command==='open'){
                    const parsedNumber = number.length>2 ? wordsToNumbers(number,{fuzzy:true}):number
                   const article = articles[parsedNumber-1];
                   if(parsedNumber>20){
                       alanBtn().playText('Please try that again');
                   }
                   else if(article){
                    window.open(article.url,'_blank');
                    alanBtn().playText('Opening...');
                   }
                }
            }
        })
    },[])
    
    return(
        <div>
           <div className={classes.logoContainer}>
               <img src="https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg" className={classes.alanLogo} alt="alan logo"></img>
           </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
            {!newsArticles.length ? (
            <div className={classes.footer}>
                <Typography variant="body1" component="h2" className={classes.name}>
                    Created by Naveen Kumar
                   
                <a className={classes.link} href="https://www.linkedin.com/in/naveen-kumar-79700a194/" target="_blank"><IconContext.Provider value={{ style: {fontSize: '30px', color: "rgb(0, 123, 255)"}}}>
       <div>
         <FaLinkedin />
       </div>
    </IconContext.Provider></a>
    <a className={classes.link} href="https://github.com/Naveen963" target="_blank"><IconContext.Provider value={{ style: {fontSize: '30px', color: "rgb(0, 123, 255)"}}}>
       <div>
         <FaGithub />
       </div>
    </IconContext.Provider></a>
                </Typography>
                
            </div>):null}
           
        </div>
        
    )
}

export default App;