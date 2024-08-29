# Photo to Calendar
![Photo to Calendar](/public/image.png)

## Project Overview

Photo to Calendar is a web application that leverages AI technology to extract date and event information from images and convert them into calendar events. This tool streamlines the process of creating calendar entries from various visual sources like flyers, screenshots, or event posters.

## Technologies Used

- **Frontend**: Next.js 14 with React
- **Styling**: Tailwind CSS with shadcn/ui components
- **AI Integration**: Anthropic's Claude API for image analysis
- **State Management**: React Hooks
- **Type Checking**: TypeScript

## Key Libraries

- `@anthropic-ai/sdk`: For integrating Claude AI capabilities
- `date-fns`: For date manipulation and formatting
- `ics`: For generating ICS (iCalendar) files
- `lucide-react`: For icons
- `next`: For the React framework and server-side rendering
- `vercel`: For deployment and hosting
- `react` and `react-dom`: For building the user interface
- `tailwindcss`: For utility-first CSS styling

## Project Objectives

1. Provide a user-friendly interface for uploading images containing date and event information.
2. Utilize AI to accurately extract relevant details from the uploaded images.
3. Allow users to review and edit the extracted information.
4. Generate standardized .ics files for easy import into various calendar applications.
5. Demonstrate the power of combining modern web technologies with AI services to solve practical problems.

## Features

- Drag-and-drop or click-to-upload image functionality
- Support for multiple image uploads
- AI-powered extraction of dates, times, and event titles from images
- User interface for reviewing and editing extracted event details
- Generation of .ics files for seamless calendar integration
- Responsive design for both desktop and mobile use

## Getting Started


## Live Demo

Check out the live demo of Photo to Calendar:

[https://from-photo-to-calendar.vercel.app/](https://from-photo-to-calendar.vercel.app/)

Experience the application firsthand and see how easily you can convert image-based event information into calendar entries!


To set up and run the project locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/photo-to-calendar.git
   cd photo-to-calendar
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add your Anthropic API key:
     ```
     ANTHROPIC_API_KEY=your_api_key_here
     ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to view the application.

Note: Make sure you have Node.js (version 14 or later) and npm installed on your system before starting.

## Contributing

[If applicable, include guidelines for contributing to the project]

## License

This project is released under a Personal Use License.

This software is provided for personal, non-commercial use only. You may use, copy, and modify this software for your own personal use, but you may not distribute, sell, or use it for any commercial purpose without explicit written permission from the author.

All other rights are reserved.