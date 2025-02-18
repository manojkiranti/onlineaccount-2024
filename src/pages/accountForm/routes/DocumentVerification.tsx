import { useEffect, useState } from "react";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, ConfigProvider, Flex, Row, Upload } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { UploadFile } from "antd";
import AccountFormLayout from "../components/AccountFormLayout";

import { documentVerificationSchema } from "../schema";
import { DocumentVerificationType } from "../types";
import Dragger from "antd/es/upload/Dragger";
import { useNavigate, useParams } from "react-router-dom";
import { usePostStepFiveMutation, useUploadFileMutation } from "../api/stepAPI";
import Title from "antd/es/typography/Title";
import { displaySuccess } from "@/utils/displayMessageUtils";

const DocumentVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(documentVerificationSchema),
  });

  const [postStepFive, {isLoading: postStepFiveLoading}] = usePostStepFiveMutation();

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<DocumentVerificationType> = (data) => {
    postStepFive({token: token as string}).unwrap()
    .then((res) => {

    }).catch((error) => {
    })
  };

  const handleBeforeUpload = (file: any) => {
    console.log("before upload", file);
    setFileList([...fileList, file]);
  };
  const handleRemove = (file: any) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  };
  const handleOnChange = (info: any) => {
    const { file } = info;

    if (file.status === 'done' || file.status === 'removed') {
      console.log("file", info);
      displaySuccess(file?.response?.message)
    }
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Collapse: {
              headerBg: "#fff",
              headerPadding: "16px 16px",
            },
          },
        }}
      >
        <AccountFormLayout currentStep={4} currentStepProgress={30}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ marginBottom: "1rem" }}>
              <Collapse
                defaultActiveKey={["1"]}
                items={[
                  {
                    key: "1",
                    label: "Document Upload",
                    children: (
                      <div style={{ width: "100%" }}>
                        <Row gutter={30}>
                          <Col xs={24} md={24}>
                            <div className="form-control">
                              <Title level={4}>
                                {" "}
                                Upload your recently taken PP size photo here.
                              </Title>
                              <Dragger
                                name="photo"
                                beforeUpload={handleBeforeUpload}
                                onRemove={handleRemove}
                                onChange={handleOnChange}
                                multiple={false}
                                action={`http://110.34.30.245:1113/api/online/document/upload/${token}`}
                                maxCount={1}
                                accept="image/jpeg, image/png"
                              >
                                <p className="ant-upload-drag-icon">
                                  <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                  Click or drag file to this area to upload
                                </p>
               
                              </Dragger>
                            </div>
                          </Col>
                          <Col xs={24} md={24}>
                            <div className="form-control">
                              <Title level={4}>
                                {" "}
                                Citizenship Front
                              </Title>
                              <Dragger
                                name="citizenship_front"
                                beforeUpload={handleBeforeUpload}
                                onRemove={handleRemove}
                                onChange={handleOnChange}
                                multiple={false}
                                action={`http://110.34.30.245:1113/api/online/document/upload/${token}`}
                                maxCount={1}
                              >
                                <p className="ant-upload-drag-icon">
                                  <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                  Click or drag file to this area to upload
                                </p>
                    
                              </Dragger>
                            </div>
                          </Col>
                          <Col xs={24} md={24}>
                            <div className="form-control">
                              <Title level={4}>
                                {" "}
                                Citizenship Back
                              </Title>
                              <Dragger
                                name="citizenship_front"
                                beforeUpload={handleBeforeUpload}
                                onRemove={handleRemove}
                                onChange={handleOnChange}
                                multiple={false}
                                action={`http://110.34.30.245:1113/api/online/document/upload/${token}`}
                                maxCount={1}
                              >
                                <p className="ant-upload-drag-icon">
                                  <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                  Click or drag file to this area to upload
                                </p>
                    
                              </Dragger>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    ),
                  },
                ]}
              />
            </div>

            
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                block
                style={{ fontWeight: 700, height: "50px", marginBottom:"2rem" }}
                disabled={postStepFiveLoading}
                loading={postStepFiveLoading}
              >
                Save & Continue
              </Button>
      
          </form>
        </AccountFormLayout>
      </ConfigProvider>
    </>
  );
};

export default DocumentVerification;
