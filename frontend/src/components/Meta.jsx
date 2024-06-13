import { Helmet } from "react-helmet-async";


const Meta = ({title, description, keywords}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords}/>
    </Helmet>
  );
}

Meta.defaultPropd = {
    title: "Welcome to Edifice Tech",
    description: "We will rpovide best software solutions",
    keywords:"software house, software company, software, software engineering"
};

export default Meta;
