import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnosis";
import { Diagnosis, Patient } from "../../types";
import EntryDetail from "../EntryDetail";
import AddNewEntry from "../AddEntry";

type RouteParams = {
  patientId: string;
};

const OnePatientView = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>();
  const { patientId } = useParams<RouteParams>();

  useEffect(() => {
    if (typeof patientId === "string")
      patientService.getById(patientId).then((data) => setPatient(data));
    diagnosisService.getAll().then((data) => setDiagnosis(data));
  }, []);

  if (!patient) return <div>User not found.</div>;

  return (
    <div>
      <br />
      <div>id: {patientId}</div>
      <h3>
        {patient?.name} <span>{patient?.gender} </span>
      </h3>
      <div>ssh: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>
      <br></br>
      <AddNewEntry patient={patient} setPatient={setPatient} />
      <h4>entries:</h4>
      {patient?.entries.map((entry) => (
        <EntryDetail key={entry.id} entry={entry} diagnosis={diagnosis} />
      ))}
    </div>
  );
};

export default OnePatientView;
