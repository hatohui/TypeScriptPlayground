import { Diagnosis, Entry } from "../types";
import { assertNever } from "../utils";

const EntryDetail = ({
  entry,
  diagnosis,
}: {
  entry: Entry;
  diagnosis: Diagnosis[] | undefined;
}) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <div>
          <br></br>
          <span>{entry.date} </span>
          <i>{entry.description}</i>
          <ul>
            {entry.diagnosisCodes?.map((each) => (
              <li key={each}>
                {each}: {diagnosis?.find((d) => d.code === each)?.name}
              </li>
            ))}
          </ul>
          <div>
            <span>
              <i> {entry.discharge.date} </i>
              <span> {entry.discharge.criteria}</span>
            </span>
          </div>
        </div>
      );
    case "HealthCheck":
      return (
        <div>
          <br></br>
          <span>{entry.date} </span>
          <i>{entry.description}</i>
          <div>
            <span>Rating: {entry.healthCheckRating}</span>
          </div>
          <div>
            <span>Specialist: {entry.specialist}</span>
          </div>
          <ul>
            {entry.diagnosisCodes?.map((each) => (
              <li key={each}>
                {each}: {diagnosis?.find((d) => d.code === each)?.name}
              </li>
            ))}
          </ul>
          <br></br>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <br></br>
          <span>{entry.date} </span>
          <i>{entry.description}</i>
          <div>
            <span>Employer name: {entry.employerName}</span>
          </div>
          <div>
            <span>Specialist: {entry.specialist}</span>
          </div>
          <ul>
            {entry.diagnosisCodes?.map((each) => (
              <li key={each}>
                {each}: {diagnosis?.find((d) => d.code === each)?.name}
              </li>
            ))}
          </ul>
          <br></br>
        </div>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetail;
