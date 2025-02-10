const FormTitleLabel = ({ label }: { label: string }) => {
  return (
    <div className="form-label-wrap">
      <label
        style={{
          fontWeight: 500,
          display: 'inline-block',
          marginBottom: '5px',
        }}
      >
        {label}
      </label>
    </div>
  );
};

export default FormTitleLabel;
