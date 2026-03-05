import { Link, useParams } from "react-router-dom";
import { useAbsences } from "../hooks/useAbsences";

export default function EmployeePage() {
  const { employeeId } = useParams<{ employeeId: string }>();
  const { data: absences, isPending, isError } = useAbsences();

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Failed to load absences. Please try again.</p>;

  const employeeAbsences =
    absences?.filter((a) => a.employee.id === employeeId) ?? [];
  const employee = employeeAbsences[0]?.employee;

  return (
    <main>
      <Link to="/">← Back to all absences</Link>
      {employee ? (
        <h1>
          {employee.firstName} {employee.lastName}
        </h1>
      ) : (
        <h1>Employee not found</h1>
      )}
      <p>{employeeAbsences.length} absence(s)</p>
    </main>
  );
}
