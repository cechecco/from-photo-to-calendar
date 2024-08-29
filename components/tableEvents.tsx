import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Apple, CalendarIcon, Mail } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { generateCalendarUrl } from "@/app/utils";
import { ParsedEvent } from "@/types";

interface TableEventsProps {
  parsedResult: ParsedEvent[];
  updateResultItem: (index: number, field: string, value: string) => void;
  handleCheckboxChange: (index: number, checked: boolean) => void;
}

const TableEvents: React.FC<TableEventsProps> = ({
  parsedResult,
  updateResultItem,
  handleCheckboxChange,
}) => {
  return (
    <div className="flex-grow">
      <Accordion type="single" collapsible className="w-full">
        {parsedResult.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="flex justify-between items-center p-4">
              <div className="flex flex-col md:flex-row items-center md:space-x-4 justify-center m-auto md:m-0">
                <Checkbox
                  checked={item.checked}
                  onCheckedChange={(checked) => handleCheckboxChange(index, !!checked)}
                />
                <span>{item.date ? format(new Date(item.date.replace(/\//g, "-")), "PPP") : "No date"}</span>
                <span className="font-normal">{item.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              
            <div className="bg-muted rounded-md">
                      <div className="p-4 flex-col space-y-2">
                        <div>
                          <label className="font-medium">Date</label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !item.date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {item.date ? (
                                  format(
                                    new Date(item.date.replace(/\//g, "-")),
                                    "PPP"
                                  )
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={
                                  item.date
                                    ? new Date(item.date.replace(/\//g, "-"))
                                    : undefined
                                }
                                onSelect={(date) =>
                                  updateResultItem(
                                    index,
                                    "date",
                                    date ? format(date, "yyyy/MM/dd") : ""
                                  )
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div>
                          <label className="font-medium">Time</label>
                          <Input
                            type="time"
                            value={item.hour}
                            onChange={(e) =>
                              updateResultItem(index, "hour", e.target.value)
                            }
                          />
                        </div>
                        <div>
                        <label className="font-medium">Title</label>
                        <Input
                          value={item.title}
                          onChange={(e) =>
                            updateResultItem(index, "title", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="font-medium">Summary</label>
                        <Input
                          value={item.summary}
                          onChange={(e) =>
                            updateResultItem(index, "summary", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="font-medium">Location</label>
                        <Input
                          value={item.location}
                          onChange={(e) =>
                            updateResultItem(index, "location", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="font-medium">Description</label>
                        <textarea
                          className="w-full h-32 p-2 border rounded-md"
                          value={item.description}
                          onChange={(e) =>
                            updateResultItem(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="font-medium">Status</label>
                        <Input
                          value={item.status}
                          onChange={(e) =>
                            updateResultItem(index, "status", e.target.value)
                          }
                        />
                      </div>
                      <div className="flex flex-col lg:items-end space-y-2">
                        <p className="text-sm font-medium">Create event:</p>
                        <div className="flex flex-col lg:flex-row space-y-2 space-x-0 lg:space-y-0 lg:space-x-2">
                          <Button
                            size="sm"
                            onClick={() =>
                              window.open(
                                generateCalendarUrl(item, "google"),
                                "_blank"
                              )
                            }
                          >
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            <span>Google</span>
                          </Button>
                          <Button
                            size="sm"
                            onClick={() =>
                              window.open(
                                generateCalendarUrl(item, "outlook"),
                                "_blank"
                              )
                            }
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            <span>Outlook</span>
                          </Button>
                          <Button
                            size="sm"
                            onClick={() =>
                              window.open(
                                generateCalendarUrl(item, "apple"),
                                "_blank"
                              )
                            }
                          >
                            <Apple className="w-4 h-4 mr-2" />
                            <span>Apple</span>
                          </Button>
                        </div>
                      </div>
                      </div>
                    </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default TableEvents;
