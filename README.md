# Study Planner

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

In the project directory, you can run:

```bash
yarn
yarn start
```

This runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Deployment

```bash
now switch # mak it
now --prod
```

This will deploy the app to [ZEIT Now](https://create-react-app.dev/docs/deployment/#zeit-now).

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Convert csv to json

```
jq -R -s -f csv2json.jq src/Courses.csv > src/Courses.json
```
