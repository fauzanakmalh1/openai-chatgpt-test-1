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
