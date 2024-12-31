import { FiArrowUpRight } from "react-icons/fi";
import {
  FiBell,
  FiCheck,
  FiChevronDown,
  FiList,
  FiMessageCircle,
  FiUser,
} from "react-icons/fi";
import { motion } from "framer-motion";
import {
  SiNike,
  Si3M,
  SiAbstract,
  SiAdobe,
  SiAirtable,
  SiAmazon,
  SiBox,
  SiBytedance,
  SiChase,
  SiCloudbees,
  SiBurton,
  SiBmw,
  SiHeroku,
  SiBuildkite,
  SiCouchbase,
  SiDailymotion,
  SiDeliveroo,
  SiEpicgames,
  SiGenius,
  SiGodaddy,
} from "react-icons/si";
import { IconType } from "react-icons";

export const NeuHero = () => {
  return (
    <section className="overflow-hidden bg-[#161818] min-h-screen text-white w-full">
      <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 md:px-12 pb-24 md:pb-48 pt-12 md:pt-24 space-y-4">
        <Copy />
        <MockupScreen />
      </div>
      <Logos />
    </section>
  );
};

const Copy = () => {
  return (
    <>
      <div className="mb-1.5 rounded-full bg-zinc-600">
        <a
          href="#"
          target="_blank"
          rel="nofollow"
          className="flex origin-top-left items-center rounded-full border border-zinc-900 bg-[#ffffffa6] p-0.5 text-sm transition-transform hover:-rotate-2"
        >
          <span className="rounded-full bg-purple-800 px-2 py-0.5 font-medium text-white">
            HEY!
          </span>
          <span className="ml-1.5 mr-1 inline-block text-black">
            We're live on Product Hunt!
          </span>
          <FiArrowUpRight className="mr-2 inline-block text-purple-800" />
        </a>
      </div>
      <h1 className="max-w-4xl text-center text-3xl md:text-4xl lg:text-6xl font-black leading-[1.15]">
        AI Infused Vision Directory
      </h1>
      <p className="mx-auto my-4 max-w-3xl text-center text-sm md:text-base lg:text-xl leading-relaxed">
        Open Source Web Based platform for computer vision enthusiasts to learn, create and share things in a community of their own!
      </p>
      <button className="rounded-lg bg-purple-900 p-2 md:p-3 uppercase text-white transition-colors hover:bg-purple-800">
        <a href="/home">
          <span className="font-bold">Get started - </span> no CC required
        </a>
      </button>
    </>
  );
};

const MockupScreen = () => {
  return (
    <div className="absolute bottom-0 left-1/2 h-36 w-[calc(100vw_-_16px)] md:w-[calc(100vw_-_56px)] max-w-[1100px] -translate-x-1/2 overflow-hidden rounded-t-xl bg-zinc-900 p-0.5">
      <div className="flex items-center justify-between px-2 py-1">
        <div className="flex items-center gap-0.5">
          <span className="size-2 rounded-full bg-red-400" />
          <span className="size-2 rounded-full bg-yellow-400" />
          <span className="size-2 rounded-full bg-green-400" />
        </div>
        <span className="rounded bg-zinc-600 px-2 py-0.5 text-xs text-zinc-100">
          perceptai.app
        </span>
        <FiChevronDown className="text-white" />
      </div>
      <div className="relative z-0 grid h-full w-full grid-cols-[80px,_1fr] md:grid-cols-[100px,_1fr] lg:grid-cols-[150px,_1fr] overflow-hidden rounded-t-lg bg-white">
        <div className="h-full border-r border-zinc-300 p-2">
          <Logo />
          <div className="mt-3 space-y-1.5">
            <span className="flex items-center gap-1.5 text-xs text-[#161818]">
              <FiMessageCircle />
              <span>Messages</span>
            </span>
            <span className="flex items-center gap-1.5 text-xs">
              <FiCheck />
              <span>Tasks</span>
            </span>
            <span className="flex items-center gap-1.5 text-xs">
              <FiList />
              <span>Board</span>
            </span>
          </div>
        </div>

        <div className="relative z-0 p-2">
          <div className="mb-3 flex items-center justify-between">
            <span className="rounded bg-zinc-200 px-1.5 py-1 pr-8 text-xs text-zinc-600">
              Search...
            </span>
            <div className="flex items-center gap-1.5 text-xl">
              <FiBell className="text-indigo-600" />
              <FiUser />
            </div>
          </div>
          <div className="h-full rounded-xl border border-dashed border-zinc-500 bg-zinc-100" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-gradient-to-b from-white/0 to-white" />
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <svg
      width="32"
      height="auto"
      viewBox="0 0 50 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-fit fill-[#161818]"
    >
      <path
        d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
        stopColor="#09090B"
      ></path>
      <path
        d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
        stopColor="#09090B"
      ></path>
    </svg>
  );
};

