import React from "react";
import Feature from "./components/Feature";
import { v4 as uuidv4 } from "uuid";
import features from "./features";
import ContactForm from "./components/ContactForm";
import StartJourney from "./components/StartJourney";
import StartNewsletter from "./components/StartNewsletter";
import { Globe } from "@/components/magicui/globe";
import Connections from "./components/Connections";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Safari } from "@/components/magicui/safari";
import Iphone15Pro from "@/components/magicui/iphone-15-pro";
import Faq from "./components/Faq";
import MarqueeDemo from "./components/PeopleSaying";
import Section from "./components/Section";

interface SectionTitleProps {
  title: string;
  subtitle: string;
  className?: string;
}

// Reusable section title component
const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, className = "" }) => (
  <>
    <h2 className={`font-bold text-center text-[#593116] tracking-tighter mb-4 text-4xl md:text-5xl lg:text-6xl md:w-2/3 ${className}`}>
      {title}
    </h2>
    <p className="text-center text-[#593116] tracking-tight text-xl mb-8 md:w-3/4">
      {subtitle}
    </p>
  </>
);

const Home: React.FC = () => {
  return (
    <main className="flex flex-col w-full items-center gap-24">
      {/* Hero Section */}
      <Section>
        <div className="flex w-full items-center flex-col gap-6">
          <TextAnimate
            animation="blurInUp"
            by="word"
            once
            className="text-5xl md:text-6xl lg:text-7xl md:w-2/3 font-bold text-center text-[#593116] tracking-tighter "
            duration={0.4}
            as="h1"
          >
            The open-source Linktree alternative.
          </TextAnimate>

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

        <div className="relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-[#E6CCB2] border-2 border-[#9C6644] py-25 md:py-40 mt-8 mb-8">
          <div className="absolute inset-0 grid place-items-center">
            <Globe className="top-[5px] md:top-[-50px] lg:top-[-75px] lg:scale-105" />
          </div>
        </div>
        <StartJourney />
      </Section>

      {/* Features Section */}
      <Section id="features">
        <SectionTitle
          title="The only link you will ever need."
          subtitle="Quickly set up and customize your links with ease. Personalize, organize, and share them effortlessly for a seamless and professional experience."
        />

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
        <aside className="mt-12 w-full flex flex-col items-center">
          <Connections />
        </aside>
      </Section>

      {/* Newsletter Section */}
      <Section id="newsletter">
        <SectionTitle
          title="Subscribe to our newsletter"
          subtitle="Stay ahead with exclusive tips, updates, and features. Subscribe to our newsletter and supercharge your link-sharing game!"
        />
        <StartNewsletter />
      </Section>

      {/* Testimonials Section */}
      <Section>
        <SectionTitle
          title="See what people are saying."
          subtitle="See what others are saying about links and how it's helping them connect."
        />
        <MarqueeDemo />
      </Section>

      {/* Website Transformation Section */}
      <Section id="enter">
        <SectionTitle
          title="Transform your input to a tailored website."
          subtitle="Experience how we transform your input into a tailored website with automation for a seamless process."
        />

        <div className="relative flex items-center w-3/4 md:w-full">
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
      </Section>

      {/* FAQ Section */}
      <Section id="faq">
        <SectionTitle
          title="Frequently asked questions"
          subtitle="Get quick answers to common questions with helpful insights, troubleshooting tips, and essential information to enhance your experience."
        />
        <Faq />
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="mb-16">
        <SectionTitle
          title="Get in touch"
          subtitle="Reach out for support, questions, or feedback. We're here to assist you and ensure a smooth experience. Contact us now!"
        />
        <ContactForm />
      </Section>
    </main>
  );
};

export default Home;
