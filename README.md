# SplatCal

This project generates an iCalendar (iCal) file using Node.js containing several flavors of in-game events for Splatoon 3. The iCal file can be used to sync the events with calendar apps like Google Calendar, Outlook, or Apple Calendar.
![ApplicationFrameHost_cadHz34HBL](https://github.com/TetraTsunami/SplatCal/assets/78718829/584efb9d-283a-4cc1-a980-b3af4b30edef)

## Features

- Automatically updates calendar with new events.
- Includes Challenges, Big Runs, Eggstra Work shifts, and Splatfests

## Future???

- Granular control over types of included events

## Requirements

- Node.js
- npm

## Installation

### Manual
1. Clone the repository:

   ```bash
   git clone https://github.com/TetraTsunami/SplatCal.git
   ```

2. Navigate to the project directory:

    ```bash
    cd SplatCal
    ```
    
3. Install dependencies:

    ```bash
    npm install
    ```
  
### Docker Compose
1. Install Docker

2. Build the container

    ```bash
    docker compose build
    ```


## Usage

Start the application:

```bash
npm start
```
or
```bash
docker compose up -d
```
Access the generated iCal file by visiting http://localhost:3000 in your web browser.

## Acknowledgments

[ical-generator](https://github.com/sebbo2002/ical-generator) - A Node.js module for generating iCalendar files.

[node-fetch](https://github.com/node-fetch/node-fetch) - A light-weight module that brings Fetch API to Node.js.

[splatoon3.ink](splatoon3.ink) API - The unofficial Splatoon 3 API used to fetch in-game events.
