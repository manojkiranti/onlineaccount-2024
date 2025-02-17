import * as yup from "yup";

const accountSignUpSchema = yup.object({
    isExistingCustomer: yup.string().required(),
    accountName: yup.string().required("Name is required"),
    emailAddress: yup.string().email().required("Email is required"),
    branch: yup.string().required("Branch is required"),
    mobileNumber: yup.string().required("Mobile number is required"),

    salutation: yup.number().required("Salutation is required"),
    gender: yup.string().required("Gender is required"),
    nationality: yup.number().required("Nationality is required"),
    currencyId: yup.number().required("Currency is required"),
    dateOfBirth: yup.string().required("Date of birth (AD) is required"),
    dateOfBirthBs: yup
    .object({
      bsDate: yup.string().required("Date of birth (BS) is required"),
      adDate: yup.string().required("Date of birth (AD) is required"),
    })
    .required("Date of birth (BS) is required"),
});

export {
    accountSignUpSchema
}