// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';


  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const tools = [
    {
      googleSearch: {
      }
    },
  ];
  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    tools,
  };
  const model = 'gemini-2.5-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `Job Position: Full Stack Developer, Job Description: React,Node.js,MySql , Year of experience :6, Depend on this Infromation please give 5 Interview Questions with answer in JSON formate give question and answer as feild in JSON`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `**Generating Interview Questions**

I'm currently drafting interview questions and crafting concise answers tailored for a Full Stack Developer with six years of experience. The focus is on React, Node.js, and MySQL. I'm aiming for JSON format for each question and its answer.


**Crafting JSON Structure**

I'm now structuring the JSON format for the interview questions and answers. I'm focusing on a clean and easily parseable structure for the React, Node.js, MySQL, and full stack questions. I'm thinking of creating a top-level "questions" array, where each object represents a question with its corresponding answer.


`,
        },
        {
          text: `\`\`\`json
[
  {
    "question": "In React, how do you optimize performance for a large application with many components? Discuss specific techniques and hooks.",
    "answer": "Performance optimization in large React applications involves several techniques. Memoization with \`React.memo\` (for functional components) and \`PureComponent\` (for class components) prevents unnecessary re-renders when props haven't changed. The \`useMemo\` hook memoizes expensive calculations, and \`useCallback\` memoizes functions passed down to child components to prevent re-creation on every render. Virtualization/windowing libraries like \`react-window\` or \`react-virtualized\` are crucial for displaying large lists efficiently. Lazy loading components using \`React.lazy\` and \`Suspense\` can reduce initial bundle size and improve load times. Finally, optimizing state updates to avoid deeply nested state changes and using context API judiciously can also help."
  },
  {
    "question": "Describe the event-driven architecture in Node.js. How does the event loop work, and why is it crucial for Node.js's non-blocking I/O model?",
    "answer": "Node.js operates on an event-driven, non-blocking I/O model, with the event loop at its core. When an asynchronous operation (like a database query, file read, or network request) is initiated, Node.js offloads it to the operating system or a worker pool and immediately moves on to process other code, rather than waiting. Once the asynchronous operation completes, a callback function is placed in the event queue. The event loop continuously checks this queue and pushes callbacks onto the call stack when the call stack is empty. This single-threaded, non-blocking nature allows Node.js to handle a large number of concurrent connections efficiently without creating a new thread for each request, making it highly scalable for I/O-bound operations."
  },
  {
    "question": "You are designing a database schema in MySQL for an e-commerce platform. How would you handle product categories and their subcategories (multi-level nesting), and what considerations would you have for querying products within a specific category or its descendants efficiently?",
    "answer": "For multi-level product categories, an Adjacency List model is common, where each category has a \`parent_id\` pointing to its parent category (or NULL for top-level categories). This is simple but inefficient for querying descendants. A better approach for efficient querying of descendants is a Closure Table or a Nested Set model. A Closure Table involves a separate table (\`category_paths\`) storing all ancestral relationships (ancestor_id, descendant_id, depth). Querying all descendants of a category then becomes a simple join. Alternatively, a Materialized Path (e.g., '1/2/5/') in a column can be used, allowing \`LIKE 'path/%'\` queries, though maintaining it can be complex on updates. Indexing \`parent_id\` and the \`category_id\` in the main categories table is essential. For the Closure Table, composite indexes on \`(ancestor_id, descendant_id)\` and \`(descendant_id, ancestor_id)\` would be crucial."
  },
  {
    "question": "As a Full Stack Developer, you need to implement secure authentication and authorization. What are the key considerations and steps you would take to ensure the security of your user data and API endpoints?",
    "answer": "Key considerations include using HTTPS for all communication, implementing strong password policies (hashing with bcrypt/scrypt, salting), and protecting against common vulnerabilities like SQL injection, XSS, and CSRF. For authentication, JWT (JSON Web Tokens) or session-based authentication (with secure cookies) are common. If using JWTs, ensure tokens are signed with a strong secret, set short expiration times, and implement refresh tokens securely. For authorization, implement role-based access control (RBAC) or attribute-based access control (ABAC) on the server-side, validating user permissions for every API request. Rate limiting on login attempts, multi-factor authentication (MFA), proper input validation, and secure handling of sensitive data (encryption at rest) are also critical. Regularly updating dependencies and performing security audits are ongoing steps."
  },
  {
    "question": "Discuss how you would approach integrating a third-party API into your Node.js backend. What steps would you take, and what potential challenges might you encounter?",
    "answer": "Integrating a third-party API involves several steps. First, thoroughly read the API documentation to understand endpoints, authentication methods (API keys, OAuth, etc.), rate limits, and data formats. Use a robust HTTP client library (like \`axios\` or \`node-fetch\`). Implement proper error handling for network issues, API errors (HTTP status codes 4xx/5xx), and malformed responses. For security, never hardcode API keys; use environment variables. Implement caching for frequently accessed, static data to reduce API calls and improve performance. Potential challenges include managing rate limits effectively (implementing retry mechanisms with backoff), handling different authentication flows, ensuring data consistency between your system and the external API, dealing with API versioning changes, and robustly transforming and validating data received from the external API to fit your application's schema."
  }
]
\`\`\``,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

