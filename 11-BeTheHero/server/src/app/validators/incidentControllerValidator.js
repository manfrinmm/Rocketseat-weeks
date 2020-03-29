import { celebrate, Segments, Joi } from "celebrate";

const destroy = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
});

export default { destroy };
