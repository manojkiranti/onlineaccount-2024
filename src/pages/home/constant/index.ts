import { faCreditCard, faCreditCardFront, faWindowRestore, faBan, faLockOpen, 
    faMobile, faMobileRetro, faSignalStreamSlash, faCheckToSlot, faMoneyBillTransfer, faBadgeCheck, 
    faSackDollar, faMoneyCheckPen, faShield, faMessageDots, faOctagonExclamation, faFileCertificate, faCloudCheck,
    faHome, faCoin, faMoneyBillTrendUp, faMobileNotch, faRouter, faLightbulb, faPlaneDeparture, faFaucetDrip, faPhoneRotary,
    faUniversity, faTvRetro, faHandsHeart
 } from "@fortawesome/pro-light-svg-icons";

export const paymentServices = [
    {
        icon: faMobileNotch,
        title: "Topup",
        offer: "1-2% cashback",
        link: "/payment/topup",
        parentId: 'payments',
        key:'topup'
    },
    {
        icon: faRouter,
        title: "Internet",
        offer: "2% cashback",
        link: "/payment/internet",
        parentId: 'payments',
        key:'internet',
    },
    {
        icon: faLightbulb,
        title: "Electricity",
        link: "/payment/electricity",
        parentId: 'payments',
        key:'electricity'
      },
      {
        icon: faPlaneDeparture,
        title: "Flight",
        offer: "5-6% cashback",
        link: "/payment/flight",
        parentId: 'payments',
        key:'flight'
      },
      {
        icon: faFaucetDrip,
        title: "Khanipani",
        link: "/payment/khanipani",
        parentId: 'payments',
        key:'khanipani'
      },
      {
        icon: faPhoneRotary,
        title: "Landline",
        offer: "1% cashback",
        link: "/payment/landline",
        parentId: 'payments',
        key:'landline'
      },
      {
        icon: faUniversity,
        title: "Government Payment",
        link: "/payment/government-payment",
        parentId: 'payments',
        key:'government-payment',
      },
      {
        icon: faTvRetro,
        title: "TV",
        offer: "5% cashback",
        link: "/payment/tv",
        parentId: 'payments',
        key:'tv',
      },
      {
        icon: faHandsHeart,
        title: "Insurance",
        link: "/payment/insurance",
        parentId: 'payments',
        key:'insurance'
      },
]
export const cardServices = [
    {
        title: "New Debit Card",
        icon: faCreditCard,
        link: 'new-debit-card',
        name: 'newDebitCard'
    },
    {
        title: "New Credit Card",
        icon: faCreditCardFront,
        link: 'new-credit-card',
        name: 'newCreditCard'
    },
    {
        title: "Re-Pin Debit Card",
        icon: faWindowRestore,
        link: 'repin-request',
        name: 'repinDebitCard'
    },
    {
        title: "Debit Card Block",
        icon: faBan,
        link: 'debit-card-block',
        name: 'debitCardBlock'
    },
    {
        title: "Debit Card Unblock",
        icon: faLockOpen,
        link: 'debit-card-unblock',
        name: 'debitCardUnblock'
    }
]

export const mobileBankingServices = [
    {
        title: "New Registration",
        icon: faMobile,
        link: 'new-registration',
        name: 'mobankRegister'
    },
    {
        title: "PIN Reset",
        icon: faMobileRetro,
        link: 'reset-pin',
        name: 'mobankPinReset'
    },
    {
        title: "Deactivate",
        icon: faSignalStreamSlash,
        link: 'deactivate',
        name: 'mobankDeactivate'
    },
    {
        title: "Activate",
        icon: faCheckToSlot,
        link: 'activate',
        name: 'mobankActivate'
    }
]

export const customerServices = [
    {
        title: "Open Fixed Deposit",
        icon: faMoneyBillTransfer,
        link: 'fixed-deposit',
        name: 'fdOpenAccount'
    },
    {
        title: "Dispute Claim",
        icon: faBadgeCheck,
        link: 'dispute-claim',
        name: 'disputeClaim'
    },
    {
        title: "Block Account(Hack/Scam)",
        icon: faShield,
        link: 'account-freeze',
        name: 'accountFreeze'
    },
    {
        title: "Cheque Request",
        icon: faMessageDots,
        link: 'cheque-request',
        name: 'chequeRequest'
    },
    {
        title: "Cheque Stop",
        icon: faOctagonExclamation,
        link: 'cheque-stop',
        name: 'chequeStop'
    },
    {
        title: "Balance Certificate",
        icon: faFileCertificate,
        link: 'balance-certificate-request',
        name: 'balanceCertificate'
    },
    {
        title: "Locker Request",
        icon: faFileCertificate,
        link: 'locker-request',
        name: 'lockerRequest'
    }
]


export const tellerServices = [
    {
        title: "Cash Deposit",
        icon: faSackDollar,
        link: 'cash-deposit',
        name: 'cashDeposit'
    },
    {
        title: "Cheque Deposit",
        icon: faMoneyCheckPen,
        link: 'cheque-deposit',
        name: 'chequeDeposit'
    }
]

export const documentVerificationServices = [
    {
        title: "Bank Gurantee Verification",
        icon: faCloudCheck,
        link: 'bank-guarantee',
        name: 'bankGuraneeVerification'
    }
]

export const loanServices = [
    {
        title: "Home Loan",
        icon: faHome,
        link: 'home-loan',
        name: 'homeLoan'
    },
    {
        title: "Gold Loan",
        icon: faCoin,
        link: 'gold-loan',
        name: 'goldLoan'
    },
    {
        title: "Loan Against Share",
        icon: faMoneyBillTrendUp,
        link: 'loan-against-share',
        name: 'loanAgainstShare'
    },
    {
        title: "Credit Card",
        icon: faCreditCard,
        link: 'credit-card-loan',
        name: 'creditCardLoan'
    }
]