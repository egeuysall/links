import Header from "./components/Header";
import Feature from "./components/Feature";
import { v4 as uuidv4 } from "uuid";
import features from "./features";
import React from "react";
import ContactForm from "./components/ContactForm";
import StartJourney from "./components/StartJourney";
import StartNewsletter from "./components/StartNewsletter";
import { Globe } from "@/components/magicui/globe";
import Connections from "./components/Connections";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Safari } from "@/components/magicui/safari";
import Iphone15Pro from "@/components/magicui/iphone-15-pro";
import Faq from "./components/Faq"
import MarqueeDemo from "./components/PeopleSaying"

const Home: React.FC = () => {
  return (
    <>
      <section className="flex flex-col gap-4 w-full">
        <div className="flex w-full items-center flex-col gap-6">
          <TextAnimate
            animation="blurInUp"
            by="word"
            once
            className="text-5xl md:text-6xl lg:text-7xl md:w-2/3 font-bold text-center text-[#593116] tracking-tighter break-normal whitespace-normal"
            duration={0.4}
            as="h1"
          >
            The only link you will ever need.
          </TextAnimate>
        </div>
        {/* Fixed height container for the subheading to prevent layout shift */}
        <div className="flex flex-col items-center">
          <TextAnimate
            animation="blurInUp"
            by="word"
            once
            className="text-center text-[#593116] tracking-tight text-xl md:w-3/4"
            duration={0.4}
            as="p"
          >
            One link to showcase everything you create and share. Connect your
            socials, projects, and more in one place. Claim your link today!
          </TextAnimate>
        </div>
        {/* Fixed height container for Globe to prevent layout shift */}
        <div className="relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-[#E6CCB2] border-2 border-[#9C6644] py-25 md:py-40 mt-6 mb-4">
          {/* Adding position and dimensions to prevent layout shift */}
          <div className="absolute inset-0 grid place-items-center">
            <Globe className="top-[5px] md:top-[-50px] lg:top-[-75px] lg:scale-105" />
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center mt-8 flex-col">
        <StartJourney />
      </section>

      <section className="flex w-full items-center justify-center mt-8 flex-col items-center">
        <h2
          className="font-bold text-center text-[#593116] tracking-tighter mb-4 text-4xl md:text-5xl lg:text-6xl md:w-2/3"
          id="features"
        >
          Personalize your links in no time.
        </h2>
        <p className="text-center text-[#593116] md:w-3/4 tracking-tight text-xl">
          Quickly set up and customize your links with ease. Personalize,
          organize, and share them effortlessly for a seamless and professional
          experience.
        </p>
        <div className="flex flex-col gap-6 mt-8 w-full">
          <div className="md:grid md:grid-cols-2 gap-6 w-full flex flex-col">
            {features.map((feature) => (
              <Feature
                icon={feature.icon}
                title={feature.title}
                details={feature.details}
                key={uuidv4()}
              />
            ))}
          </div>
          <section className="mt-4 items-center mb-4 flex flex-col" id="newsletter">
            <h2 className="mb-6 font-bold text-center text-[#593116] tracking-tighter text-4xl md:text-5xl lg:text-6xl md:w-2/3">
              Subscribe to our newsletter
            </h2>
            <p className="text-center text-[#593116] tracking-tight text-xl mb-8 md:w-3/4">
              Stay ahead with exclusive tips, updates, and features. Subscribe
              to our newsletter and supercharge your link-sharing game!
            </p>
            <StartNewsletter />
          </section>

          <section className="mt-4 items-center mb-4 flex flex-col" id="newsletter">
            <h2 className="mb-6 font-bold text-center text-[#593116] tracking-tighter text-4xl md:text-5xl lg:text-6xl md:w-2/3">
              See what people are saying.
            </h2>
            <p className="text-center text-[#593116] tracking-tight text-xl mb-8 md:w-3/4">
              See what others are saying about links and how it’s helping them connect.
            </p>
            <MarqueeDemo />
          </section>

          <section className="mt-4 items-center flex-col flex" id="enter">
            <h2 className="text-4xl md:text-5xl lg:text-6xl md:w-2/3 mb-4 font-bold text-center text-[#593116] tracking-tighter">
              Transform your input to a tailored website.
            </h2>
            <p className="text-center text-[#593116] tracking-tight text-xl mb-8 md:w-3/4">
              Experience how we transform your input into a tailored website
              with automation for a seamless process.
            </p>
            <Connections />
            <div className="mt-12 relative flex items-center w-3/4 md:w-full">
              <Safari
                url="links.egeuysal.com"
                mode="default"
                className="size-full hidden md:flex"
                imageSrc="/images/desktop-links.png"
              />
              <Iphone15Pro
                className="size-full flex md:hidden"
                src="images/mobile-links.png"
              />
            </div>
          </section>

          <section className="mt-6 flex-col items-center flex" id="faq">
            <h2 className="text-4xl md:text-5xl lg:text-6xl md:w-2/3 mb-4 font-bold text-center text-[#593116] tracking-tighter">
              Frequently asked questions
            </h2>
            <p className="text-center text-[#593116] tracking-tight text-xl mb-8 md:w-3/4">
              Get quick answers to common questions with helpful insights,
              troubleshooting tips, and essential information to enhance your
              experience.
            </p>
            <Faq />
          </section>

          <section id="contact" className="mt-2 flex flex-col mb-16 items-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl md:w-2/3 mb-4 font-bold text-center text-[#593116] tracking-tighter">
              Get in touch
            </h2>
            <p className="text-center text-[#593116] tracking-tight text-xl mb-8 md:w-3/4">
              Reach out for support, questions, or feedback. We're here to
              assist you and ensure a smooth experience. Contact us now!
            </p>
            <ContactForm />
          </section>
        </div>
      </section>
    </>
  );
};

export default Home;
