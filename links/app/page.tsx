import Header from "./components/Header";
import Image from "next/image";
import Feature from "./components/Feature";
import { v4 as uuidv4 } from "uuid";
import features from "./features";
import React from "react";
import ClaimLink from "./components/ClaimLink";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  return (
    <>
      <section className="flex items-center justify-center flex-col gap-4">
        <h1 className="text-5xl font-bold text-center text-[#593116] mt-36 tracking-tighter">
          The only link you will ever need.
        </h1>
        <p className="text-center text-[#593116] tracking-tight text-xl">
          One link to showcase everything you create and share. Connect your
          socials, projects, and more in one place. Claim your link today!
        </p>
      </section>
      <section className="flex items-center justify-center mt-8 flex-col">
        <ClaimLink />
      </section>
      <section className="flex items-center justify-center mt-8 flex-col">
        <h2 className="text-4xl font-bold text-center text-[#593116] tracking-tighter">
          Set up and personalize your links in no time.
        </h2>
        <div className="flex flex-col gap-6 mt-8 mb-32">
          {features.map((feature) => (
            <Feature
              icon={feature.icon}
              title={feature.title}
              details={feature.details}
              key={uuidv4()}
            />
          ))}
          <section className="mt-6 flex-col">
          <h2 className="text-4xl mb-4 font-bold text-center text-[#593116] tracking-tighter">Frequently Asked Questions</h2>
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
                Yes! Use it as a mini-site, portfolio, or digital business card.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-bold text-xl">
                Do I fully own my page?
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                Yes! Links is open-source, meaning you can host it yourself and
                modify everything.
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
        </div>
      </section>
    </>
  );
}
