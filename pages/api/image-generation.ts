import { NextApiRequest, NextApiResponse } from 'next';

import initialize from '@libs/openai';

const createCompletion = async (req: NextApiRequest, res: NextApiResponse) => {
  const openai = initialize();
  if (!openai) return res.send({ error: 'error' });


  try {
    const image = await openai.createImage({
      prompt: req.body.prompt,
      n: 1,
      size: '512x512',
    });

    console.log(image);
    res.send({ data: image.data });
  } catch (error) {
    console.log(error);
    res.send({ error: error });
  }
};

export default createCompletion;
