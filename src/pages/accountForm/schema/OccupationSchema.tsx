import * as yup from "yup";

const occupationSchema = yup.object({
    employmentType: yup.number().required("Employment type is required"),
    occupation: yup.number().required("Occupation is required"),

    panNo: yup.string().when(["employmentType"], {
        is: (employmentType: number) => employmentType !== 4 && employmentType !== 5 && employmentType !== 3, 
        then:  (schema) => schema.required("PAN no is required")
    }),
    organizationName: yup.string().when(["employmentType"], {
        is: (employmentType: number) => employmentType === 4 || employmentType === 5 || employmentType === 3, 
        then:  (schema) => schema.required("Organization no is required")
    }),
    organizationAddress: yup.string().when(["employmentType"], {
        is: (employmentType: number) => employmentType === 4 || employmentType === 5 || employmentType === 3, 
        then:  (schema) => schema.required("Organization Address is required")
    }),
    organizationContactNumber: yup.string().when(["employmentType"], {
        is: (employmentType: number) => employmentType === 4 || employmentType === 5 || employmentType === 3, 
        then:  (schema) => schema.required("Organization contact number is required")
    }),
    designation: yup.string().when(["employmentType"], {
        is: (employmentType: number) => employmentType === 4 || employmentType === 5 || employmentType === 3, 
        then:  (schema) => schema.required("designation  is required")
    }),
    annualIncome: yup.number().when(["employmentType"], {
        is: (employmentType: number) => employmentType === 4 || employmentType === 5 || employmentType === 3, 
        then:  (schema) => schema.required("Annual income  is required")
    }),
    annualSalary: yup.number().when(["employmentType"], {
        is: (employmentType: number) => employmentType === 4 || employmentType === 5 || employmentType === 3, 
        then:  (schema) => schema.required("Annual salary  is required")
    }),
    purposeOfAccount: yup.number().required("Purpose of account is required"),
    purposeOfAccountOther: yup.string().when(["purposeOfAccount"], {
        is: 3, 
        then:  (schema) => schema.required("Please specify other purpose")
    }),
    sourceOfIncome: yup.number().required("Source of income is required"),
    sourceOfIncomeOther: yup.string().when(["sourceOfIncome"], {
        is: 6, 
        then:  (schema) => schema.required("Please specify other source")
    }),
    maxAmountPerTransaction: yup.number().required("Max amount per transaction is required"),
    numberOfMonthlyTransaction: yup.number().required("Number of monthly transaction is required"),
    monthlyAmountTransaction: yup.number().required("Monthly amount transaction is required"),
    numberOfYearlyTransaction: yup.number().required("Number of yearly transaction is required"),
    yearlyAmountTransaction: yup.number().required("Yearly amount transaction is required"),
    identificationType: yup.string().required("Identification type is required"),
    identificationDocumentNumber: yup.string().required("Identification document number is required"),
    identificationDocumentIssuedPlace: yup.string().required("Identification document issued placed is required"),
    identificationIssuedDateInAd: yup.string().required("Identification issued date in AD is required"),
    identificationIssuedDateInBs: yup
        .object({
          bsDate: yup.string().required("Date of birth (BS) is required"),
          adDate: yup.string().required("Date of birth (AD) is required"),
        }),
    identificationDocumentExpiryDate: yup.string().required("Identification document expiry date is required"),
    identificationDocumentIssuedOrg: yup.string().required("Identification document issued org is required"),
    identificationDocumentIssuedCon: yup.string().required("Identification document issued country is required"),
    education: yup.string().required("Education is required"),
    grandmotherName: yup.string().required("Grandmother name is required"),
    grandfatherName: yup.string().required("Grandfather name is required"),
    fatherName: yup.string().required("Father name is required"),
    motherName: yup.string().required("Mother name is required"),
    maritalStatus: yup.number().required("Marital status is required"),

    spouseName: yup.string().when("maritalStatus", {
        is: 1, 
        then:  (schema) => schema.required("Spouse name is required"),
    }),

    fatherInLawName: yup.string().when(["maritalStatus"], {
        is: 1, 
        then:  (schema) => schema.required("Father in law name is required"),
    }),
    motherInLawName: yup.string().when(["maritalStatus"], {
        is: 1, 
        then:  (schema) => schema.required("Mother in law name is required"),
    }),
    daughterInLawName: yup.string().when(["maritalStatus"], {
        is: 1, 
        then:  (schema) => schema.required("Daughter in law name is required"),
    }),
    sonsName: yup.array().of(yup.string().when(["maritalStatus"], {
        is: 1, 
        then:  (schema) => schema.required("Sons name is required"),
    })),
    daughtersName: yup.array().of(yup.string()),
    specifyOthers: yup.string().when("maritalStatus", {
        is: 5, 
        then:  (schema) => schema.required("Please specify other"),
    }),
}); 

export {
    occupationSchema
}