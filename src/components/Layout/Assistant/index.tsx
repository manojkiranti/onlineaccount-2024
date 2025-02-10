import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Tooltip, Typography, theme, Tabs } from "antd";
import type { TabsProps } from 'antd';
import AIAssistant from "./AIAssistant";
import FAQ from "./FAQContent";
const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Bankify AI Assistant',
      children: <AIAssistant />,
    },
    {
      key: '2',
      label: 'FAQ',
      children: <FAQ />
    }
  ];

const Assistant = () => {
  const handleCloseAssistant = () => {
    document.body.classList.toggle("assistant-open");
  };
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <div>

        <Tooltip title="Close">
          <Button
            type="text"
            onClick={handleCloseAssistant}
            shape="circle"
            icon={<CloseOutlined />}
            style={{position: 'absolute', right:'9px', top:'5px', zIndex: 9}}
          />
        </Tooltip>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} tabBarStyle={{padding:"0 1rem"}} />
    </div>
  );
};

export default Assistant;
