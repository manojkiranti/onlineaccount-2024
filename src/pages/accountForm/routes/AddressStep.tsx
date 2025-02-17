import { useEffect, useState } from "react";
import { Button, Card, Col, Collapse, Row } from "antd";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Title from "antd/es/typography/Title";
import AccountFormLayout from "../components/AccountFormLayout";

import { CheckBoxField, InputField, SelectField } from "@/components/Form";
import { addressSchema } from "../schema";
import { AddressType, DocumentVerificationType } from "../types";
import { useGetDistrictByProvinceQuery, useGetLocalGovernmentByDistrictQuery, useGetPrerequisitQuery } from "@/store/apis/coreApi";
import { error } from "console";
import { useNavigate, useParams } from "react-router-dom";
import { usePostStepTwoMutation } from "../api/stepAPI";
import { displayErrorMsg } from "@/utils/displayMessageUtils";
import { mapObjectKeysToSnakeCase } from "@/utils/mapper";

const AddressStep = () => {
  const navigate = useNavigate();
  const {token} = useParams();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddressType>({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      currentProvince: "",
      isPermanetSameAsCurrent: false
    }
  });

  const [postStepTwo, {isLoading: isPostStepTwoLoading}] =  usePostStepTwoMutation();

  const {data:preRequisitData } = useGetPrerequisitQuery();
  const mappedCountries = preRequisitData?.data?.countries.map((country:any) =>({
    value: country.id,
    label: country.title
  }))
  const mappedProvinces = preRequisitData?.data?.provinces.map((item:any) =>({
    value: item.id,
    label: item.title
  }))


  const watchAddressType = watch("isPermanetSameAsCurrent");
  const watchCountry = watch("currentCountry");
  const watchCurrentProvince = watch("currentProvince");
  const watchCurrentDistrict = watch("currentDistrict");

  const watchPermanentCountry = watch("permanentCountry");
  const watchPermanentProvince = watch("permanentProvince");
  const watchPermanentDistrict = watch("permanentDistrict");

  

  const {data: districtList, isLoading: districtListLoading} = useGetDistrictByProvinceQuery(watchCurrentProvince, {skip: !watchCurrentProvince});
  const {data: localGovernmentList, isLoading: localGovernmentListLoading} = useGetLocalGovernmentByDistrictQuery(watchCurrentDistrict, {skip: !watchCurrentDistrict});

  const {data: districtPermanentList, isLoading: districtPermanentListLoading} = useGetDistrictByProvinceQuery(watchPermanentProvince, {skip: !watchPermanentProvince});
  const {data: localGovernmentPermanentList, isLoading: localGovernmentPermanentListLoading} = useGetLocalGovernmentByDistrictQuery(watchPermanentDistrict, {skip: !watchPermanentDistrict});

  const mappedDistrict = districtList?.data?.map((item:any) =>({
    value: item.id,
    label: item.title
  }));

  const mappedLocalGovernment = localGovernmentList?.data?.map((item:any) =>({
    value: item.id,
    label: item.title
  }));


  const mappedPermanentDistrict = districtPermanentList?.data?.map((item:any) =>({
    value: item.id,
    label: item.title
  }));

  const mappedPermanentLocalGovernment = localGovernmentPermanentList?.data?.map((item:any) =>({
    value: item.id,
    label: item.title
  }));

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<AddressType> = (data) => {
    const currentAddress = {
      currentCountry: data.currentCountry?.toString(),
      currentProvince: data.currentProvince,
      currentDistrict: data.currentDistrict,
      currentLocalBody: data.currentLocalBody,
      currentWardNo: data.currentWardNo,
      currentStreet: data.currentStreet,
      currentTelephone: data.currentTelephone,
      currentMobile: data.currentMobile,
      currentEmail: data.currentEmail,
      currentHouseNo: data.currentHouseNo,
      countryOfOrigin: data.currentCountry?.toString(),
    }

    const permanentAddress = {
      isPerSameAsCurrent:  data?.isPermanetSameAsCurrent ? "Yes" : "No",
      permanentCountry: data.permanentCountry?.toString(),      
      permanentProvince: data.permanentProvince,
      permanentDistrict: data.permanentDistrict,
      permanentLocalBody: data.permanentLocalBody,
      permanentWardNo: data.permanentWardNo,
      permanentStreet: data.permanentStreet,
      permanentTelephone: data.permanentTelephone,
      permanentMobile: data.permanentMobile,
      permanentEmail: data.permanentEmail,
      permanentHouseNo: data.permanentHouseNo 
    }
    const payload = {

      currentAddress: mapObjectKeysToSnakeCase(currentAddress),
      permanentAddress: mapObjectKeysToSnakeCase(permanentAddress),

     
    }

    postStepTwo({payload:payload, token:token as string}).unwrap()
    .then((res) => {
      console.log(res)
      navigate(`/online-apply/step-three/${res.data.token}`)
    }).catch(err => {
      displayErrorMsg(err?.data?.message)
    })
  };

  console.log(errors)
  return (
    <>
      <AccountFormLayout currentStep={1} currentStepProgress={50}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: "1rem" }}>
            <Collapse
              defaultActiveKey={["1"]}
              items={[
                {
                  key: "1",
                  label: "Current Address",
                  children: (
                    <div style={{ width: "100%" }}>
                      <Row gutter={30}>
                        <Col xs={24} md={24}>
                          <SelectField
                            showSearch={true}
                            options={mappedCountries}
                            label="Country"
                            name="currentCountry"
                            control={control}
                            size="large"
                            placeholder="Select your current country"
                            error={errors.currentCountry?.message ?? ""}
            
                            // onBlur={handleBlur}
                            required={true}
                          />
                        </Col>
                        {watchCountry === 149 && <>
                          <Col xs={24} md={24}>
                            <SelectField
                              showSearch={true}
                              options={mappedProvinces}
                              label="Current Province"
                              name="currentProvince"
                              control={control}
                              size="large"
                              placeholder="Select your current province"
                              error={errors.currentProvince?.message ?? ""}
              
                              // onBlur={handleBlur}
                              required={true}
                            />
                          </Col>

                            { (watchCurrentProvince !== undefined && watchCurrentProvince !== "" ) && <Col xs={24} md={24}>
                              <SelectField
                                showSearch={true}
                                options={mappedDistrict}
                                label="District"
                                name="currentDistrict"
                                control={control}
                                disabled={districtListLoading}
                                loading={districtListLoading}
                                size="large"
                                placeholder="Select your current district"
                                error={errors.currentDistrict?.message ?? ""}
                
                                // onBlur={handleBlur}
                                required={true}
                              />
                            </Col>}

                            { (watchCurrentDistrict !== undefined && watchCurrentDistrict !== "" ) && <Col xs={24} md={24}>
                              <SelectField
                                showSearch={true}
                                options={mappedLocalGovernment}
                                label="Local Body"
                                name="currentLocalBody"
                                control={control}
                                disabled={localGovernmentListLoading}
                                loading={localGovernmentListLoading}
                                size="large"
                                placeholder="Select your current local body"
                                error={errors.currentLocalBody?.message ?? ""}
                
                                // onBlur={handleBlur}
                                required={true}
                              />
                            </Col>}
                            { (watchCountry !== undefined && watchCountry !== null ) && 
                            <>
                              <Col xs={24} md={8}>
                                <InputField
                                  label="Telephone"
                                  name="currentTelephone"
                                  control={control}
                                  error={errors.currentTelephone?.message ?? ""}
                                  required={true}
                                />
                              </Col>
                              <Col xs={24} md={8}>
                                <InputField
                                  label="Street"
                                  name="currentStreet"
                                  control={control}
                                  error={errors.currentStreet?.message ?? ""}
                                  required={true}
                                />
                              </Col>
                              <Col xs={24} md={8}>
                                <InputField
                                  label="Mobile"
                                  name="currentMobile"
                                  control={control}
                                  error={errors.currentMobile?.message ?? ""}
                                  required={true}
                                />
                              </Col>
                              <Col xs={24} md={8}>
                                <InputField
                                  label="Email"
                                  name="currentEmail"
                                  control={control}
                                  error={errors.currentEmail?.message ?? ""}
                                  required={true}
                                />
                              </Col>
                              <Col xs={24} md={8}>
                                <InputField
                                  label="Ward No"
                                  name="currentWardNo"
                                  control={control}
                                  error={errors.currentWardNo?.message ?? ""}
                                  required={true}
                                />
                              </Col>
                              <Col xs={24} md={8}>
                                <InputField
                                  label="House No"
                                  name="currentHouseNo"
                                  control={control}
                                  error={errors.currentHouseNo?.message ?? ""}
                                  required={true}
                                />
                              </Col>
                            </>
                            }
                          </>
                        }
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
                  label="Is Permanent Address Same as Current Address"
                  name="isPermanetSameAsCurrent"
                  control={control}
                  error={errors.isPermanetSameAsCurrent?.message ?? ""}
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
                    label: "Permanent Address",
                    children: (
                      <div style={{ width: "100%" }}>
                        <Row gutter={30}>
                          <Col xs={24} md={24}>
                            <SelectField
                              showSearch={true}
                              options={mappedCountries}
                              label="Country"
                              name="permanentCountry"
                              control={control}
                              size="large"
                              placeholder="Select your current country"
                              error={errors.permanentCountry?.message ?? ""}
              
                              // onBlur={handleBlur}
                              required={true}
                            />
                        </Col>

                        {watchPermanentCountry === 149 && <>
                          <Col xs={24} md={24}>
                            <SelectField
                              showSearch={true}
                              options={mappedProvinces}
                              label="Permanent Province"
                              name="permanentProvince"
                              control={control}
                              size="large"
                              placeholder="Select your permanent province"
                              error={errors.permanentProvince?.message ?? ""}
              
                              // onBlur={handleBlur}
                              required={true}
                            />
                          </Col>

                            { (watchPermanentProvince !== undefined && watchPermanentProvince !== "" ) && <Col xs={24} md={24}>
                              <SelectField
                                showSearch={true}
                                options={mappedPermanentDistrict}
                                label="District"
                                name="permanentDistrict"
                                control={control}
                                disabled={districtPermanentListLoading}
                                loading={districtPermanentListLoading}
                                size="large"
                                placeholder="Select your permanent district"
                                error={errors.permanentDistrict?.message ?? ""}
                
                                // onBlur={handleBlur}
                                required={true}
                              />
                            </Col>}

                            { (watchPermanentDistrict !== undefined && watchPermanentDistrict !== "" ) && <Col xs={24} md={24}>
                              <SelectField
                                showSearch={true}
                                options={mappedPermanentLocalGovernment}
                                label="Local Body"
                                name="permanentLocalBody"
                                control={control}
                                disabled={localGovernmentPermanentListLoading}
                                loading={localGovernmentPermanentListLoading}
                                size="large"
                                placeholder="Select your current local body"
                                error={errors.permanentLocalBody?.message ?? ""}
                
                                // onBlur={handleBlur}
                                required={true}
                              />
                            </Col>}
                            { (watchPermanentCountry !== undefined && watchPermanentCountry !== null ) && 
                            <>
                              <Col xs={24} md={8}>
                                <InputField
                                  label="Telephone"
                                  name="permanentTelephone"
                                  control={control}
                                  error={errors.permanentTelephone?.message ?? ""}
                                  required={true}
                                />
                              </Col>
                              <Col xs={24} md={8}>
                                <InputField
                                  label="Street"
                                  name="permanentStreet"
                                  control={control}
                                  error={errors.permanentStreet?.message ?? ""}
                                  required={true}
                                />
                              </Col>
                              <Col xs={24} md={8}>
                                <InputField
                                  label="Mobile"
                                  name="permanentMobile"
                                  control={control}
                                  error={errors.permanentMobile?.message ?? ""}
                                  required={true}
                                />
                              </Col>
                              <Col xs={24} md={8}>
                                <InputField
                                  label="Email"
                                  name="permanentEmail"
                                  control={control}
                                  error={errors.permanentEmail?.message ?? ""}
                                  required={true}
                                />
                              </Col>
                              <Col xs={24} md={8}>
                                <InputField
                                  label="Ward No"
                                  name="permanentWardNo"
                                  control={control}
                                  error={errors.permanentWardNo?.message ?? ""}
                                  required={true}
                                />
                              </Col>
                              <Col xs={24} md={8}>
                                <InputField
                                  label="House No"
                                  name="permanentHouseNo"
                                  control={control}
                                  error={errors.permanentHouseNo?.message ?? ""}
                                  required={true}
                                />
                              </Col>
                            </>
                            }
                          </>
                        }
                        </Row>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          )}

          <Row>
            <Col xs={24}>
              <Button
                type="primary"
                block
                size="large"
                htmlType="submit"
                style={{ fontWeight: 700, height: "50px" }}
                disabled={isPostStepTwoLoading}
                loading={isPostStepTwoLoading}
              >
              Save & Continue
            </Button>
            </Col>
          </Row>
        </form>
      </AccountFormLayout>
    </>
  );
};

export default AddressStep;
