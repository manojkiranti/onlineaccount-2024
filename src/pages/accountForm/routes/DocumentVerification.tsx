import { FormEvent, useEffect, useState } from "react";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Collapse,
  ConfigProvider,
  Flex,
  Row,
  Select,
  Upload,
} from "antd";
import type { UploadProps } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Title from "antd/es/typography/Title";
import AccountFormLayout from "../components/AccountFormLayout";

import { FileType } from "@/types";
import { getBase64, beforeUpload } from "@/utils/imageValidation";
import {
  DatePickerField,
  InputField,
  RadioGroupField,
  SelectField,
} from "@/components/Form";
import { documentVerificationSchema } from "../schema";
import { DocumentVerificationType } from "../types";

const documentList = [
  { value: "0", label: "Citizenship" },
  { value: "1", label: "Passport" },
  { value: "2", label: "Driver's License" },
  { value: "3", label: " Voter's ID" },
];

const DocumentVerification = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(documentVerificationSchema),
  });
  const watchMaritialStatus = watch("maritialStatus");
  const documentType = watch("documentType");

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const handleChangeSelect = (value: string) => {
    console.log(`selected ${value}`);
  };
  const onSubmit: SubmitHandler<DocumentVerificationType> = (data) => {};

  const getDocTitle = () => {
    const selectedDoc = documentList.find((doc) => doc.value === documentType);
    return selectedDoc?.label;
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
        <AccountFormLayout currentStep={1} currentStepProgress={30}>
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
                          <Col xs={24} md={12}>
                            <div className="form-control">
                              <label className="form-label">
                                {" "}
                                Upload your recently taken PP size photo here.
                              </label>
                              <Upload
                                name="file"
                                action="https://mockapi.io/api/upload"
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                              >
                                <Button
                                  icon={<UploadOutlined />}
                                  style={{ height: "45px", width: "100%" }}
                                >
                                  {" "}
                                  Click Here To Upload
                                </Button>
                              </Upload>
                            </div>
                          </Col>
                          <Col xs={24} md={12}>
                            <div className="form-control">
                              <label className="form-label">
                                Document Type
                              </label>
                              <SelectField
                                name="documentType"
                                // defaultValue="0"
                                control={control}
                                required={true}
                                options={documentList}
                              />
                            </div>
                          </Col>

                          {documentType && (
                            <Col xs={24} md={12}>
                              <div className="form-control">
                                <label className="form-label">
                                  {" "}
                                  Upload your {getDocTitle()}.
                                </label>
                                <Upload
                                  name="file"
                                  action="https://mockapi.io/api/upload"
                                  beforeUpload={beforeUpload}
                                  onChange={handleChange}
                                >
                                  <Button
                                    icon={<UploadOutlined />}
                                    style={{ height: "45px", width: "100%" }}
                                  >
                                    {" "}
                                    Click Here To Upload {getDocTitle()}
                                  </Button>
                                </Upload>
                              </div>
                            </Col>
                          )}
                        </Row>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <Collapse
                defaultActiveKey={["2"]}
                items={[
                  {
                    key: "2",
                    label: "Identification Details",
                    children: (
                      <>
                        <div style={{ width: "100%" }}>
                          <Row gutter={30}>
                            <Col xs={24} md={8}>
                              <InputField
                                label="Identification Number"
                                name="identificationNumber"
                                control={control}
                                error={
                                  errors.identificationNumber?.message ?? ""
                                }
                                required={true}
                              />
                            </Col>
                            <Col xs={24} md={8}>
                              <SelectField
                                label="Issued Place"
                                name="identificationIssuePlace"
                                control={control}
                                error={
                                  errors.identificationIssuePlace?.message ?? ""
                                }
                                options={[
                                  { label: "Kathmandu", value: "kathmandu" },
                                  { label: "Bhaktapur", value: "bhaktapur" },
                                ]}
                                required={true}
                              />
                            </Col>
                            <Col xs={24} md={8}>
                              <DatePickerField
                                label="Date of Issue"
                                name="identificationIssueDate"
                                control={control}
                                error={
                                  errors.identificationIssueDate?.message ?? ""
                                }
                                placeholder=""
                                required={true}
                              />
                            </Col>
                          </Row>
                        </div>
                      </>
                    ),
                  },
                ]}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <Collapse
                defaultActiveKey={["3"]}
                items={[
                  {
                    key: "3",
                    label: "Family Details",
                    children: (
                      <>
                        <div style={{ width: "100%" }}>
                          <Row gutter={30}>
                            <Col xs={24} md={8}>
                              <InputField
                                label="Father Name"
                                name="fatherName"
                                control={control}
                                error={errors.fatherName?.message ?? ""}
                                required={true}
                              />
                            </Col>
                            <Col xs={24} md={8}>
                              <InputField
                                label="Mother Name"
                                name="motherName"
                                control={control}
                                error={errors.motherName?.message ?? ""}
                                required={true}
                              />
                            </Col>
                            <Col xs={24} md={8}>
                              <InputField
                                label="Grand Father Name"
                                name="grandFatherName"
                                control={control}
                                error={errors.grandFatherName?.message ?? ""}
                                required={true}
                              />
                            </Col>
                            <Col xs={24} md={8}>
                              <RadioGroupField
                                label="Maritial Status"
                                name="maritialStatus"
                                control={control}
                                error={errors.maritialStatus?.message ?? ""}
                           
                                options={[
                                  { label: "Single", value: "single" },
                                  { label: "Married", value: "married" },
                                ]}
                              />
                            </Col>
                            {watchMaritialStatus === "married" && (
                              <>
                                <Col xs={24} md={8}>
                                  <InputField
                                    label="Spouse Name"
                                    name="spouseName"
                                    control={control}
                                    error={errors.spouseName?.message ?? ""}
                                    required={true}
                                  />
                                </Col>
                                <Col xs={24} md={8}>
                                  <InputField
                                    label="Father In Law Name"
                                    name="fatherInLawName"
                                    control={control}
                                    error={
                                      errors.fatherInLawName?.message ?? ""
                                    }
                                    required={true}
                                  />
                                </Col>
                              </>
                            )}
                          </Row>
                        </div>
                      </>
                    ),
                  },
                ]}
              />
            </div>
            <Flex justify="center" style={{ marginTop: "2rem" }}>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                style={{ fontWeight: 700, height: "50px" }}
              >
                Save & Continue
              </Button>
            </Flex>
          </form>
        </AccountFormLayout>
      </ConfigProvider>
    </>
  );
};

export default DocumentVerification;
