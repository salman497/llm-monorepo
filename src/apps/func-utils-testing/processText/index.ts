import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { reverseString, isPalindrome, capitalize } from '@monorepo/utils';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log('HTTP trigger function processed a request.');
  
  const text = (req.body && req.body.text) || '';
  
  if (!text) {
    context.res = {
      status: 400,
      body: { error: "Please provide a text in the request body" }
    };
    return;
  }

  try {
    // Process the text using the utils library
    const result = {
      original: text,
      reversed: reverseString(text),
      isPalindrome: isPalindrome(text),
      capitalized: capitalize(text)
    };

    context.res = {
      status: 200,
      body: {
        processedText: `Results:
          - Original: ${result.original}
          - Reversed: ${result.reversed}
          - Is Palindrome: ${result.isPalindrome}
          - Capitalized: ${result.capitalized}`
      }
    };
  } catch (error) {
    context.log.error('Error processing text:', error);
    context.res = {
      status: 500,
      body: { error: "An error occurred while processing your text" }
    };
  }
};

export default httpTrigger; 