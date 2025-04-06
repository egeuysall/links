import React from "react";
import Header from "./components/Header";
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
            />))}
            <Iphone15Pro
              className="size-full flex lg:hidden"
              src="images/mobile-links.png"
            />
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
                  It&apos;s fast, clean, and fully in your control—no clutter, just
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
                  Yes! It&apos;s completely free, without any hidden fees or paywalls.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <section id="contact" className="mt-2 flex flex-col mb-16">
            <h2 className="text-4xl mb-6 font-bold text-center text-[#593116] tracking-tighter">
              Get in touch
            </h2>
            <p className="text-center text-[#593116] tracking-tight text-xl mb-8">
              Reach out for support, questions, or feedback. We&apos;re here to
              assist you and ensure a smooth experience. Contact us now!
            </p>
            <ContactForm />
          </section>
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
