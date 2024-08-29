import React from 'react';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import { ScrollArea } from '@/components/ui/scroll-area';

const Rules = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="w-full">
          <InfoIcon className="w-4 h-4 mr-2" />
          How does it Work?
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>How does it Work?</DrawerTitle>
        </DrawerHeader>
        <ScrollArea className="p-4">
          <p className="text-sm">
            This tool simplifies the process of creating calendar events from images containing date and time information.
          </p>
          <p className="text-sm mt-4">
            Here&apos;s how it works:
          </p>
          <ol className="list-decimal list-inside text-sm mt-2 space-y-1">
            <li>Upload an image containing dates and events (such as screenshots of schedules, photos of flyers, etc.)</li>
            <li>Our AI analyzes the image content and automatically extracts relevant information</li>
            <li>The extracted dates, times, and event details are presented for your review</li>
            <li>You can manually edit or add to the extracted information if needed</li>
            <li>Finally, you can export the events as an .ics file or add them directly to your calendar</li>
          </ol>
          <p className="text-sm mt-4">Key features:</p>
          <ul className="list-disc list-inside text-sm mt-2 space-y-1">
            <li>Support for uploading multiple images</li>
            <li>Drag-and-drop interface for easy uploading</li>
            <li>Ability to paste images directly into the application</li>
            <li>Preview of uploaded images</li>
            <li>Automatic extraction of dates, titles, and times</li>
            <li>Integrated editor for modifying and adding events</li>
            <li>Generation of .ics files for easy calendar import</li>
          </ul>
          <p className="text-sm mt-4">
            This tool is perfect for quickly adding multiple events to your calendar from various image sources, saving you time and effort.
          </p>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default Rules;
