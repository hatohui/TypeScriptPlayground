import CoursePart from "../types/CoursePartType";
import { Part } from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps): JSX.Element => {
  return (
    <div>
      {props.courseParts.map((each) => {
        return (
          <>
            <div>-----------</div>
            <Part part={each} />
          </>
        );
      })}
    </div>
  );
};

export default Content;
