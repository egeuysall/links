import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

const Faq: React.FC = (): React.ReactNode => {
    return (
        <Accordion type="single" collapsible className="text-[#593116] w-full">
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
    );
}

export default Faq;