import * as yup from 'yup';

export const purchaseDetailSchema = yup.object().shape({
  purchasingUnder: yup.string().required('Please select any option.'),
  propertyType: yup.string().required('Please select any option.'),
  propertyPurpose: yup.string().required('Please select any option.'),
  propertyTimeframe: yup.string().required('Please select any option.'),
});

export const purchaseDetailLabelMapper = {
  purchasingUnder: 'What best describes your situation?',
  propertyType: 'What is the type of property being purchased ',
  propertyPurpose: 'What will the property be used for initially?',
  propertyTimeframe: 'When do you plan to make the purchase?',
};
