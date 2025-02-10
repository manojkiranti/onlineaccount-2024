import { ReactNode } from "react";

export interface FAQItem {
    key: string;
    label: string;
    children: ReactNode;
}
const text = `
  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. 
`;  
export const faqMapping: { [key: string]: FAQItem[] } = {
    'home': [
        {
            key: '1',
            label: "I didn't receive the OTP code.",
            children: <p>{text}</p>,
          },
          {
            key: '2',
            label: 'Documents required for credit card.',
            children: <p>{text}</p>,
          },
          {
            key: '3',
            label: 'Does my debit card will block instantly?',
            children: <p>{text}</p>,
          },
          {
            key: '4',
            label: 'How long does it takes to process new debit card?',
            children: <p>{text}</p>,
          },
    ],
    'card': [
      {
        key: '1',
        label: "Can I make international online payment?",
        children: <p>{text}</p>,
      },
      {
        key: '2',
        label: 'Is my card applicable for online payment (Debit/Credit)?',
        children: <p>{text}</p>,
      },
      {
        key: '3',
        label: 'I lost my card. How do I block it?',
        children: <p>{text}</p>,
      },
      {
        key: '4',
        label: 'I forgot the pin of my card. How do I apply for re-PIN?',
        children: <p>{text}</p>,
      },
      {
        key: '5',
        label: 'How can the credit card payment be made?',
        children: <p>{text}</p>,
      },
    ],
    'mobank': [
      {
        key: '1',
        label: "In which case does mobile banking the activation process fail?",
        children: <p>{text}</p>,
      },
      {
        key: '2',
        label: 'What should I keep in mind while setting the transaction pin?',
        children: <p>{text}</p>,
      },
      {
        key: '3',
        label: 'How to setup my Biometric login and biometric instead of transaction PIN?',
        children: <p>{text}</p>,
      },
      {
        key: '4',
        label: 'Can I register the same number for two different accounts?',
        children: <p>{text}</p>,
      },
      {
        key: '5',
        label: 'How can I request for an account statement through the application?',
        children: <p>{text}</p>,
      },
    ],
    'customer-service': [
      {
        key: '1',
        label: "Contact Customer Care",
        children: <p>{text}</p>,
      },
      {
        key: '2',
        label: 'What are the interest rates?',
        children: <p>{text}</p>,
      },
      {
        key: '3',
        label: 'Individual Savings Accounts',
        children: <p>{text}</p>,
      },
      {
        key: '4',
        label: 'What is the Forex Rate for today?',
        children: <p>{text}</p>,
      },
      {
        key: '5',
        label: 'How to open account online?',
        children: <p>{text}</p>,
      },
    ]
  };
  