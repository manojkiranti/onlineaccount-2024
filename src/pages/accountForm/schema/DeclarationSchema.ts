import * as yup from "yup";

const declarationSchema = yup.object({
    accountServices: yup.array().of(yup.string().required("Account Service is required")),
    isNrn: yup.string().required("Please verify your status"),
    isUsResident: yup.string().required("Please verify your status"),
    isUsCitizen: yup.string().required("Please verify your status"),
    isGreenCardHolder: yup.string().required("Please verify your status"),
    hasCriminalOffense: yup.string().required("Please verify your status"),
    criminalOffenseReason: yup.string().when("hasCriminalOffense", {
        is: "Yes", 
        then:  (schema) => schema.required("Reason is required"),
    }),
    wantDebitCard: yup.string().required("Please verify your status"),
    cardType: yup.string().when("wantDebitCard", {
        is: "Yes", 
        then:  (schema) => schema.required("Card type is required"),
    }),
    cardHolderFirstName: yup.string().when("wantDebitCard", {
        is: "Yes", 
        then:  (schema) => schema.required("Card holder first name is required"),
    }),
    cardHolderMiddleName: yup.string(),
    cardHolderLastName: yup.string().when("wantDebitCard", {
        is: "Yes", 
        then:  (schema) => schema.required("Card holder last name is required"),
    }),
    wantInternetBanking: yup.string().required("Please verify your status"),
    internetBankingType: yup.number().when("wantInternetBanking", {
        is: "Yes", 
        then:  (schema) => schema.required("Internet banking type is required"),
    }),
    wantChequeBook: yup.string().required("Please verify your status"),
    wantMobileBanking: yup.string().required("Please verify your status"),
    mobileBankingType: yup.number().when("internetBankingType", {
        is: "Yes", 
        then:  (schema) => schema.required("Mobile banking type is required"),
    }),
    wantSmsBanking: yup.string().required("Please verify your status"),
    hasBankAccountWithOtherBfi:  yup.string().required("Please verify your status"),
    bankInstitutionName: yup.string().when("hasBankAccountWithOtherBfi", {
        is: "Yes", 
        then:  (schema) => schema.required("Banking institute name is required"),
    }),
    bankInstitutionAccNum: yup.string().when("hasBankAccountWithOtherBfi", {
        is: "Yes", 
        then:  (schema) => schema.required("Banking institute account number is required"),
    }),
    isNominee: yup.string().required("Please verify your status"),
    nomineeName: yup.string().when("isNominee", {
        is: "Yes", 
        then:  (schema) => schema.required("Nominee name is required"),
    }),
    nomineeFatherName: yup.string().when("isNominee", {
        is: "Yes", 
        then:  (schema) => schema.required("Nominee father name is required"),
    }),
    nomineeGndFatherName: yup.string().when("isNominee", {
        is: "Yes", 
        then:  (schema) => schema.required("Nominee Grand father name is required"),
    }),
    nomineeCurrentAddress: yup.string().when("isNominee", {
        is: "Yes", 
        then:  (schema) => schema.required("Nominee current address is required"),
    }),
    nomineePermanentAddress: yup.string().when("isNominee", {
        is: "Yes", 
        then:  (schema) => schema.required("Nominee permanent address is required"),
    }),
    nomineeCitizenshipNo: yup.string().when("isNominee", {
        is: "Yes", 
        then:  (schema) => schema.required("Nominee NID number is required"),
    }),
    nomineeCitizenshipIssueDate: yup.string().when("isNominee", {
        is: "Yes", 
        then:  (schema) => schema.required("Nominee NID issue date is required"),
    }),
    nomineeDob: yup.string().when("isNominee", {
        is: "Yes", 
        then:  (schema) => schema.required("Nominee date of birth is required"),
    }),
    nomineeRelationship: yup.string().when("isNominee", {
        is: "Yes", 
        then:  (schema) => schema.required("Nominee relationship is required"),
    }),
    nomineeCitizenshipIssuePlace: yup.string().when("isNominee", {
        is: "Yes", 
        then:  (schema) => schema.required("Nominee citizenship issue place is required"),
    }),
    nomineePassportNo: yup.string().when("isNominee", {
        is: "Yes", 
        then:  (schema) => schema.required("Nominee passport number is required"),
    }),
    nomineeMobileNo: yup.string().when("isNominee", {
        is: "Yes", 
        then:  (schema) => schema.required("Nominee mobile number is required"),
    }),
    isNomineeMinor: yup.string().when("isNominee", {
        is: "Yes", 
        then:  (schema) => schema.required("Please verify"),
    }),
    minorGuardianName: yup.string().when("isNomineeMinor", {
        is: "Yes", 
        then:  (schema) => schema.required("Minor guardian name is required"),
    }),
    nomineeMinorRelationship: yup.string().when("isNomineeMinor", {
        is: "Yes", 
        then:  (schema) => schema.required("Relationship is required"),
    }),
    nomineeMinorCtznIssDateAd: yup.string().when("isNomineeMinor", {
        is: "Yes", 
        then:  (schema) => schema.required("Issued date is required"),
    }),
    nomineeMinorCtznIssPlace: yup.string().when("isNomineeMinor", {
        is: "Yes", 
        then:  (schema) => schema.required("Issued place is required"),
    }),
    nomineeMinorCtznNo: yup.string().when("isNomineeMinor", {
        is: "Yes", 
        then:  (schema) => schema.required("Nominee minor citizen number is required"),
    }),
    isBeneficiary: yup.string().required("Please verify your status"),
    beneficiaryName: yup.string().when("isBeneficiary", {
        is: "Yes", 
        then:  (schema) => schema.required("Benificiary name is required"),
    }),
    beneficiaryAddress: yup.string().when("isBeneficiary", {
        is: "Yes", 
        then:  (schema) => schema.required("Benificiary address is required"),
    }),
    beneficiaryContact: yup.string().when("isBeneficiary", {
        is: "Yes", 
        then:  (schema) => schema.required("Benificiary contact is required"),
    }),
    beneficiaryRelationship: yup.string().when("isBeneficiary", {
        is: "Yes", 
        then:  (schema) => schema.required("Benificiary relation is required"),
    }),
    
});
export { declarationSchema };