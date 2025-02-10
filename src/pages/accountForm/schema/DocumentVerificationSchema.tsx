import * as yup from "yup";

const documentVerificationSchema = yup.object({
  documentType: yup.string().required(),
  identificationNumber: yup
    .string()
    .required("Identification number is required"),
  identificationIssuePlace: yup.string().required("Issued place is required"),
  identificationIssueAuthority: yup
    .string()
    .required("Issue Authority is required"),
  identificationIssueDate: yup.string().required("Issued date is required"),
  fatherName: yup.string().required("Father name is required"),
  motherName: yup.string().required("Mother name is required"),
  grandFatherName: yup.string().required("Grand father name is required"),
  maritialStatus: yup.string().required("Marital status is required"),
  spouseName: yup.string().when("maritialStatus", {
    is: "married",
    then: (schema) => schema.required("Spouse is required"),
    otherwise: (schema) => schema,
  }),
  fatherInLawName: yup.string().when("maritialStatus", {
    is: "married",
    then: (schema) => schema.required("Father In Law is required"),
    otherwise: (schema) => schema,
  }),
  education: yup.string().required("Education is required"),
  occupation: yup.string().required("Occupation is required"),
  designation: yup.string(),
  panNo: yup.string(),
});

export { documentVerificationSchema };