const Logos = () => {
  return (
    <div className="relative -mt-2 -rotate-1 scale-[1.01] border-y-2 border-zinc-900 bg-[#161818]">
      <div className="relative z-0 flex overflow-hidden border-b-2 border-zinc-900">
        <TranslateWrapper>
          <LogoItemsTop />
        </TranslateWrapper>
        <TranslateWrapper>
          <LogoItemsTop />
        </TranslateWrapper>
        <TranslateWrapper>
          <LogoItemsTop />
        </TranslateWrapper>
      </div>
      <div className="relative z-0 flex overflow-hidden">
        <TranslateWrapper reverse>
          <LogoItemsBottom />
        </TranslateWrapper>
        <TranslateWrapper reverse>
          <LogoItemsBottom />
        </TranslateWrapper>
        <TranslateWrapper reverse>
          <LogoItemsBottom />
        </TranslateWrapper>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-16 md:w-32 bg-gradient-to-r from-purple-800 to-purple-600/0" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 md:w-32 bg-gradient-to-l from-purple-800 to-purple-600/0" />
    </div>
  );
};

const TranslateWrapper = ({
  children,
  reverse,
}: {
  children: JSX.Element;
  reverse?: boolean;
}) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      className="flex px-2"
    >
      {children}
    </motion.div>
  );
};

const LogoItem = ({ Icon, name }: { Icon: IconType; name: string }) => {
  return (
    <span className="flex items-center justify-center gap-2 md:gap-4 px-2 md:px-4 py-2 md:py-4">
      <Icon className="text-xl md:text-2xl lg:text-3xl text-indigo-600" />
      <span className="whitespace-nowrap text-lg md:text-xl lg:text-2xl font-semibold uppercase">
        {name}
      </span>
    </span>
  );
};

const LogoItemsTop = () => (
  <>
    <LogoItem Icon={SiNike} name="Nike" />
    <LogoItem Icon={Si3M} name="3M" />
    <LogoItem Icon={SiAbstract} name="Abstract" />
    <LogoItem Icon={SiAdobe} name="Adobe" />
    <LogoItem Icon={SiAirtable} name="Airtable" />
    <LogoItem Icon={SiAmazon} name="Amazon" />
    <LogoItem Icon={SiBox} name="Box" />
    <LogoItem Icon={SiBytedance} name="Bytedance" />
    <LogoItem Icon={SiChase} name="Chase" />
    <LogoItem Icon={SiCloudbees} name="Cloudebees" />
  </>
);

const LogoItemsBottom = () => (
  <>
    <LogoItem Icon={SiBmw} name="BMW" />
    <LogoItem Icon={SiBurton} name="Burton" />
    <LogoItem Icon={SiBuildkite} name="Buildkite" />
    <LogoItem Icon={SiCouchbase} name="Couchbase" />
    <LogoItem Icon={SiDailymotion} name="Dailymotion" />
    <LogoItem Icon={SiDeliveroo} name="deliveroo" />
    <LogoItem Icon={SiEpicgames} name="Epic Games" />
    <LogoItem Icon={SiGenius} name="Genius" />
    <LogoItem Icon={SiGodaddy} name="GoDaddy" />
    <LogoItem Icon={SiHeroku} name="Heroku" />
  </>
);
