const Ajv = require("ajv");
const  addFormats  = require("ajv-formats");

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

function validate(schema) {
  const validation = ajv.compile(schema);

  return (req, res, next) => {
    const valid = validation(req.body);
    if (!valid) {
      const messages = validation.errors
        .map((e) => {
          const field = e.instancePath
            ? e.instancePath.replace(/^\//, "")
            : e.params.missingProperty || "";
          return `${field}: ${e.message}`;
        })
        .join(", ");

      const err = new Error(messages); // set combined message
      err.status = 400;
      return next(err);
    }
    next();
  };
}

module.exports = validate;
