import { useEffect, useState } from "react";
import { Button, Card, Col, Collapse, Input, Row } from "antd";

import {
  useForm,
  useFieldArray,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import AccountFormLayout from "../components/AccountFormLayout";

import {
  CheckBoxField,
  CheckBoxGroupField,
  DatePickerField,
  FormLabel,
  InputField,
  NepaliDatePickerField,
  RadioGroupField,
  SelectField,
} from "@/components/Form";
import { DeclarationType } from "../types";
import { useGetPrerequisitQuery } from "@/store/apis/coreApi";

import { useNavigate, useParams } from "react-router-dom";
import { displayErrorMsg } from "@/utils/displayMessageUtils";
import { mapObjectKeysToSnakeCase } from "@/utils/mapper";
import { occupationSchema } from "../schema/OccupationSchema";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { usePostStepFourMutation, usePostStepThreeMutation } from "../api/stepAPI";
import { declarationSchema } from "../schema/DeclarationSchema";
import { confirmOptions } from "@/devFrontData/options";

const DeclarationStep = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DeclarationType>({
    resolver: yupResolver(declarationSchema),
    defaultValues: {
      accountServices:["want_debit_card"],
      isNrn: "No",
      isUsCitizen: "No",
      isUsResident: "No",
      isGreenCardHolder: "No",
      hasCriminalOffense: "No",
      wantDebitCard: "Yes",
      wantMobileBanking: "Yes",
      wantInternetBanking: "Yes",
      wantChequeBook: "Yes",
      wantSmsBanking: "Yes", 
    },
  });

  const { data: preRequisitData, isLoading: preRequisitLoading } =
    useGetPrerequisitQuery();
  const [postStepFour, {isLoading: postStepFouroading}] =  usePostStepFourMutation();
  
  console.log("preRequisitData", preRequisitData)
  
  const watchCriminalOffense = watch("hasCriminalOffense");
  const debitCardWatch = watch("wantDebitCard");
  const watchMobank = watch("wantMobileBanking");
  const watchInternetBanking = watch("wantInternetBanking");
  const watchHasBankAccountInOther =  watch("hasBankAccountWithOtherBfi");
  const watchIsNominee = watch("isNominee");
  const watchIsNomineeMinor = watch("isNomineeMinor");
  const watchBeneficiary = watch("isBeneficiary");

  const mappedMobank = preRequisitData?.data?.mobile_bankings.map((item:any) =>({
    value: item.id,
    label: item.title
  }));

  const mappedEbanking = preRequisitData?.data?.ebanking_profiles.map((item:any) =>({
    value: item.id,
    label: item.title
  }));

  const mappedRelationship = preRequisitData?.data?.relationships.map((item:any) =>({
    value: item.id,
    label: item.title
  }));

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<DeclarationType> = (data) => {

    const declarationAndServices = {
      accountServices: data.accountServices,
      isNrn: data.isNrn,
      isUsResident: data.isUsResident,
      isUsCitizen: data.isUsCitizen,
      isGreenCardHolder: data.isGreenCardHolder,
      hasCriminalOffense: data.hasCriminalOffense,
      criminalOffenseReason: data.criminalOffenseReason,
      wantDebitCard: data.wantDebitCard,
      cardType: data.cardType,
      cardHolderFirstName: data.cardHolderFirstName,
      cardHolderMiddleName: data.cardHolderMiddleName,
      cardHolderLastName: data.cardHolderLastName,
      wantInternetBanking: data.wantInternetBanking,
      internetBankingType: data.internetBankingType,
      wantChequeBook: data.wantChequeBook,
      wantMobileBanking: data.wantMobileBanking,
      mobileBankingType: data.mobileBankingType,
      wantSmsBanking: data.wantSmsBanking,
      hasBankAccountWithOtherBfi: data.hasBankAccountWithOtherBfi,
      bankInstitutionName: data.bankInstitutionName,
      bankInstitutionAccNum: data.bankInstitutionAccNum
    }
    const nomineeDetails = {
      isNominee: data.isNominee,
      nomineeName: data.nomineeName,
      nomineeFatherName: data.nomineeFatherName,
      nomineeGndFatherName: data.nomineeGndFatherName,
      nomineeCurrentAddress: data.nomineeCurrentAddress,
      nomineePermanentAddress: data.nomineePermanentAddress,
      nomineeCitizenshipNo: data.nomineeCitizenshipNo,
      nomineeCitizenshipIssueDate: data.nomineeCitizenshipIssueDate,
      nomineeDob: data.nomineeDob,
      nomineeRelationship: data.nomineeRelationship,
      nomineeCitizenshipIssuePlace: data.nomineeCitizenshipIssuePlace,
      nomineePassportNo: data.nomineePassportNo,
      nomineeMobileNo: data.nomineeMobileNo,
      isNomineeMinor: data.isNomineeMinor,
      minorGuardianName: data.minorGuardianName,
      nomineeMinorRelationship: data.nomineeMinorRelationship,
      nomineeMinorCtznIssDateAd: data.nomineeMinorCtznIssDateAd,
      nomineeMinorCtznIssPlace: data.nomineeMinorCtznIssPlace,
      nomineeMinorCtznNo: data.nomineeMinorCtznNo,
      
    }
    const beneficiaryDetails = {
      isBeneficiary: data.isBeneficiary,
      beneficiaryName: data.beneficiaryName,
      beneficiaryAddress: data.beneficiaryAddress,
      beneficiaryContact: data.beneficiaryContact,
      beneficiaryRelationship: data.beneficiaryRelationship
    }

    const payload = {
      declarationAndServices: mapObjectKeysToSnakeCase(declarationAndServices),
      nomineeDetails: mapObjectKeysToSnakeCase(nomineeDetails),
      beneficiaryDetails: mapObjectKeysToSnakeCase(beneficiaryDetails)
    }

    postStepFour({payload:payload, token:token as string}).unwrap()
    .then((res) => {
      console.log(res)
      navigate(`/online-apply/step-five/${res.data.token}`)
    }).catch(err => {
      displayErrorMsg(err?.data?.message)
    })
  };

  console.log(errors);
  return (
    <>
      <AccountFormLayout currentStep={3} currentStepProgress={50}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: "1rem" }}>
            <Collapse
              defaultActiveKey={["1"]}
              items={[
                {
                  key: "1",
                  label: "Services",
                  children: (
                    <div style={{ width: "100%" }}>
                      <Row gutter={30}>
                          <Col xs={24} md={12}>
                            <CheckBoxGroupField
                               control={control}
                               name="accountServices"
                               label="Select account services"
                               options={[
                                {label:"Want debit card", value:"want_debit_card"},
                                {label:"Want internet banking", value:"want_internet_banking"},
                                {label:"Want cheque book", value:"want_cheque_book"}
                              ]}
                               error={errors.accountServices?.message ?? ""}
                              />
                          </Col>
                          <Col xs={24} md={12}>
                            <RadioGroupField
                               control={control}
                               name="isNrn"
                               label="Is NRN ?"
                               options={confirmOptions}
                               error={errors.isNrn?.message ?? ""}
                               />
                          </Col>
                          <Col xs={24} md={12}>
                            <RadioGroupField
                               control={control}
                               name="isUsResident"
                               label="Is US Resident ?"
                               options={confirmOptions}
                               error={errors.isUsResident?.message ?? ""}
                               />
                          </Col>
                          <Col xs={24} md={12}>
                            <RadioGroupField
                               control={control}
                               name="isUsCitizen"
                               label="Is US Citizen ?"
                               options={confirmOptions}
                               error={errors.isUsCitizen?.message ?? ""}
                               />
                          </Col>
                          <Col xs={24} md={12}>
                            <RadioGroupField
                               control={control}
                               name="isGreenCardHolder"
                               label="Is Green Card Holder ?"
                               options={confirmOptions}
                               error={errors.isGreenCardHolder?.message ?? ""}
                               />
                          </Col>
                          <Col xs={24} md={12}>
                            <RadioGroupField
                               control={control}
                               name="hasCriminalOffense"
                               label="Has Criminal Offense ?"
                               options={confirmOptions}
                               error={errors.hasCriminalOffense?.message ?? ""}
                               />
                          </Col>
                          {watchCriminalOffense === "Yes" && 
                            <Col xs={24} md={12}>
                              <InputField
                                label="Criminal offense reason"
                                name="criminalOffenseReason"
                                control={control}
                                error={errors.criminalOffenseReason?.message ?? ""}
                                required={true}
                              />
                            </Col>
                          
                          }

                          <Col xs={24} md={12}>
                            <RadioGroupField
                               control={control}
                               name="wantMobileBanking"
                               label="Want Mobile Banking ?"
                               options={confirmOptions}
                               error={errors.wantMobileBanking?.message ?? ""}
                               />
                          </Col>
                          {watchMobank === "Yes" && <Col xs={24} md={12}>
                            <SelectField
                              options={mappedMobank}
                              label="Mobile Banking Type"
                              name="mobileBankingType"
                              control={control}
                              size="large"
                              placeholder="Select mobile banking type"
                              error={errors.mobileBankingType?.message ?? ""}
                              required={true}
                            />
                        </Col>}

                        <Col xs={24} md={12}>
                            <RadioGroupField
                               control={control}
                               name="wantInternetBanking"
                               label="Want Internet Banking ?"
                               options={confirmOptions}
                               error={errors.wantInternetBanking?.message ?? ""}
                               />
                          </Col>
                          {watchInternetBanking === "Yes" && <Col xs={24} md={12}>
                            <SelectField
                              options={mappedEbanking}
                              label="Internet Banking Type"
                              name="internetBankingType"
                              control={control}
                              size="large"
                              placeholder="Select internet banking type"
                              error={errors.internetBankingType?.message ?? ""}
                              required={true}
                            />
                        </Col>}

                          <Col xs={24} md={12}>
                            <RadioGroupField
                               control={control}
                               name="wantDebitCard"
                               label="Want Debit Card ?"
                               options={confirmOptions}
                               error={errors.wantDebitCard?.message ?? ""}
                               />
                          </Col>
                          
                         {debitCardWatch === "Yes" && 
                          <>
                            <Col xs={24} md={12}>
                                <SelectField
                                  options={[
                                    {label:"Embossed", value: "Embossed"}
                                  ]}
                                  label="Card Type"
                                  name="cardType"
                                  control={control}
                                  size="large"
                                  placeholder="Select card type"
                                  error={errors.cardType?.message ?? ""}
                                  required={true}
                                />
                            </Col>
                            <Col xs={24} md={8}>
                              <InputField
                                label="Card holder first name"
                                name="cardHolderFirstName"
                                control={control}
                                error={errors.cardHolderFirstName?.message ?? ""}
                                required={true}
                              />
                            </Col>
                            <Col xs={24} md={8}>
                              <InputField
                                label="Card holder middle name"
                                name="cardHolderMiddleName"
                                control={control}
                                error={errors.cardHolderMiddleName?.message ?? ""}
                              />
                            </Col>
                            <Col xs={24} md={8}>
                              <InputField
                                label="Card holder last name"
                                name="cardHolderLastName"
                                control={control}
                                error={errors.cardHolderLastName?.message ?? ""}
                                required={true}
                              />
                            </Col>
                          </>
                        }
                        <Col xs={24} md={12}>
                            <RadioGroupField
                               control={control}
                               name="wantChequeBook"
                               label="Want cheque book ?"
                               options={confirmOptions}
                               error={errors.wantChequeBook?.message ?? ""}
                               />
                          </Col>
                          <Col xs={24} md={12}>
                            <RadioGroupField
                               control={control}
                               name="wantSmsBanking"
                               label="Want SMS Banking ?"
                               options={confirmOptions}
                               error={errors.wantSmsBanking?.message ?? ""}
                               />
                          </Col>
                          <Col xs={24} md={8}>
                            <RadioGroupField
                               control={control}
                               name="hasBankAccountWithOtherBfi"
                               label="Has bank account with other banking institute ?"
                               options={confirmOptions}
                               error={errors.hasBankAccountWithOtherBfi?.message ?? ""}
                               />
                          </Col>
                          {watchHasBankAccountInOther === "Yes" && 
                            <>
                              <Col xs={24} md={8}>
                                <InputField
                                  label="Banking Institute name"
                                  name="bankInstitutionName"
                                  control={control}
                                  error={errors.bankInstitutionName?.message ?? ""}
                                  required={true}
                                />
                              </Col>
                              <Col xs={24} md={8}>
                                <InputField
                                  label="Banking Institute Account number"
                                  name="bankInstitutionAccNum"
                                  control={control}
                                  error={errors.bankInstitutionAccNum?.message ?? ""}
                                  required={true}
                                />
                              </Col>
                            </>
                          }
                       </Row>
                    </div>
                  ),
                },
              ]}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <Collapse
              defaultActiveKey={["1"]}
              items={[
                {
                  key: "1",
                  label: "Nominee Details",
                  children: (
                    <div style={{ width: "100%" }}>
                        <Row gutter={30}>
                  
                          <Col xs={24} md={12}>
                            <RadioGroupField
                               control={control}
                               name="isNominee"
                               label="Is Nominee ?"
                               options={confirmOptions}
                               error={errors.isNominee?.message ?? ""}
                               />
                          </Col>
                          {watchIsNominee === "Yes" &&
                            <>
                              <Col xs={24} md={8}>
                                <InputField
                                  label="Nominee Name"
                                  name="nomineeName"
                                  control={control}
                                  error={errors.nomineeName?.message ?? ""}
                                  required={true}
                                />
                              </Col>
                              <Col xs={24} md={8}>
                                <InputField
                                  label="Nominee Father Name"
                                  name="nomineeFatherName"
                                  control={control}
                                  error={errors.nomineeFatherName?.message ?? ""}
                                  required={true}
                                />
                              </Col>
                              <Col xs={24} md={8}>
                                <InputField
                                  label="Nominee Grand Father Name"
                                  name="nomineeGndFatherName"
                                  control={control}
                                  error={errors.nomineeGndFatherName?.message ?? ""}
                                  required={true}
                                />
                              </Col>
                              <Col xs={24} md={8}>
                                <InputField
                                  label="Nominee Current Address"
                                  name="nomineeCurrentAddress"
                                  control={control}
                                  error={errors.nomineeCurrentAddress?.message ?? ""}
                                  required={true}
                                />
                              </Col>
                              <Col xs={24} md={8}>
                                <InputField
                                  label="Nominee Permanent Address"
                                  name="nomineePermanentAddress"
                                  control={control}
                                  error={errors.nomineePermanentAddress?.message ?? ""}
                                  required={true}
                                />
                              </Col>
                              <Col xs={24} md={8}>
                                <InputField
                                  label="Nominee Citizenship Number"
                                  name="nomineeCitizenshipNo"
                                  control={control}
                                  error={errors.nomineeCitizenshipNo?.message ?? ""}
                                  required={true}
                                />
                              </Col>
                              <Col xs={24} md={8}>
                                <DatePickerField
                                  label="Nomineed citizenship issued date in (AD)"
                                  name="nomineeCitizenshipIssueDate"
                                  control={control}
                                  error={
                                    errors.nomineeCitizenshipIssueDate?.message ?? ""
                                  }
                                  placeholder=""
                                  required={true}
                                  dateFormat="YYYY-MM-DD"
                                />
                              </Col>
                              <Col xs={24} md={8}>
                                <InputField
                                  label="Nominee Citizenship Issue place"
                                  name="nomineeCitizenshipIssuePlace"
                                  control={control}
                                  error={errors.nomineeCitizenshipIssuePlace?.message ?? ""}
                                  required={true}
                                />
                              </Col>
                              <Col xs={24} md={8}>
                                <DatePickerField
                                  label="Nomineed DOB"
                                  name="nomineeDob"
                                  control={control}
                                  error={
                                    errors.nomineeDob?.message ?? ""
                                  }
                                  placeholder=""
                                  required={true}
                                  dateFormat="YYYY-MM-DD"
                                />
                              </Col>
                              <Col xs={24} md={8}>
                                <SelectField
                                  options={mappedRelationship}
                                  label="Nominee Relationship"
                                  name="nomineeRelationship"
                                  control={control}
                                  size="large"
                                  placeholder="Select relationship with nominee"
                                  error={errors.nomineeRelationship?.message ?? ""}
                                  required={true}
                                />
                              </Col>
                              <Col xs={24} md={8}>
                                <InputField
                                  label="Nominee Passport Number"
                                  name="nomineePassportNo"
                                  control={control}
                                  error={errors.nomineePassportNo?.message ?? ""}
                                  required={true}
                                />
                              </Col>
                              <Col xs={24} md={8}>
                                <InputField
                                  label="Nominee Mobile Number"
                                  name="nomineeMobileNo"
                                  control={control}
                                  error={errors.nomineeMobileNo?.message ?? ""}
                                  required={true}
                                />
                              </Col>
                              <Col xs={24} md={8}>
                                <RadioGroupField
                                  control={control}
                                  name="isNomineeMinor"
                                  label="Is Nominee Minor?"
                                  options={confirmOptions}
                                  error={errors.isNomineeMinor?.message ?? ""}
                                  />
                              </Col>
                              {watchIsNomineeMinor === "Yes" &&
                               <>
                                <Col xs={24} md={8}>
                                  <InputField
                                    label="Nominee Guardian Name"
                                    name="minorGuardianName"
                                    control={control}
                                    error={errors.minorGuardianName?.message ?? ""}
                                    required={true}
                                  />
                                </Col>
                                <Col xs={24} md={8}>
                                  <InputField
                                    label="Nominee Guardian Name"
                                    name="minorGuardianName"
                                    control={control}
                                    error={errors.minorGuardianName?.message ?? ""}
                                    required={true}
                                  />
                                </Col>
                                <Col xs={24} md={8}>
                                  <SelectField
                                    options={mappedRelationship}
                                    label="Nominee Minor Relationship"
                                    name="nomineeMinorRelationship"
                                    control={control}
                                    size="large"
                                    placeholder="Select relationship"
                                    error={errors.nomineeMinorRelationship?.message ?? ""}
                                    required={true}
                                  />
                                </Col>
                                <Col xs={24} md={8}>
                                    <DatePickerField
                                      label="Nomineed Minor Citizenship Issue Date"
                                      name="nomineeMinorCtznIssDateAd"
                                      control={control}
                                      error={
                                        errors.nomineeMinorCtznIssDateAd?.message ?? ""
                                      }
                                      placeholder=""
                                      required={true}
                                      dateFormat="YYYY-MM-DD"
                                    />
                                </Col>
                                <Col xs={24} md={8}>
                                  <InputField
                                    label="Nominee Minor Citizenship Issue place"
                                    name="nomineeMinorCtznIssPlace"
                                    control={control}
                                    error={errors.nomineeMinorCtznIssPlace?.message ?? ""}
                                    required={true}
                                  />
                                </Col>
                                <Col xs={24} md={8}>
                                  <InputField
                                    label="Nominee Minor Citizenship Number"
                                    name="nomineeMinorCtznNo"
                                    control={control}
                                    error={errors.nomineeMinorCtznNo?.message ?? ""}
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

          <div style={{ marginBottom: "1rem" }}>
            <Collapse
              defaultActiveKey={["1"]}
              items={[
                {
                  key: "1",
                  label: "Benificiary Details",
                  children: (
                    <div style={{ width: "100%" }}>
                      <Row gutter={30}>
                        <Col xs={24} md={12}>
                            <RadioGroupField
                               control={control}
                               name="isBeneficiary"
                               label="Is Beneficiary ?"
                               options={confirmOptions}
                               error={errors.isBeneficiary?.message ?? ""}
                               />
                        </Col>
                        {watchBeneficiary === "Yes" && <>
                          <Col xs={24} md={8}>
                              <InputField
                                label="Beneniciary Name"
                                name="beneficiaryName"
                                control={control}
                                error={errors.beneficiaryName?.message ?? ""}
                                required={true}
                              />
                            </Col>
                            <Col xs={24} md={8}>
                              <InputField
                                label="Beneniciary Address"
                                name="beneficiaryAddress"
                                control={control}
                                error={errors.beneficiaryAddress?.message ?? ""}
                                required={true}
                              />
                            </Col>
                            <Col xs={24} md={8}>
                              <InputField
                                label="Beneniciary Contact"
                                name="beneficiaryContact"
                                control={control}
                                error={errors.beneficiaryContact?.message ?? ""}
                                required={true}
                              />
                            </Col>
                            <Col xs={24} md={8}>
                                <SelectField
                                  options={mappedRelationship}
                                  label="Beneficiary Relationship"
                                  name="beneficiaryRelationship"
                                  control={control}
                                  size="large"
                                  placeholder="Select relationship"
                                  error={errors.beneficiaryRelationship?.message ?? ""}
                                  required={true}
                                />
                            </Col>
                        </>}
                      </Row>
                    </div>
                  ),
                },
              ]}
            />
          </div>

          <Row>
            <Col xs={24}>
              <Button
                type="primary"
                block
                size="large"
                htmlType="submit"
                style={{ fontWeight: 700, height: "50px" }}
                loading={postStepFouroading}
                disabled={postStepFouroading}
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

export default DeclarationStep;
