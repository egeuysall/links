import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface ReviewCardProps {
    img: string;
    name: string;
    username: string;
    body: string;
}

const ReviewCard = ({
    img,
    name,
    username,
    body,
}: ReviewCardProps) => {
    return (
        <figure
            className={cn(
                "relative h-full w-64 cursor-pointer overflow-hidden rounded-lg border-2 p-4",
                "border-[#9C6644] bg-[#E6CCB2]",
            )}
        >
            <div className="flex flex-row items-center gap-2">
                {/* <img className="rounded-full" width="32" height="32" alt="" src={img} /> */}
                <Image src={img} className="rounded-full" width="32" height="32" alt=""/>
                <div className="flex flex-col">
                    <figcaption className="text-sm font-bold text-[#593116]">
                        {name}
                    </figcaption>
                    <p className="text-xs font-normal text-[#B08968]">@{username}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm font-normal text-[#593116]">{body}</blockquote>
        </figure>
    );
};

export default ReviewCard;