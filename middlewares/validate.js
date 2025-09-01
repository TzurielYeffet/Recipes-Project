const Ajv = require("ajv");
const { addFormat } = require("ajv-formats");

const ajv = new Ajv({ allErrors: true });
addFormat(ajv);

function validate(schema) {
  const validate = ajv.compile(schema);

  return (req, res, next) => {
    const valid = validate(req.body);
    if (!valid) {
      const messages = validateFn.errors
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
