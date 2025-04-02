import Header from "./components/Header";
import Image from "next/image";
import Feature from "./components/Feature";
import { v4 as uuidv4 } from "uuid";
import features from "./features";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ContactForm from "./components/ContactForm";
import StartJourney from "./components/StartJourney";
import StartNewsletter from "./components/StartNewsletter";
import { Globe } from "@/components/magicui/globe";
import Connections from "./components/Connections";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Safari } from "@/components/magicui/safari";
import Iphone15Pro from "@/components/magicui/iphone-15-pro";

const Home: React.FC = () => {
  return (
    <>
      <section className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-6">
          <TextAnimate
          animation="blurInUp"
          by="word"
          once
          className="text-5xl font-bold text-center text-[#593116] tracking-tighter break-normal whitespace-normal"
          duration={0.4}
          as="h1"
          >
            The only link you will ever need.
          </TextAnimate>
        </div>
        {/* Fixed height container for the subheading to prevent layout shift */}
        <div className="flex flex-col">
          <TextAnimate
            animation="blurInUp"
            by="word"
            once
            className="text-center text-[#593116] tracking-tight text-xl"
            duration={0.4}
            as="p"
          >
            One link to showcase everything you create and share. Connect your
            socials, projects, and more in one place. Claim your link today!
          </TextAnimate>
        </div>
        {/* Fixed height container for Globe to prevent layout shift */}
        <div className="relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-[#E6CCB2] border-2 border-[#9C6644] py-30 md:py-40 mt-6 mb-4">
          {/* Adding position and dimensions to prevent layout shift */}
          <div className="absolute inset-0 grid place-items-center">
            <Globe className="top-3 grid place-items-center scale-105 md:scale-150 md:top-20 lg:scale-175 lg:top-35" />
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center mt-8 flex-col">
        <StartJourney />
      </section>

      <section className="flex w-full items-center justify-center mt-8 flex-col">
        <h2
          className="text-4xl font-bold text-center text-[#593116] tracking-tighter mb-4"
          id="features"
        >
          Set up and personalize your links in no time.
        </h2>
        <p className="text-center text-[#593116] tracking-tight text-xl">
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
          <div className="relative">
            <Safari
              url="links.egeuysal.com"
              mode="default"
              className="size-full hidden lg:flex"
              imageSrc="/images/desktop-links.png"
            />
            <Iphone15Pro
              className="size-full flex lg:hidden"
              src="images/mobile-links.png"
            />
          </div>
          <section className="mt-4 mb-4 flex flex-col" id="newsletter">
            <h2 className="text-4xl mb-6 font-bold text-center text-[#593116] tracking-tighter">
              Subscribe to our newsletter
            </h2>
            <p className="text-center text-[#593116] tracking-tight text-xl mb-8">
              Stay ahead with exclusive tips, updates, and features. Subscribe
              to our newsletter and supercharge your link-sharing game!
            </p>
            <StartNewsletter />
          </section>

          <section className="mt-4 items-center flex-col flex" id="enter">
            <h2 className="text-4xl mb-4 font-bold text-center text-[#593116] tracking-tighter">
              Transform your input to a tailored website.
            </h2>
            <p className="text-center text-[#593116] tracking-tight text-xl mb-8">
              Experience how we transform your input into a tailored website
              with automation for a seamless process.
            </p>
            <Connections />
          </section>

          <section className="mt-6 flex-col flex" id="faq">
            <h2 className="text-4xl mb-4 font-bold text-center text-[#593116] tracking-tighter">
              Frequently asked questions
            </h2>
            <p className="text-center text-[#593116] tracking-tight text-xl mb-8">
              Get quick answers to common questions with helpful insights,
              troubleshooting tips, and essential information to enhance your
              experience.
            </p>
            <Accordion type="single" collapsible className="text-[#593116]">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-bold text-xl">
                  What makes Links unique?
                </AccordionTrigger>
                <AccordionContent className="text-lg">
                  It's fast, clean, and fully in your control—no clutter, just
                  what you need.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="font-bold text-xl">
                  Can I use it beyond social media?
                </AccordionTrigger>
                <AccordionContent className="text-lg">
                  Yes! Use it as a mini-site, portfolio, or digital business
                  card.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="font-bold text-xl">
                  Do I fully own my page?
                </AccordionTrigger>
                <AccordionContent className="text-lg">
                  Yes! Links is open-source, meaning you can host it yourself
                  and modify it.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="font-bold text-xl">
                  Is Links free to use?
                </AccordionTrigger>
                <AccordionContent className="text-lg">
                  Yes! It's completely free, without any hidden fees or paywalls.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <section id="contact" className="mt-2 flex flex-col mb-16">
            <h2 className="text-4xl mb-6 font-bold text-center text-[#593116] tracking-tighter">
              Get in touch
            </h2>
            <p className="text-center text-[#593116] tracking-tight text-xl mb-8">
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
