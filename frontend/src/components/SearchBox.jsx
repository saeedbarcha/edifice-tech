import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const SearchBox = () => {
    const navigate = useNavigate();
    const { keyword:urlKeyword } = useParams();
    const [keyword, setKeyword] = useState(urlKeyword || '');

    const submitHandler = async(e)=> {
        e.preventDefault();
        if(keyword.trim()){
            setKeyword("");
            navigate(`/search/${keyword}`);
        }else{
            navigate('/')
        }
    }

  
  return (
    <Form onSubmit={submitHandler} className="d-flex" style={{ height:"35px", width:"350px"}}>
        <Form.Control
        type='text'
        name='q'
        onChange={(e)=> setKeyword(e.target.value)}
        value={keyword}
        placeholder='Search Products...'
        className="mr-sm-2 ml-sm-5"
        style={{
            borderRadius:"30px"
        }}
        ></Form.Control>

        <Button type='submit' variant="outline-light" className=" mx-2"     style={{
            borderRadius:"30px",
            padding:"0px",
            paddingRight:"10px",
            paddingLeft:"10px"
        }}>
            Search
        </Button>
      
    </Form>
  );
}

export default SearchBox;
