import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import CardStatictc from "./CardStatictc";
import { countStudents } from "../../apiCalls/studentCalls";
import { countTeachers } from "../../apiCalls/teacherCalls";
import { countParentsApi } from "../../apiCalls/parentCalls";

function Statistics() {
  const [Students, setStudents] = useState(0);
  const [Teachers, setTeachers] = useState(0);
  const [Parents, setParents] = useState(0);

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

  const getCountParents = async () => {
    const response = await countParentsApi();
    console.log(response);
    if (response) {
      setParents(response.count);
    }
  };
  useEffect(() => {
    getCountStudents();
    getCountTeachers();
    getCountParents();
  }, []);

  return (
    <div>
      <div>
        <CardStatictc text="عدد التلاميذ" value={Students} />
        <CardStatictc text="عدد الاساتذة" value={Teachers} />
        <CardStatictc text="عدد الاولياء" value={Parents} />
      </div>
      <BarChart />
    </div>
  );
}

export default Statistics;
