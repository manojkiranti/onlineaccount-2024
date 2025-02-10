import { Container } from "@/components/Elements";
import { Col, Row, Typography } from "antd";
import { AutoComplete, Input } from 'antd';
import Paragraph from "antd/es/typography/Paragraph";
import { SearchOutlined } from '@ant-design/icons';
import { routes } from "@/constant/routes";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Banner = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const navigate = useNavigate();
    const handleOnChange  = (val:string) => {
        console.log(val);
        // navigate to the selected route or handle it as needed
        // window.location.href = `/${val}`;
        navigate(val)
        const searchLabel = routes.find(route => route.value === val)?.label
        setSearchValue(searchLabel as string)

    }
    return (
        <>
            <div className="banner" style={{padding:"0.5rem 0 9rem"}}>
                <Container>
                    <Row>
                        <Col xs={24} md={24}>
                            <div style={{maxWidth:"1080px", margin:"0 auto", textAlign:"center"}}>
                                <Typography.Title level={2} style={{color:"#fff", marginBottom:"0.5rem"}}>One-Stop Hub for Smarter Banking!</Typography.Title>
                                <Paragraph style={{color:"#fff", marginBottom:"2rem"}}>Bank Genie: Seamless Digital Banking for All Your Financial Needs.</Paragraph>
                                <div className="search-box-wrapper">
                                    <AutoComplete
                                        style={{ width: "100%", fontSize:"16px", textAlign:"left" }}
                                        options={routes}
                                        onChange={handleOnChange}
                                        value={searchValue}
                    
                                        filterOption={(inputValue, option) =>
                                        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                        }
                                    >
                                        <Input.Search size="large" placeholder="Search all banking services..." enterButton />
                                    </AutoComplete>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Banner;