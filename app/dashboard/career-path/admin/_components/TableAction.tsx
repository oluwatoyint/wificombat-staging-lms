import { CheckedOutline, UncheckedOutline } from "@/app/icons";
import React, { Fragment } from "react";

interface TableActionProps {
  student: any;
  data: any;
  selectedStudents: any[];
  setSelectedStudents: (students: any[]) => void;
}

export const TableAction = ({
  student,
  data,
  selectedStudents,
  setSelectedStudents,
}: TableActionProps) => {
  const isSelected = selectedStudents?.includes(student.id);

  return (
    <div>
      {isSelected ? (
        <CheckedOutline
          onClick={() =>
            setSelectedStudents(
              selectedStudents.filter((id) => id !== student.id)
            )
          }
        />
      ) : (
        <UncheckedOutline
          onClick={() => setSelectedStudents([...selectedStudents, student.id])}
        />
      )}
    </div>
  );
};
