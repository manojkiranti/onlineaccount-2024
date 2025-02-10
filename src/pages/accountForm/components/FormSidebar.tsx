import { UserOutlined } from "@ant-design/icons";
import { Collapse, Input, AutoComplete } from "antd";
import type { CollapseProps } from "antd";
import { SUPPORT_IMG2 } from "@/utils/images";
import Title from "antd/es/typography/Title";

const renderTitle = (title: string) => (
  <span>
    {title}
    <a
      style={{ float: "right" }}
      href="https://www.google.com/search?q=antd"
      target="_blank"
      rel="noopener noreferrer"
    >
      more
    </a>
  </span>
);

const renderItem = (title: string, count: number) => ({
  value: title,
  label: (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {title}
      <span>
        <UserOutlined /> {count}
      </span>
    </div>
  ),
});

const options = [
  {
    label: renderTitle("Libraries"),
    options: [
      renderItem("AntDesign", 10000),
      renderItem("AntDesign UI", 10600),
    ],
  },
  {
    label: renderTitle("Solutions"),
    options: [
      renderItem("AntDesign UI FAQ", 60100),
      renderItem("AntDesign FAQ", 30010),
    ],
  },
  {
    label: renderTitle("Articles"),
    options: [renderItem("AntDesign design language", 100000)],
  },
];

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "What are the documents required to open an Individual account? ",
    children: <p>{text}</p>,
  },
  {
    key: "2",
    label: "How to open an account in NIC ASIA Bank? ",
    children: <p>{text}</p>,
  },
  {
    key: "3",
    label: "What is an account nominee? ",
    children: <p>{text}</p>,
  },
  {
    key: "4",
    label: "What is an account nominee? ",
    children: <p>{text}</p>,
  },
];

const FormSidebar = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  return (
    <div className="sidebar">
      <Title level={2} style={{ textAlign: "center" }}>
        How can we help you?
      </Title>
      <div style={{ padding: "1rem 2rem 0" }}>
        <AutoComplete
          popupClassName="certain-category-search-dropdown"
          options={options}
          style={{ width: "100%", height: "50px" }}
        >
          <Input.Search size="large" placeholder="Describe your issue" />
        </AutoComplete>
      </div>
      <div style={{ padding: "2rem 0 2rem" }}>
        <Collapse items={items} defaultActiveKey={["1"]} onChange={onChange} />
      </div>
      <div className="support-imgage">
        <img src={SUPPORT_IMG2} alt="" />
      </div>
    </div>
  );
};

export default FormSidebar;
