# meetingspace

This app allows the user to book a room at a given time, for a chosen duration, with a number of constraints.

It's an autonomous web app and it connects to an API (not provided in this repo).

It's a [React.js](https://reactjs.org/) app written in [TypeScript](https://www.typescriptlang.org/).

[Redux](https://redux.js.org/) is used as the state management library. This part was developed with [RTK Query](https://redux-toolkit.js.org/).

## Requirements

A recent version of [Node.js](https://nodejs.org/) (preferably v18) installed on your machine.

## Development

To install the dependencies, run the following command from your console:

> I really recommend using pNPM, it's much faster than any other alternative.

```
$ pnpm i
```

Then, to start the development server:

```
$ pnpm dev
```

Of course you can also use plain old npm (or [yarn](https://yarnpkg.com/) if you have it):

```
$ npm i && npm run dev
```

## Features

### User features

- User has to login (no credentials needed): he receives a token which is used in every subsequent API request
- The interface then displays:<br>
    • The current state of the only resource (meeting room): if it's available, you can book the room for a meeting starting from the present moment, for a given duration. If it's not, the interface says who is currently using the room.<br>
    • A list of all of today's meeting, with the schedule of the meeting (start/end time), the name of the meeting and the name of the user who booked it. If you're that user, you can cancel the meeting.<br>
- You can only book a meeting for the duration for which the room is available before the next meeting. You can only choose a duration that matches the constraints of the room: time steps, minimum duration, maximum duration.
- Compatible with your color scheme preference (light or dark mode in your browser or OS).

### Development features

- This app was bootstrapped with [Vite](https://vitejs.dev/) using the `react-swc-ts` preset. [SWC](https://swc.rs/) is a much faster alternative to the JavaScript transpiler [Babel](https://babeljs.io/).
- [ESLint](https://eslint.org/) with [AirBNB](https://www.npmjs.com/package/eslint-config-airbnb-typescript)-based config.
- [Husky](https://typicode.github.io/husky) and [Lint Staged](https://github.com/okonet/lint-staged) to run ESLint automatically on commit

### Project structure

RTK Query's documentation is not always very clear about file structure, but I followed the examples they provided the best I could.

- The store is in `/src/app/store.ts`
- The components are in `/src/components/`
- The `/src/features/` folder contains the logic around the API and the [Slices](https://redux-toolkit.js.org/api/createslice). It's highly recommended to put all the API endpoints in an `apiSlice.ts` file in a `/src/api/` folder. There's also a `config.ts` file there because I wrote a custom BaseQuery (see comments there).
- The other folders in `/src/features/` contain the other Slices (state reducers).
- Finally, there are utility functions in `/utils/` and global types in `/types/`.

## Plans for next releases

There are some things I'm not totally satisfied with in this project, and am thinking of improving.

- Consider refactoring the app with a better separation between presentational/functional (stateless/stateful) components. In that case, the functionnalities would go in the /features/ folders and the presentational components in /components/. But I am not sure it would make the project more readable.
- Install SaSS to write cleaner styles. For example at this point the button styles are too verbose.
- Work on a better UX for the form, with custom validation for fields, error messages, etc. At this point the native form validation is used, and it's not easy to understand what inputs the "Duration" field accepts.
- A better UI for the form on mobile screens, with full-width fields and button for example.
- Work on the React rendering cycle: for now the form always renders before being replaced by the "room currently occupied" message.
- A better timeline (with a Outlook-style day schedule showing all the hours in the day)
- Work on accessibility ("skip to content" link, test with screen readers, better color contrast)
- Add a toggle dark/light mode switch
