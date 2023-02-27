import { Configuration, OpenAIApi } from 'openai';

let openaiInstance: OpenAIApi;

const initialize = () => {
  if (openaiInstance) {
    return openaiInstance;
  } else {
    try {
      const configuration = new Configuration({
        apiKey: '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',
      });

      const instance = new OpenAIApi(configuration);
      openaiInstance = instance;
      return instance;
    } catch (error) {
      console.log(error);
    }
  }
};

export default initialize;
