import Helmet from "react-helmet"

const TitlePage = (props: {title:string}) => { 
    return <Helmet>
        
        <title> {props.title} Modi-s E-commerce</title>  </Helmet>
}

export default TitlePage
