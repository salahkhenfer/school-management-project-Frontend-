import React from "react";
import BarChart from "./BarChart";
import CardStatictc from "./CardStatictc";

function statistics() {
  return (
    <div>
      <div>
        <CardStatictc text="عدد التلاميذ" value="77" />
        <CardStatictc text="عدد التلاميذ" value="774" />
        <CardStatictc text="عدد التلاميذ" value="54" />
      </div>
      <BarChart />
    </div>
  );
}

export default statistics;
