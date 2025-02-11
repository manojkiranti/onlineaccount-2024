declare module '@sbmdkl/nepali-datepicker-reactjs' {
    interface onChangeValue {
      bsDate: string
      adDate: string
    }
  
    interface Props {
      onChange: (value: onChangeValue) => void
      className?: string
      language: 'NE' | 'EN' | 'ENGLISH'
      theme: 'default' | 'red' | 'blue' | 'green' | 'dark' | 'deepdark'
      dateFormat?: string
      style?: React.CSSProperties
      minDate?: string
      maxDate?: string
      defaultDate?: string
      hideDefaultValue?: boolean
      placeholder?: string
    }
  
    export default class Calendar extends React.Component<Props> {}
  }