import Joi from 'joi';
import { User } from '../types/User';
import { Book } from '../types/Book';

export const createUserValidation = (body: Partial<User>)=>{
    let data = Joi.object({
      firstName: Joi.string().required().max(50).min(2).messages({
        "string.base": "First name should be a string.",
        "string.empty": "First name is required.",
        "string.min": "First name should have a minimum length of {#limit}.",
        "string.max": "First name should have a maximum length of {#limit}.",
      }),
      lastName: Joi.string().required().max(50).min(2).messages({
        "string.base": "Last name should be a string.",
        "string.empty": "Last name is required.",
        "string.min": "Last name should have a minimum length of {#limit}.",
        "string.max": "Last name should have a maximum length of {#limit}.",
      }),
      password: Joi.string()
        .required()
        .min(8)
        .messages({
          "string.base": "Password should be a string.",
          "string.empty": "Password is required.",
          "string.min": "Password should have a minimum length of {#limit}.",
          "string.pattern.base":
            "Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        }),
      email: Joi.string().required().email().messages({
        "string.base": "Email should be a string.",
        "string.empty": "Email is required.",
        "string.email": "Email must be a valid email address.",
      })
    });
    return data.validate(body)
}

export const registerBookValidation = (body: Book)=>{
  const BookSchema = Joi.object({
    id: Joi.string().optional(),
    name: Joi.string().required().max(50).min(2).messages({
      "string.base": "Name of the book should be a string.",
      "string.empty": "Name of the book is required.",
      "string.max": "Name of the book should have a maximum length of {#limit}.",
      "string.min": "Name of the book should have a minimu length of {#limit}.",
    }),
    author: Joi.string().required().max(50).min(2).messages({
      "string.base": "Author's name should be a string.",
      "string.empty": "Author's name is required.",
      "string.max": "Author's name should have a maximum length of {#limit}.",
      "string.min": "Author's name should have a minimum length of {#limit}.",

    }),
    publisher: Joi.string().required().max(20).messages({
      "string.base": "Publisher should be a string.",
      "string.empty": "Publisher is required.",
      "string.max": "Publisher should have a maximum length of {#limit}.",
      "string.min": "Publisher should have a minimum length of {#limit}.",
    }),
  
    publicationYear: Joi.string().required().messages({
      "string.base": "Publication year should be a string.",
      "string.empty": "Publication year is required."
    }),
    subject: Joi.string().required().max(100).messages({
      "string.base": "Subject should be a string.",
      "string.empty": "Subject is required.",
      "string.max": "Subject should have a maximum length of {#limit}.",
    })
  })
  return BookSchema.validate(body);

}
export const updateUserValidation = (body: User) => {
  let data = Joi.object({
    fullName: Joi.string().required().max(50).min(2).messages({
      "string.base": "Full name should be a string.",
      "string.empty": "Full name is required.",
      "string.min": "Full name should have a minimum length of {#limit}.",
      "string.max": "Full name should have a maximum length of {#limit}.",
    }),
    email: Joi.string().required().email().messages({
      "string.base": "Email should be a string.",
      "string.empty": "Email is required.",
      "string.email": "Email must be a valid email address.",
    }),
    userName: Joi.string().required().alphanum().min(3).max(30).messages({
      "string.base": "Username should be a string.",
      "string.empty": "Username is required.",
      "string.alphanum": "Username must only contain alpha-numeric characters.",
      "string.min": "Username should have a minimum length of {#limit}.",
      "string.max": "Username should have a maximum length of {#limit}.",
    }),
  });
  return data.validate(body);
};