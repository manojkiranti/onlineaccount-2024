import Background from '@/assets/images/auth-page-backgound-min.jpeg';
const RegisterBanner = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          height: '100%',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '0',
            height: '100%',
            width: '100%',
            top: '0',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}
        />
      </div>
    </>
  );
};

export default RegisterBanner;
