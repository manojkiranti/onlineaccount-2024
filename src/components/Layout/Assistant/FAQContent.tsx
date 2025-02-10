import FAQ from "../Sidebar/FAQ";

const FAQContent = () => {
    return (
        <div
        style={{
          flex: 1,
          padding: "1rem",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <FAQ />
        </div>
    );
};

export default FAQContent;