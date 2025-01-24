import { Router} from 'express';

export const foodRouter = Router();

foodRouter.get('/:id', async (req, res) => {
  res.send({
    message: " IHH HOOOLLLL",
  });
});
