# Guardians of the Grid
You are building a mission control center to protect Achrona against The Desync.
It serves as the ultimate digital lifeline by mapping vital statistics live
and flagging anomalies early. Thanks to your real-time data insights, we can
intervene in time to stop the glitches and save the magic in Achrona.

## Project setup
This repository contains a basic [TanStack Start](https://tanstack.com/start) project built with:
- **Language:** [TypeScript](https://www.typescriptlang.org)
- **Framework:** [React](https://react.dev)
- **ORM:** [Drizzle](https://orm.drizzle.team)
- **Styling:** [Tailwind](https://tailwindcss.com)
- **Build tool:** [Vite](https://vite.dev)

To get started, you can use the following commands.

```bash
npm install
npm run dev
```

## Assessment
> How we assess will be shared with all students before the start of the hackathon, so that it is clear to everyone from the outset.

- **Creativity (40%):** Does the application offer new, innovative or creative solutions? Does your application stand out compared to the other participants?
- **Functionality (30%):** What functionality were you able to deliver during the hackathon? Is the UI intuitive and user-friendly? Are the features clear to users without explanation or a manual?
- **Presentation (30%):** Does your presentation grab our attention? Is the presentation clear about what you built? Do we see the input of all participants reflected equally in your presentation?

## Base assignment
> To assess all submissions equally, we expect this as the minimum setup.
> After that, you choose which extensions you want to add.

![datamodel](datamodel.png)

Build a web application in which guardians can log in. Once logged in, they see a list of glitches.
Guardians have a role.
- Role `defender` can report echoes. Every echo is treated as a glitch by default.
- Role `commander` has the same rights as a defender + admin rights.
- An echo has a `timestamp` and a `description`.

## Extensions (Optional)
> You choose what you want to add. Here is some inspiration to get you started.

### Workflow
- **Glitch status:** A glitch goes through several statuses (`LEAKED` → `ASSESSING` → `CONTAINING` → `FIXED`).
- **Search/Filters:** Guardians can search by keywords and filter and sort the data.
- **Assigning glitches:** A commander can manually assign glitches to a defender, who then provides updates on that glitch via echoes.
- **Reporting:** Make the most important data exportable as PDF (for the High Council of Achrona).
- **Keyboard shortcuts:** Navigate the application with keyboard shortcuts (e.g. <kbd>j</kbd> and <kbd>k</kbd> to view the previous/next glitch).
- **Dark mode:** Let guardians switch between dark and light mode. Optionally provide an extra lockdown mode that indicates a major attack is underway.

### Real-time monitoring
- **Live updates:** New glitches appear on screen in real time.
- **Gauge chart:** A visual meter showing the amount of magic in Achrona (100% when everything is fine).
- **Interactive map:** A map that shows exactly where in Achrona a glitch is occurring.
- **Sensor data:** The system processes IoT sensor data and displays it in charts on the dashboard.
- **Responsive design:** The application is mobile-first and fully optimised for smartphones.
- **Offline mode:** Data remains available during network outages, with a clear "offline" indicator.

### AI Automation
- **Handle duplicates:** AI automatically groups related echoes under the same glitch; admins can override this manually.
- **Glitch types:** AI categorises the type and makes it visually clear (e.g. with icons or colours).
- **AI moderation:** AI filters out useless echoes and scans descriptions and images for illegal content.
- **Auto-closable glitches:** Glitches close automatically based on echoes (e.g. "everything is back to normal"), but also reopen when a similar new problem comes in.
- **Predictive analysis:** AI creates glitches on its own based on data anomalies (e.g. a data reserve that drops by 40% within 5 minutes).
- **Automatic assignment:** AI independently chooses which defender is the best fit for the glitch.
- **Create runbook:** AI generates a step-by-step plan (runbook) to solve the specific problem.
- **Chatbot:** A built-in assistant that answers operators' questions about active incidents and alerts.

### User engagement
- **Image uploads:** Users can upload photos with an echo to clarify the situation.
- **Speech-to-text:** Defenders on the move can dictate echoes via their microphone instead of typing.
- **Send notifications:** Push notifications, emails or text messages for critical issues (with configurable preferences per user).
- **Leaderboard:** A ranking with badges for the defenders who fix the most incidents.
