import * as yup from "yup";

const addressSchema = yup.object({
  currentCountry: yup.number().required("Current country is required"),
  currentProvince: yup.string().when(["currentCountry"], {
    is: 149, 
    then:  (schema) => schema.required("Current province is required")
  }),

  currentDistrict: yup.string().when("currentCountry", {
    is: 149, 
    then:  (schema) => schema.required("Current district is required")
  }),

  currentLocalBody: yup.string().when("currentCountry", {
    is: 149,
    then:  (schema) => schema.required("Current local body is required")
  }),

  currentWardNo: yup.string().when("currentCountry", {
    is: 149,
    then:  (schema) => schema.required("Current Ward No is required")
  }),

  currentStreet: yup.string().when("currentCountry", {
    is: 149,
    then:  (schema) => schema.required("Current Street No is required")
  }),
  currentTelephone: yup.string().required("Current telephone is required"),
  currentMobile: yup.string().required("Current mobile is required"),
  currentEmail: yup.string().email().required("Current email is required"),
  currentHouseNo: yup.string().required("Current house no is required"),
  
  isPermanetSameAsCurrent: yup.boolean().required("please verify"),

  permanentCountry: yup.number().when(["isPermanetSameAsCurrent"], {
    is: false,
    then: (schema) => schema.required("Permanent Country  is required"),
    otherwise: (schema) => schema,
  }),
  permanentProvince: yup.string().when(["isPermanetSameAsCurrent", "permanentCountry"], {
    is: (isPermanetSameAsCurrent:boolean, permanentCountry:number) => 
      isPermanetSameAsCurrent === false && permanentCountry === 149,
    then: (schema) => schema.required("Permanent province is required"),
  }),


  permanentDistrict: yup.string().when(["isPermanetSameAsCurrent", "permanentCountry"], {
    is: (isPermanetSameAsCurrent:boolean, permanentCountry:number) => 
      isPermanetSameAsCurrent === false && permanentCountry === 149,
    then:  (schema) => schema.required("Permanent district is required")
  }),

  permanentLocalBody: yup.string().when(["isPermanetSameAsCurrent", "permanentCountry"], {
    is: (isPermanetSameAsCurrent:boolean, permanentCountry:number) => 
      isPermanetSameAsCurrent === false && permanentCountry === 149,
    then:  (schema) => schema.required("Permanent local body is required")
  }),

  permanentWardNo: yup.string().when(["isPermanetSameAsCurrent", "permanentCountry"], {
    is: (isPermanetSameAsCurrent:boolean, permanentCountry:number) => 
      isPermanetSameAsCurrent === false && permanentCountry === 149,
    then:  (schema) => schema.required("Permanent Ward No is required")
  }),

  permanentStreet: yup.string().when(["isPermanetSameAsCurrent", "permanentCountry"], {
    is: (isPermanetSameAsCurrent:boolean, permanentCountry:number) => 
      isPermanetSameAsCurrent === false && permanentCountry === 149,
    then:  (schema) => schema.required("Permanenet Street No is required")
  }),
  permanentTelephone: yup.string().when("isPermanetSameAsCurrent", {
    is: false,
    then:  (schema) => schema.required("Permanent Telephone is required")
  }),
  permanentMobile: yup.string().when("isPermanetSameAsCurrent", {
    is: false,
    then:  (schema) => schema.required("Permanent Mobile is required")
  }),
  permanentEmail: yup.string().email().when("isPermanetSameAsCurrent", {
    is: false,
    then:  (schema) => schema.required("Permanent Email is required")
  }),
  permanentHouseNo: yup.string().when("isPermanetSameAsCurrent", {
    is: false,
    then:  (schema) => schema.required("Permanent House No is required")
  }),


});

export { addressSchema };
