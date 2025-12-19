### Assignment 3 categorizer

### Installation
1. Clone the repository and navigate to the folder:
```bash
   $ cd assignment_3_categorizer
``` 
2. Install dependencies:
```bash
   $ npm install
```
3. Create a .env file
```bash
   $ OPENAI_API_KEY=your_openai_api_key
```

### Testing automation categorizer
```bash
   $ npx ts-node test.ts
```

### Design Decisions
1. Strict Category Control
- LLM output is validated using a type by isValidCategory for ensures the function never return a unknown category
- Any hallucinated or unexpected output is output to invalid

2. Prompt Design
- Strict output format category name only
- Clearly rules for edge cases (empty, nonsense, random word)
- Clearly specify the allowed categories

### Time Spent
I used 55 min for this assignment
- Categorizer logic : ~25 minutes
- Prompt design : ~20 minutes
- Error handling & edge cases: ~10 minutes