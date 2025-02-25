import joi from "joi";

const newPostSchema = joi.object({
  url: joi.string().uri().required(),
  description: joi.string().allow(""),
});

export default newPostSchema;
