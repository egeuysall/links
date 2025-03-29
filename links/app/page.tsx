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

export default function Home() {
  return (
    <>
      <section className="flex items-center justify-center flex-col gap-4">
        <h1>
          <TextAnimate
            className="text-5xl font-bold text-center text-[#593116] tracking-tighter"
            animation="blurInUp"
            by="character"
            once
          >
            The only link you will ever need.
          </TextAnimate>
        </h1>
          <TextAnimate
            className="text-center text-[#593116] tracking-tight text-xl"
            animation="blurInUp"
            by="character"
            once
          >
            One link to showcase everything you create and share. Connect your socials, projects, and more in one place. Claim your link today!
          </TextAnimate>
        <div className="relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-[#E6CCB2] border-2 border-[#9C6644] py-40 mt-6 mb-4">
          <Globe className="top-3 scale-105 md:scale-110" />
        </div>
      </section>
      <section className="flex items-center justify-center mt-8 flex-col">
        <StartJourney />
      </section>
      <section className="flex items-center justify-center mt-8 flex-col">
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
        <div className="flex flex-col gap-6 mt-8 mb-32">
          <div className="md:grid md:grid-cols-2 gap-6 flex flex-col ">
            {features.map((feature) => (
              <Feature
                icon={feature.icon}
                title={feature.title}
                details={feature.details}
                key={uuidv4()}
              />
            ))}
          </div>
          <section className="mt-4 mb-4 flex flex-col">
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
                  and modify everything.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="font-bold text-xl">
                  Is Links free to use?
                </AccordionTrigger>
                <AccordionContent className="text-lg">
                  Yes! It's completely free, with no hidden fees or paywalls.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
          <section className="mt-2 flex flex-col">
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
}
