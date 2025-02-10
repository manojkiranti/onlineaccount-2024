import * as yup from "yup";

const accountSignUpSchema = yup.object({
    fullName: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    mobileNumber: yup.string().required("Mobile number is required"),
    dob: yup.string().required("Date of birth is required"),
   
});

export {
    accountSignUpSchema
}