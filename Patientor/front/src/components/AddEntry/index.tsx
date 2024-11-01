import { useState } from "react";
import { useStringField } from "../../Hooks/useField";
import patientService from "../../services/patients";
import { EntryWithoutId, Patient } from "../../types";

const AddNewEntry = ({
  patient,
  setPatient,
}: {
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
}) => {
  const { reset: resetDes, ...description } = useStringField("text");
  const { reset: resetDate, ...date } = useStringField("date");
  const { reset: resetSpelist, ...specialist } = useStringField("text");
  const { reset: resetHealthRating, ...rating } = useStringField("number");
  const [type, setType] = useState<string>("Hospital");
  const { reset: resetCode, ...code } = useStringField("text");
  const [diagnosisCodes, setDianosisCodes] = useState<string[]>([]);
  const { reset: resetDischargeDate, ...dischargeDate } =
    useStringField("date");
  const { reset: resetCriteria, ...criteria } = useStringField("text");
  const { reset: resetEmployerName, ...employerName } = useStringField("text");
  const { reset: resetSickStart, ...sickStart } = useStringField("date");
  const { reset: resetSickEnd, ...sickEnd } = useStringField("date");
  const [message, setMessage] = useState<string>("");

  const resetAll = () => {
    resetDes();
    resetDate();
    resetSpelist();
    resetHealthRating();
    resetCode();
    resetDischargeDate();
    resetCriteria();
    resetEmployerName;
    resetSickStart();
    resetSickEnd();
    setType("Hospital");
    setDianosisCodes([]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let entry = {
      description: description.value,
      date: date.value,
      specialist: specialist.value,
    };

    if (diagnosisCodes.length !== 0) {
      (entry as any).diagnosisCodes = diagnosisCodes;
    }

    let toSend;
    switch (type) {
      case "Hospital":
        toSend = {
          ...entry,
          type: "Hospital",
          discharge: {
            date: dischargeDate.value,
            criteria: criteria.value,
          },
        };
        break;
      case "HealthCheck":
        toSend = {
          ...entry,
          type: "HealthCheck",
          healthCheckRating: rating.value,
        };
        break;
      case "OccupationalHealthcare":
        toSend = {
          ...entry,
          type: "OccupationalHealthcare",
          employerName: employerName.value,
        };
        if (sickStart || sickEnd) (toSend as any).sickLeave = {};
        if (sickStart.value)
          (toSend as any).sickLeave.startDate = sickStart.value;
        if (sickEnd.value) (toSend as any).sickLeave.endDate = sickEnd.value;
        break;
    }

    console.log(toSend);

    patientService
      .addEntry(patient.id, toSend as EntryWithoutId)
      .then((newEntry) => {
        if (patient.entries) {
          const copy = Object.create(patient);
          copy.entries = copy.entries.concat(newEntry);
          setPatient(copy);
        } else {
          const copy = Object.create(patient);
          copy.entires = [newEntry];
          setPatient(copy);
        }
      })
      .catch((error) => {
        const errors = error.response?.data.error;
        console.log(errors);

        let eMessage = "Errors occured: ";
        errors.forEach(({ message }: { message: string }) => {
          eMessage = eMessage.concat(`${message}, `);
        });
        console.log(eMessage);
        setMessage(eMessage);
        setTimeout(() => {
          setMessage("");
        }, 5000);
      });

    resetAll();
  };

  return (
    <div>
      {message && <div style={{ color: "red" }}>{message}</div>}
      <div>
        <h4>Add new Entry</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Type: </label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value={"Hospital"}>Hospital</option>
            <option value={"HealthCheck"}> HealthCheck </option>
            <option value={"OccupationalHealthcare"}>
              OccupationalHealthcare
            </option>
          </select>
        </div>
        <div>
          <label>Description </label>
          <input {...description}></input>
        </div>
        <div>
          <label>Date </label>
          <input {...date}></input>
        </div>
        <div>
          <label>Specialist </label>
          <input {...specialist}></input>
        </div>
        <br></br>
        <div>
          <label>Diagnosis Code </label>
          <input {...code}></input>
          <button
            type="button"
            onClick={() => {
              if (code.value)
                setDianosisCodes(diagnosisCodes?.concat(code.value));
              resetCode();
            }}
          >
            ADD CODE
          </button>
          <div>
            <div>
              <label>current codes: </label>
              {diagnosisCodes?.join(", ")}
            </div>
          </div>
        </div>
        <br></br>
        {type === "HealthCheck" ? (
          <div>
            <label>Rating: </label>
            <input {...rating}></input>
          </div>
        ) : null}
        {type === "Hospital" ? (
          <div>
            <div>
              <label>Discharge Date: </label>
              <input {...dischargeDate}></input>
            </div>
            <div>
              <label>Discharge criteria: </label>
              <input {...criteria}></input>
            </div>
          </div>
        ) : null}
        {type === "OccupationalHealthcare" ? (
          <div>
            <div>
              <label>Employer's name: </label>
              <input {...employerName}></input>
            </div>
            <div>
              <label>Sick-leave start: </label>
              <input {...sickStart}></input>
            </div>
            <div>
              <label>Sick-leave end: </label>
              <input {...sickEnd}></input>
            </div>
          </div>
        ) : null}
        <button type="submit">
          <label>ADD</label>
        </button>
      </form>
    </div>
  );
};

export default AddNewEntry;
