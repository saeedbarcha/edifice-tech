import React from 'react'
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUsers, FaBlogger, FaBookMedical, FaServicestack } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa6";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { MdStar, MdImage } from "react-icons/md";
import { FaBookOpenReader } from "react-icons/fa6";
const OverCard = ({ title, data, icon, link }) => {
    const renderIcon = () => {
        switch (icon) {
            case "FaUsers":
                return <FaUsers className="adminCartIcons" />;
            case "FaBlogger":
                return <FaBlogger className="adminCartIcons" />;
            case "FaBookMedical":
                return <FaBookMedical className="adminCartIcons" />;
            case "FaServicestack":
                return <FaServicestack className="adminCartIcons" />;
            case "FaProductHunt":
                return <FaProductHunt className="adminCartIcons" />;
            case "BsFillQuestionSquareFill":
                return <BsFillQuestionSquareFill className="adminCartIcons" />;
            case "MdImage":
                return <MdImage className="adminCartIcons" />;
            case "MdImage":
                return <MdImage className="adminCartIcons" />;
            case "FaBookOpenReader":
                return <FaBookOpenReader className="adminCartIcons" />;

            default:
                return <MdStar className="adminCartIcons" />;
        }
    };
    return (

        <Col sm={6} lg={3}>
            <Link to={link} style={{ textDecoration: 'none' }}>
                <div class="topCartCont">
                    <div className="iconAdminCont">
                        {renderIcon()}
                    </div>
                    <div className="titleAndValueCont">
                        <p class="topCartTitle">{title}</p>
                        <h2 class="topCartValue">{data?.total} </h2>
                    </div>
                </div>
            </Link>
        </Col>

    )
}


export default OverCard;
