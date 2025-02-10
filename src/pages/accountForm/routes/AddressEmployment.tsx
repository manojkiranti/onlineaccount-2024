import { useEffect, useState } from "react";
import { Card, Col, Collapse, Row } from "antd";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Title from "antd/es/typography/Title";
import AccountFormLayout from "../components/AccountFormLayout";

import { CheckBoxField, InputField, SelectField } from "@/components/Form";
import { addressEmploymentSchema } from "../schema";
import { AddressEmploymentType, DocumentVerificationType } from "../types";

const AddressEmployment = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addressEmploymentSchema),
  });

  const watchAddressType = watch("isTempAddressSame");

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<AddressEmploymentType> = (data) => {};
  return (
    <>
      <AccountFormLayout currentStep={2} currentStepProgress={50}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: "1rem" }}>
            <Collapse
              defaultActiveKey={["1"]}
              items={[
                {
                  key: "1",
                  label: "Permanent Address",
                  children: (
                    <div style={{ width: "100%" }}>
                      <Row gutter={30}>
                        <Col xs={24} md={8}>
                          <SelectField
                            label="State"
                            name="state"
                            control={control}
                            error={errors.state?.message ?? ""}
                            options={[
                              { label: "Bagmati Pradesh", value: "bagmati" },
                              { label: "Gandaki Pradesh", value: "gandaki" },
                            ]}
                            required={true}
                          />
                        </Col>
                        <Col xs={24} md={8}>
                          <SelectField
                            label="District"
                            name="district"
                            control={control}
                            error={errors.district?.message ?? ""}
                            options={[
                              { label: "District One", value: "district_1" },
                              { label: "District Two", value: "district_2" },
                            ]}
                            required={true}
                          />
                        </Col>
                        <Col xs={24} md={8}>
                          <SelectField
                            label="Town/City"
                            name="city"
                            control={control}
                            error={errors.city?.message ?? ""}
                            options={[
                              { label: "Town/city One", value: "city_1" },
                              { label: "Town/city Two", value: "city_2" },
                            ]}
                            required={true}
                          />
                        </Col>
                        <Col xs={24} md={8}>
                          <InputField
                            label="Street Name/TOL"
                            name="streetName"
                            control={control}
                            error={errors.streetName?.message ?? ""}
                            required={true}
                          />
                        </Col>
                        <Col xs={24} md={8}>
                          <InputField
                            label="Ward No"
                            name="wardNumber"
                            control={control}
                            error={errors.wardNumber?.message ?? ""}
                            required={true}
                          />
                        </Col>
                        <Col xs={24} md={8}>
                          <InputField
                            label="House Number"
                            name="houseNumber"
                            control={control}
                            error={errors.houseNumber?.message ?? ""}
                            required={true}
                          />
                        </Col>
                      </Row>
                    </div>
                  ),
                },
              ]}
            />
          </div>
          <div style={{ marginBottom: "0.1rem" }}>
            <Row>
              <Col>
                <CheckBoxField
                  label="Is Temporary Address Same as Permanent Address"
                  name="isTempAddressSame"
                  control={control}
                  error={errors.isTempAddressSame?.message ?? ""}
                />
              </Col>
            </Row>
          </div>

          {!watchAddressType && (
            <div style={{ marginBottom: "1rem" }}>
              <Collapse
                defaultActiveKey={["1"]}
                items={[
                  {
                    key: "1",
                    label: "Temporary Address",
                    children: (
                      <div style={{ width: "100%" }}>
                        <Row gutter={30}>
                          <Col xs={24} md={8}>
                            <SelectField
                              label="State"
                              name="tempState"
                              control={control}
                              error={errors.tempState?.message ?? ""}
                              options={[
                                { label: "Bagmati Pradesh", value: "bagmati" },
                                { label: "Gandaki Pradesh", value: "gandaki" },
                              ]}
                              required={true}
                            />
                          </Col>
                          <Col xs={24} md={8}>
                            <SelectField
                              label="District"
                              name="tempDistrict"
                              control={control}
                              error={errors.tempDistrict?.message ?? ""}
                              options={[
                                { label: "District One", value: "district_1" },
                                { label: "District Two", value: "district_2" },
                              ]}
                              required={true}
                            />
                          </Col>
                          <Col xs={24} md={8}>
                            <SelectField
                              label="Town/City"
                              name="tempCity"
                              control={control}
                              error={errors.tempCity?.message ?? ""}
                              options={[
                                { label: "Town/city One", value: "city_1" },
                                { label: "Town/city Two", value: "city_2" },
                              ]}
                              required={true}
                            />
                          </Col>
                          <Col xs={24} md={8}>
                            <InputField
                              label="Street Name/TOL"
                              name="tempStreetName"
                              control={control}
                              error={errors.tempStreetName?.message ?? ""}
                              required={true}
                            />
                          </Col>
                          <Col xs={24} md={8}>
                            <InputField
                              label="Ward No"
                              name="tempWardNumber"
                              control={control}
                              error={errors.tempWardNumber?.message ?? ""}
                              required={true}
                            />
                          </Col>
                          <Col xs={24} md={8}>
                            <InputField
                              label="House Number"
                              name="tempHouseNumber"
                              control={control}
                              error={errors.tempHouseNumber?.message ?? ""}
                              required={true}
                            />
                          </Col>
                        </Row>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          )}
        </form>
      </AccountFormLayout>
    </>
  );
};

export default AddressEmployment;
