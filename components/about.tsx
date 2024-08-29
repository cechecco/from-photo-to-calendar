import React from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild className="flex justify-end">
        <Button
          variant="ghost"
          size="xs"
          className="text-xs mt-2 italic"
        >
          About this project
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>About this project</DrawerTitle>
        </DrawerHeader>
        <ScrollArea className="p-4">
          <p className="text-sm">
            This application leverages cutting-edge AI technology to streamline the process of creating calendar events from images. It demonstrates how modern tools enable us to build simple yet powerful products that solve everyday problems.
          </p>
          <p className="text-sm mt-4">
            Here&apos;s how our software works:
          </p>
          <ol className="list-decimal list-inside text-sm mt-2 space-y-1">
            <li>Users upload images containing date and time information</li>
            <li>Our AI, powered by advanced computer vision and natural language processing, analyzes the images</li>
            <li>The AI extracts relevant event details such as dates, times, and titles</li>
            <li>Users can review and edit the extracted information</li>
            <li>The application generates standardized .ics files for easy calendar import</li>
          </ol>
          <p className="text-sm mt-4">
            This project showcases how modern development tools and AI services allow us to create innovative solutions:
          </p>
          <ul className="list-disc list-inside text-sm mt-2 space-y-1">
            <li>Cloud-based AI services provide powerful image analysis capabilities</li>
            <li>Modern web frameworks enable responsive and intuitive user interfaces</li>
            <li>Serverless architectures allow for scalable and cost-effective deployment</li>
            <li>Open-source libraries simplify complex tasks like file handling and calendar integration</li>
          </ul>
          <p className="text-sm mt-4">
            By combining these tools, we&apos;ve created a product that automates a tedious task, saving users time and effort. This exemplifies how today&apos;s technology landscape empowers developers to rapidly prototype and deploy sophisticated applications that were once the domain of large tech companies.
          </p>
          <p className="text-sm mt-4">
            As AI and development tools continue to evolve, we can expect to see even more innovative, user-friendly applications that simplify our daily lives and boost productivity across various domains.
          </p>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default About;
