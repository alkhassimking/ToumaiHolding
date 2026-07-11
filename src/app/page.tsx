import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Vision from "@/components/sections/Vision";
import Mission from "@/components/sections/Mission";
import BusinessActivities from "@/components/sections/BusinessActivities";
import WhyToumai from "@/components/sections/WhyToumai";
import Statistics from "@/components/sections/Statistics";
import Partnership from "@/components/sections/Partnership";

const Ecosystem = dynamic(() => import("@/components/sections/Ecosystem"), {
  loading: () => (
    <section className="py-24 min-h-[50vh]" aria-hidden="true" />
  ),
});

const Academy = dynamic(() => import("@/components/sections/Academy"), {
  loading: () => (
    <section className="py-24 min-h-[40vh]" aria-hidden="true" />
  ),
});

export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Hero />
      <Ecosystem />
      <About />
      <Vision />
      <Mission />
      <BusinessActivities />
      <Academy />
      <WhyToumai />
      <Statistics />
      <Partnership />
    </>
  );
}
