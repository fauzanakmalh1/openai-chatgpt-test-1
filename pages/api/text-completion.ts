import { NextApiRequest, NextApiResponse } from 'next';

import initialize from '@libs/openai';

const createCompletion = async (req: NextApiRequest, res: NextApiResponse) => {
  const openai = initialize();
  if (!openai) return res.send({ error: 'error' });

  console.log(req.body.prompt);

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: req.body.prompt,
      temperature: 1,
      max_tokens: 500,
    });

    res.send({ data: completion.data });
  } catch (error) {
    res.send({ error: error });
  }
};

export default createCompletion;
