import CoursePart from "../types/CoursePartType";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

type PartProp = {
  part: CoursePart;
};

export const Part = (prop: PartProp): JSX.Element => {
  const part = prop.part;
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h4>{part.name}</h4>
          {part.description && (
            <div>
              <i>{part.description}</i>
            </div>
          )}
        </div>
      );
    case "background":
      return (
        <div>
          <h4>{part.name}</h4>
          <div>
            <i>{part.description}</i>
          </div>
          <div>Submit to {part.backgroundMaterial}</div>
        </div>
      );
    case "group":
      return (
        <div>
          <h4>{part.name}</h4>
        </div>
      );
    case "special":
      return (
        <div>
          <h4>{part.name}</h4>
          <div>
            <i>{part.description}</i>
          </div>
          <div>Required skills: {part.requirements.join(" ,")}</div>
        </div>
      );
    default:
      return assertNever(part);
  }
};
