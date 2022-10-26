# React Filtering Exercise
![Archax React Exercise wireframe](/react-ts-filter.gif)


This exercise is to help us better understand react and typescript.


## Setup

To get started, install the dependencies with `npm install`.

Run the application with `npm start`.

Launch application in browser at [http://localhost:3000](http://localhost:3000).

## About

This application is an example of data explorer as shown in the image below. The wireframe demonstrate the functionalities.

![Archax React Exercise wireframe](/archax-react-exercise.png)

The data in `src/data/` folder is the data shown for navigating the business capabilities which acts as a filter.
Each application has 3 levels of business capabilities. Business capabilities are hierarchical as shown in the image (Business capability 1 -> Business capability 2 -> Business capability 3).

## Capabilities

- request the dataset.
- builds hierarchical navigation tree displaying the different levels of business capabilities. The nav can be expanded and collapsed.
- Filtering through unlimited combination of the business capabilities
- a range slider which is able to further filter the dataset based on the spending value

Additional notes

- This exercise doesn't use any external libraries outside CRA.
