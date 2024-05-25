import { Pagination, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({screen, pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <Row className="mb-5 mt-2">
        <Pagination className="justify-content-center">
          {[...Array(pages).keys()].map((x) => (
            <LinkContainer
              key={x + 1}
              to={
                !isAdmin
                  ? keyword
                    ? `/${screen}/${keyword}/page/${x + 1}`
                    : `/${screen}/page/${x + 1}`
                  : `/`
              }
            >
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          ))}
        </Pagination>
      </Row>
    )
  );
};

export default Paginate;
