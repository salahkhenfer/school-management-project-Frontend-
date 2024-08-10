import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import CardStatictc from "./CardStatictc";
import { countStudents } from "../../apiCalls/studentCalls";
import { countTeachers } from "../../apiCalls/teacherCalls";

function Statistics() {
  const [Students, setStudents] = useState(0);
  const [Teachers, setTeachers] = useState(0);

  const getCountStudents = async () => {
    const response = await countStudents();
    console.log(response);
    if (response) {
      setStudents(response);
    }
  };

  const getCountTeachers = async () => {
    const response = await countTeachers();
    console.log(response);
    if (response) {
      setTeachers(response);
    }
  };
  useEffect(() => {
    getCountStudents();
    getCountTeachers();
  }, []);

  return (
    <div>
      <div>
        <CardStatictc text="عدد التلاميذ" value={Students} />
        <CardStatictc text="عدد الاساتذة" value={Teachers} />
      </div>
      <BarChart />
    </div>
  );
}

export default Statistics;
