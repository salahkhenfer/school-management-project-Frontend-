import SmallCard from "../../components/adminsCompnents/Classes/SmallCard";

export default function LanguagesLavels() {
  return (
    <div>
      <div className=" max-w-[1000px] w-full mx-auto">
        <div className="w-fith-28 py-10 text-center  text-gray-800 text-4xl font-semibold font-['Cairo'] leading-10">
          االأطوار التعليمية
        </div>
        <div className="flex max-md:flex-col max-md:justify-center max-md:items-center m max-w-[1000px] mx-auto justify-center items-end flex-wrap gap-10">
          <div className="flex flex-col items-center md:justify-end gap-5">
            <SmallCard text="Pre A1" />
            <SmallCard text="A1" />
            <SmallCard text="A2" />
          </div>
          <div className="flex flex-col justify-items-end gap-5">
            <SmallCard text="B1" />
            <SmallCard text="B2" />
          </div>
          <div className="flex flex-col justify-items-end gap-5">
            <SmallCard text="C1" />
            <SmallCard text="C2" />
          </div>
        </div>
      </div>
    </div>
  );
}
