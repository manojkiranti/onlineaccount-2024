import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Message } from '@/components/Layout/Assistant/AIAssistant';
export type RAGContext = {
  id: string;
  metadata: {
    source: string;
  };
  page_content: string;
  type: string;
};
export type RAGResponse = {
  result: {
    answer: string;
    chat_history: any;
    context: RAGContext[];
    input: string;
  };
  follow_up_questions: string;
};

export const ragAPI = createApi({
  reducerPath: "ragAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_RAG_API,
    prepareHeaders: (headers, { getState }) => {
        // Retrieve the access token from your state or storage
        const apiKey = import.meta.env.VITE_RAG_API_KEY; // Example: from localStorage
  
        // If the token exists, add it to the headers
        if (apiKey) {
            headers.set("access_token", apiKey);  // Add the access token to the header
          }
        return headers;
      },
  }),
  endpoints: (builder) => ({
    queryRAG: builder.mutation<RAGResponse, { query: string; chat_history: Message[] }>({
      query: (body) => {
        return {
          url: "/api/query",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useQueryRAGMutation } = ragAPI;
