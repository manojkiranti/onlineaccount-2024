import * as yup from "yup";

const addressEmploymentSchema = yup.object({
  state: yup.string().required("State is required"),
  district: yup.string().required("District is required"),
  city: yup.string().required("City is required"),
  streetName: yup.string().required("Street name is required"),
  wardNumber: yup.string().required("Ward Number is required"),
  houseNumber: yup.string().required("House number is required"),
  isTempAddressSame: yup.boolean().required("please verify"),
  tempState: yup.string().when("isTempAddressSame", {
    is: false,
    then: (schema) => schema.required("State is required"),
    otherwise: (schema) => schema,
  }),
  tempDistrict: yup.string().when("isTempAddressSame", {
    is: false,
    then: (schema) => schema.required("District is required"),
    otherwise: (schema) => schema,
  }),
  tempCity: yup.string().when("isTempAddressSame", {
    is: false,
    then: (schema) => schema.required("City is required"),
    otherwise: (schema) => schema,
  }),
  tempStreetName: yup.string().when("isTempAddressSame", {
    is: false,
    then: (schema) => schema.required("Street name is required"),
    otherwise: (schema) => schema,
  }),
  tempWardNumber: yup.string().when("isTempAddressSame", {
    is: false,
    then: (schema) => schema.required("Ward Number is required"),
    otherwise: (schema) => schema,
  }),
  tempHouseNumber: yup.string().when("isTempAddressSame", {
    is: false,
    then: (schema) => schema.required("House Number is required"),
    otherwise: (schema) => schema,
  }),
});

export { addressEmploymentSchema };
