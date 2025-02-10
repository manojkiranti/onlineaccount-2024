import { Helmet } from 'react-helmet-async';

type HeadProps = {
  title?: string;
  description?: string;
};

export const Head = ({ title = '', description = '' }: HeadProps = {}) => {
  return (
    <Helmet
      title={title ? `${title} | Australian Expat Mortgage` : undefined}
      defaultTitle="Australian Expat Mortgage"
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};
