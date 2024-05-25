import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const SearchBox = () => {
    const navigate = useNavigate();
    const { keyword: urlKeyword } = useParams();
    const [keyword, setKeyword] = useState(urlKeyword || '');

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            setKeyword('');
            navigate(`/course/${keyword}/page/1`);
        } else {
            navigate('/');
        }
    }

    return (
        <Form onSubmit={submitHandler} className="d-flex" style={{ height: "35px", width: "250px" }}>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                placeholder='Search Course...'
                style={{
                    borderRadius: "30px"
                }}
            ></Form.Control>

            <Button type='submit' variant="outline-light" className="mx-1"
                style={{
                    borderRadius: "30px",
                    color: "white",
                    backgroundColor: "var(--blueThemeColor)",
                    padding: "0px",
                    paddingRight: "8px",
                    paddingLeft: "8px"
                }}>
                Search
            </Button>
        </Form>
    );
}

export default SearchBox;
