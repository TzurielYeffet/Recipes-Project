export const recipeSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      minLength: 3,
      maxLength: 100
    },
    description: {
      type: "string",
      minLength: 10,
      maxLength: 500
    },
    ingredients: {
      type: "array",
      minItems: 1,
      items: { type: "string" }
    },
    instructions: {
      type: "array",
      minItems: 1,
      items: { type: "string" }
    },
    cookingTime: {
      type: "number",
      minimum: 0.01 
    },
    servings: {
      type: "integer",
      minimum: 1      
    },
    difficulty: {
      type: "string",
      enum: ["easy", "medium", "hard"]
    }
  },
  required: [
    "title",
    "description",
    "ingredients",
    "instructions",
    "cookingTime",
    "servings",
    "difficulty"
  ],
  additionalProperties: false
};
