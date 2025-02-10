import { message } from 'antd';
export const displayError = (error: any): void => {
  console.log('error', error);

  const errorData = error?.data?.error;
  console.log('errorData', errorData);
  if (errorData) {
    if (typeof errorData === 'string') {
      console.log('errorData', typeof errorData);
      message.error(errorData);
    } else {
      const { details, message: errorMessage, statusCode } = errorData;

      if (details && typeof details === 'object' && details !== null) {
        console.log('details', details);
        Object.keys(details).forEach((key) => {
          if (
            typeof details[key] === 'object' &&
            !Array.isArray(details[key])
          ) {
            Object.keys(details[key]).forEach((subKey) => {
              message.error(
                `${key}.${subKey} - ${details[key][subKey].join(', ')}`,
              );
            });
          } else {
            message.error(`${key} - ${details[key].join(', ')}`);
          }
        });
      } else if (errorMessage) {
        message.error(errorMessage);
      } else {
        message.error('An unexpected error occurred');
      }
    }
  } else {
    message.error('An error occurred with no additional information provided.');
  }
};

export const displaySuccess = (successMsg: any = 'Successfull'): void => {
  message.success(successMsg);
};

export const displayWarning = (warningMsg: any = 'Warning'): void => {
  message.warning(warningMsg);
};
export const displayInfo = (infoMsg: any = 'Info'): void => {
  message.info(infoMsg);
};
