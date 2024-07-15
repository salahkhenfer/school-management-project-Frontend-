import SmallCard from "../../components/adminsCompnents/Classes/SmallCard";

function Levels() {
  return (
    <div className=" max-w-[1000px] w-full mx-auto">
      <div className="w-fith-28 py-10 text-center  text-gray-800 text-4xl font-semibold font-['Cairo'] leading-10">
        االأطوار التعليمية
      </div>
      <div className="flex max-w-[1000px] mx-auto justify-center items-center flex-wrap gap-10">
        <SmallCard text="الابتدائي" />
        <SmallCard text="المتوسط" />
        <SmallCard text="الثانوي" />
      </div>
    </div>
  );
}

export default Levels;
