import { useState } from "react";
import SmallCard from "../../components/adminsCompnents/Classes/SmallCard";
import { Link, useParams } from "react-router-dom";
import Education from "../../utils/Education";

function LevelModuls() {
  const { modulePrams } = useParams();
  const { levelParams } = useParams();
  const level = Education[levelParams][modulePrams];
  console.log(modulePrams);

  // Check if level is found in Education
  if (!level) {
    return (
      <div className="max-w-[1000px] w-full mx-auto text-center py-10 text-gray-800 text-4xl font-semibold font-['Cairo'] leading-10">
        الطور التعليمي غير موجود
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] w-full mx-auto">
      <div className="w-full py-10 text-center text-gray-800 text-4xl font-semibold font-['Cairo'] leading-10">
        مواد السنة {modulePrams}
      </div>
      <div className="flex max-w-[1000px] mx-auto justify-center items-center flex-wrap gap-10">
        {level.map((year, index) => (
          <Link to="Groups" key={index}>
            <SmallCard text={year} notNavigate={true} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default LevelModuls;
