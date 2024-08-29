"use server";

import Anthropic from "@anthropic-ai/sdk";
import { ImageBlockParam } from "@anthropic-ai/sdk/resources/messages";
import { UploadedFile } from "@/types";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function compute(files: UploadedFile[]) {
  let allResults: any[] = [];

  for (const file of files) {
    const imageContent = [{
      type: "image",
      source: {
        type: "base64",
        media_type: file.type === 'png' ? 'image/png' : 'image/jpeg',
        data: file.base64,
      },
    }] as ImageBlockParam[];

    let response;
    // Generate a fake valid response for testing purposes
    const fakeResponse = [
      { date: "2024/05/15", hour: "14:30:00", title: "Team Meeting" },
      { date: "2024/06/01", hour: "09:00:00", title: "Project Kickoff" },
      { date: "2024/07/10", hour: "16:00:00", title: "Client Presentation" }
    ];
    
    // Convert the fake response to a string
    const fakeResponseString = JSON.stringify(fakeResponse);
    console.log('fakeResponseString')
    // return fakeResponseString;
    
    // Simulate an API response
    response = {
      content: [{ type: "text", text: fakeResponseString }]
    };
    try {
      response = await anthropic.messages.create({
        model: "claude-3-opus-20240229",
        max_tokens: 1024,
        system: `
        you are an AI assistant that generates only valid js string list.
        Extract the dates from the provided image.
        eventually if there is a time or a title in the image add them to the event
        Return the list with the interface: {date, hour, title, summary, location, description, status}[]
        the date format that you will use to create the event is YYYY/MM/DD
        the hour format that you will use to create the event is HH:MM:SS
        pay attention to phone numbers and emails and add them to the description field
        in location add the address or the place of the event if it's present in the image
        if you dont find dates return just an empty array

        `,
        messages: [
          {
            role: "user",
            content: imageContent,
          },
          {
            role: "assistant",
            content: "[",
          },
        ],
      });
    } catch (error) {
      throw error;
      // TODO: fix this
      // console.error('ERROR', error.error.error.type);
      // if (error.error.error.type === 'overloaded_error') {
      //   console.error("Service is currently overloaded. Please retry later.");
      //   throw new Error("Service is currently overloaded. Please retry later.");
      // } else {
      //   console.error("An unexpected error occurred:", error);
      //   throw error;
      // }
    }

    const result = response.content[0].type === "text" ? response.content[0].text : "";
    console.log('result', result)
    console.log(JSON.parse('[' + result));
    allResults.push(result);
  }

  return "[" + allResults.join(',');
}
