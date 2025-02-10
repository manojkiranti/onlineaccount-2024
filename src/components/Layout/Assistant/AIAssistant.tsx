import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import {
  ArrowUpOutlined,
  CloseOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Tooltip, Typography, theme, Input, List, Space, Flex } from "antd";
import type { InputProps } from "antd";
import type { GetProps } from 'antd';
import { RAGContext, useQueryRAGMutation } from "@/store/apis/ragAPI";
import Scrollbars from "rc-scrollbars";
import { Link } from "react-router-dom";
import Paragraph from "antd/es/typography/Paragraph";

type SearchProps = GetProps<typeof Input.Search>;

const { useToken } = theme;
const { Search } = Input;

const initialQueries = [
  {
    label: "How to get DMAT, CRN and MERO SHARE?",
  },
  {
    label: "How to activate Connect IPS?",
  },
  {
    label: "What is Garima Mobile banking?",
  },
  {
    label: "What services can I access through Garima Digi Batuwa?",
  },
];

export type Message = {
  role: 'human' | 'ai';
  content: string;
  context?: RAGContext[];
  followUpQuestions?: string;
};



const AIAssistant = () => {
  const { token } = useToken();
  const [messages, setMessages] = useState<Message[]>([]);
  const [showInitial, setShowInitial] = useState(true);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(""); // State for input value

   const [queryRAG, {isLoading:ragQueryLoading}] =useQueryRAGMutation();

  const handleSearch: SearchProps["onSearch"] = async (value) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return;

    setInputValue(""); // Clear the input after submission


    // Add user message to the conversation
    const newMessages = [...messages, { role: 'human', content: trimmedValue }];
    setMessages(newMessages as any);
    setShowInitial(false);
    setLoading(true);

    try {
      // Call your AI API here and get the response
      // For demonstration, we'll use a mock response with a timeout
      const aiResponse = await queryRAG({query:trimmedValue,  chat_history: messages}).unwrap();

      // Add AI response to the conversation
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: 'ai',
          content: aiResponse.result.answer,
          context: aiResponse?.result.context,
          followUpQuestions: aiResponse?.follow_up_questions,
        },
      ]);

    } catch (error) {
      // Handle API errors
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'ai', content: 'Sorry, something went wrong.' },
      ]);
    } finally {
      setLoading(false);
    }
  };


  // Handle input change to make the Search component controlled
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Scroll to bottom when messages change
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle Clear Chat
  const handleClearChat = () => {
    setMessages([]);
    setShowInitial(true);
    setInputValue("");
  };

  return (
    <>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: "1rem",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {showInitial && (
          <>
            <Typography.Title
              level={4}
              style={{ color: token.colorPrimary, fontWeight: 600 }}
            >
              Do you have any queries about Bank Genie services?
            </Typography.Title>

            
          </>
        )}

        {!showInitial && (
          <Scrollbars style={{height:"calc(100vh - 190px)"}}>
            <List
              dataSource={messages}
              renderItem={(item) => (
                <List.Item
                  style={{
                    display: 'flex',
                    justifyContent:
                      item.role === 'human' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '90%',
                      padding: '0.5rem 1rem',
                      borderRadius: '15px',
                      backgroundColor:
                        item.role === 'human'
                          ? token.colorBgLayout
                          : 'transparent',
                      color:
                        item.role === 'human'
                          ? token.colorPrimaryText
                          : token.colorText,
                    }}
                  >
                    {/* <Typography.Text>{item.content}</Typography.Text> */}
                    <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
                      {item.content}
                    </ReactMarkdown>
                    {item.role === 'ai' &&
                      item.context &&
                      item.context.length > 0 && (
                        <div
                          style={{
                            background: 'rgba(0,0,0,0.1)',
                            padding: '1rem',
                            marginTop: '1rem',
                            marginBottom: '1rem',
                          }}
                        >
                          <Typography.Title
                            level={5}
                            style={{ margin: '0 0 10px' }}
                          >
                            References:
                          </Typography.Title>
                          <ul>
                            {item.context.map((item) => {
                              const transformedUrl = item.metadata.source;
                              return (
                                <Link
                                  to={transformedUrl}
                                  target="_blank" // You still need this for opening in a new tab
                                  rel="noopener noreferrer"
                                >
                                  <li
                                    key={item.id}
                                    style={{
                                      margin: '5px 0',
                                      wordWrap: 'break-word',
                                    }}
                                  >
                                    {transformedUrl}
                                  </li>
                                </Link>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    {item.role === 'ai' && item.followUpQuestions && (
                      <>
                        <Typography.Title
                          level={5}
                          style={{ margin: '0 0 10px' }}
                        >
                          Follow Up Questions:
                        </Typography.Title>
                        {item.followUpQuestions
                          .split('\n')
                          .map((question, index) => {
                            return (
                              <div
                                key={index}
                                onClick={() => handleSearch(question)}
                                style={{
                                  background: 'rgba(0,0,0,0.1)',
                                  display: 'inline-block',
                                  margin: '0 0 10px',
                                  fontWeight: '700',
                                  padding: '10px',
                                  borderRadius: '5px',
                                  cursor: 'pointer',
                                }}
                              >
                                <Paragraph
                                  style={{ fontSize: '11px', margin: '0' }}
                                >
                                  {index + 1}: {question}
                                </Paragraph>
                              </div>
                            );
                          })}
                      </>
                    )}
                  </div>
                </List.Item>
              )}
            />
             <div ref={messagesEndRef} />
          </Scrollbars>
        )}
       
      </div>

      {/* Input */}
      <div
        style={{
          padding: "1rem",
          position: "fixed",
          left: 0,
          bottom: 0,
          backgroundColor: "#fff",
          width:"100%"
        }}
      >

        {showInitial && <div style={{ marginTop: "1rem", marginBottom:"1rem" }}>
            <Flex wrap>
                {initialQueries.map((query, index) => (
                    <div className="query-col"  key={index}>
                            <div className="query-card"
                            style={{ margin: "0.5rem 0", width: "100%" }}
                            onClick={() => handleSearch(query.label)}
                            >
                            {query.label}
                            </div>
                    </div>
                ))}
            </Flex>
            </div>}
           
        <Flex gap={10}>
          <Search
            placeholder="Ask a question..."
            allowClear
            enterButton={<ArrowUpOutlined />}
            size="large"
            onSearch={handleSearch}
            onChange={handleInputChange} // Attach the onChange handler
            value={inputValue} // Bind the input value to state
            loading={loading}
            disabled={loading}

          />
          <Button
            type="default"
            icon={<ReloadOutlined />}
            onClick={handleClearChat}
            disabled={messages.length === 0 && showInitial}
            size="large"
          >
            
          </Button>
        </Flex>
      </div>
    </>
  );
};

export default AIAssistant;
