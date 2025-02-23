import { useEffect, useState } from "react";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, ConfigProvider, Flex, Row, Upload, Image } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { UploadFile } from "antd";
import AccountFormLayout from "../components/AccountFormLayout";

import { documentVerificationSchema } from "../schema";
import { DocumentVerificationType } from "../types";
import Dragger from "antd/es/upload/Dragger";
import { useNavigate, useParams } from "react-router-dom";
import { useGetRequiredDocumentsQuery, usePostStepFiveMutation, useUploadFileMutation } from "../api/stepAPI";
import Title from "antd/es/typography/Title";
import { displayErrorMsg, displaySuccess } from "@/utils/displayMessageUtils";

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
  const {data: requiredDocuments, refetch} = useGetRequiredDocumentsQuery(token || "", {skip: !token});
  console.log("requiredDocuments", requiredDocuments)

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<DocumentVerificationType> = (data) => {
    postStepFive({token: token as string}).unwrap()
    .then((res) => {
      console.log()
      navigate(`/online-apply/final-step?code=${res.data?.online_reference_code}&message=${res?.message}&name=${res?.data?.account_name}`)
    }).catch((err) => {
      displayErrorMsg(err?.data?.message)
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
    console.log("on change", info);
    const { file } = info;

    if (file.status === "error") {
      displayErrorMsg(file?.response?.message)
    }

    if (file.status === 'done' || file.status === 'removed') {
      console.log("file", info);
      displaySuccess(file?.response?.message)
    }

    if (file.status === 'done') {
      console.log("file", info);
      refetch()
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
                        
                          {requiredDocuments && requiredDocuments?.data?.scheme_documents.map((doc:any, index:number) => {
                            const hasImage = requiredDocuments?.data?.account_documents.some((acDoc:any) => acDoc.document_type === doc.document_type);
                            return (
                              <Row gutter={30} key={doc.id}>
                                <Col xs={24} md={hasImage ? 12:24}>
                                  <div className="form-control">
                                    <Title level={4}>
                                      {doc.document_name}
                                    </Title>
                                    <Dragger
                                      name={doc.document_type}
                                      beforeUpload={handleBeforeUpload}
                                      onRemove={handleRemove}
                                      onChange={handleOnChange}
                                      multiple={false}
                                      action={`${import.meta.env.VITE_BACKEND_URL}/api/online/document/upload/${token}`}
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
                                {hasImage &&  <Col xs={24} md={12}>
                                  <Image height="200px" src={requiredDocuments?.data?.account_documents[index].full_url} />
                                
                                </Col>}
                              </Row>
                          
                            )
                          })}
                      
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
