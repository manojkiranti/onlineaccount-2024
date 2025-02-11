import * as yup from "yup";

const accountSignUpSchema = yup.object({
    existingAccount: yup.boolean().required(),
    fullName: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    mobileNumber: yup.string().required("Mobile number is required"),

    saluation: yup.string().required("Salutation is required"),
    gender: yup.string().required("Gender is required"),
    nationality: yup.string().required("Nationality is required"),
    currency: yup.string().required("Currency is required"),
    dateOfBirthAD: yup.string().required("Date of birth (AD) is required"),
    dateOfBirthBS: yup
    .object({
      bsDate: yup.string().required("Date of birth (BS) is required"),
      adDate: yup.string().required("Date of birth (AD) is required"),
    })
    .required("Date of birth (BS) is required"),
});

export {
    accountSignUpSchema
}