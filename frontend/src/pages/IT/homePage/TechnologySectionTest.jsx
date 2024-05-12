import React from "react";
import SectionTitle from "../../../Components/IT/sectionTitle/SectionTitle";
import {
  FaAngular,
  FaBitcoin,
  FaEthereum,
  FaMoneyBill,
  FaNodeJs,
  FaReact,
  FaRust,
  FaVuejs,
} from "react-icons/fa";
import {
  SiAntdesign,
  SiBlockchaindotcom,
  SiCardano,
  SiDjango,
  SiExpress,
  SiFlask,
  SiLaravel,
  SiLitecoin,
  SiNextdotjs,
  SiNuxtdotjs,
  SiRedux,
  SiRipple,
  SiRubyonrails,
  SiSpring,
  SiStellar,
  SiSvelte,
} from "react-icons/si";

const technologies = [
  {
    name: "React",
    icon: <FaReact color="#61DAFB" />,
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs color="#000000" />,
  },
  {
    name: "Svelte",
    icon: <SiSvelte color="#FF3E00" />,
  },
  {
    name: "Angular",
    icon: <FaAngular color="#DD0031" />,
  },
  {
    name: "Vue.js",
    icon: <FaVuejs color="#4FC08D" />,
  },
  {
    name: "Nuxt.js",
    icon: <SiNuxtdotjs color="#00C58E" />,
  },
  {
    name: "Ant Design",
    icon: <SiAntdesign color="#0170FE" />,
  },
  {
    name: "Redux",
    icon: <SiRedux color="#764ABC" />,
  },
  {
    name: "Node.js",
    icon: <FaNodeJs color="#8CC84B" />,
  },
  {
    name: "Express.js",
    icon: <SiExpress color="#000000" />,
  },
  {
    name: "Django",
    icon: <SiDjango color="#092E20" />,
  },
  {
    name: "Flask",
    icon: <SiFlask color="#000000" />,
  },
  {
    name: "Ruby on Rails",
    icon: <SiRubyonrails color="#CC0000" />,
  },
  {
    name: "Spring Boot",
    icon: <SiSpring color="#6DB33F" />,
  },
  {
    name: "Laravel",
    icon: <SiLaravel color="#FF2D20" />,
  },
  {
    name: "Rust",
    icon: <FaRust color="#DEA584" />,
  },
  {
    name: "Bitcoin",
    icon: <FaBitcoin color="#F7931A" />,
  },
  {
    name: "Ethereum",
    icon: <FaEthereum color="#627EEA" />,
  },
  {
    name: "Litecoin",
    icon: <SiLitecoin color="#A6A9AA" />,
  },
  {
    name: "Ripple",
    icon: <SiRipple color="#0080C6" />,
  },
  {
    name: "Cardano",
    icon: <SiCardano color="#3E863D" />,
  },
  {
    name: "Stellar",
    icon: <SiStellar color="#08B5E5" />,
  },
  {
    name: "Blockchain",
    icon: <SiBlockchaindotcom color="#0E76A8" />,
  },
  {
    name: "Digital Money",
    icon: <FaMoneyBill color="#008000" />,
  },
];

const TechnologySection = () => {
  return (
    <section className={`py-20`}>
      <div className="container mx-auto">
        <SectionTitle title="Technology" />

        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-5">
          {technologies.map((technology, index) => (
            <div
              key={index}
              className="bg-slate-200 text-gray-700 px-4 py-8 rounded-lg shadow-md flex flex-col items-center border-gradient"
            >
              <div className="text-5xl text-gray-700 mb-4">{technology?.icon}</div>
              <div className="text-lg font-medium font-noto">{technology?.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
s;
