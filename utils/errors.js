const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const FORBIDDEN = 403;
const CONFLICT = 409;

module.exports = {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
};

// const { BadRequestError } = require("../errors/BadRequstError");
// const { NotFound } = require("../errors/NotFound");
// const { DuplicateError } = require("../errors/DuplicateError");
// const { Default } = require("../errors/Default");
// const { NotAuthorized } = require("../errors/NotAuthorized");
// const { ForbiddenError } = require("../errors/ForbiddenError");

// function handleErrors(err, next) {
//   console.error(err);
//   if (err.name === "ValidationError" || err.name === "CastError") {
//     return next(new BadRequestError("Bad Request"));
//     // return next(new NotAuthorized("Authorization required"));
//   }
//   if (err.name === "DocumentNotFoundError") {
//     // return res.status(NOT_FOUND).send({ message: err.message });
//     return next(new NotFound("Not Found"));
//   }
//   if (err.code === 11000) {
//     // return res.status(DUPLICATE_ERROR).send({ message: "Duplicate error" });
//     return next(new DuplicateError("Duplicate Error"));
//   }
//   if (err.statusCode === 401) {
//     return next(new NotAuthorized("Not Authorized Error"));
//   }
//   // return res.status(DEFAULT).send({ message: err.message });
//   return next(new Default("Server Error"));
// }

// module.exports = {
//   BadRequestError,
//   ForbiddenError,
//   NotFound,
//   Default,
//   NotAuthorized,
//   handleErrors,
//   DuplicateError,
//   BAD_REQUEST: 400,
//   FORBIDDEN_ERROR: 403,
//   NOT_FOUND: 404,
//   DEFAULT: 500,
//   NOT_AUTHORIZED: 401,
//   OKAY_REQUEST: 200,
//   CREATE_REQUEST: 201,
//   DUPLICATE_ERROR: 409,
// };
