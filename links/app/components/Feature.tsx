import Image from "next/image";

interface FeatureProps {
  icon: string,
  title: string,
  details: string
}

const Feature = ({icon, title, details}: FeatureProps) => {
  return (
    <div className="w-full bg-[#E6CCB2] border-2 border-[#7F5539] flex flex-col h-40 p-6 rounded-lg">
      <Image 
        height={24}
        width={24}
        src={icon}
        alt={`${title} icon`}
        className="mb-2"
      />
      <p className="font-bold text-xl text-[#7F5539] tracking-tight">{title}</p>
      <p className="text-[#7F5539] text-lg tracking-tight">{details}</p>
    </div>
  );
}

export default Feature;