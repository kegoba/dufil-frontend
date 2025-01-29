1. Prerequisites

Before setting up the  application, ensure you have the following installed on your machine:

Node.js: Make sure Node.js is installed. You can check if it's installed by running:
node -v
If it's not installed, download and install Node.js from here.
npm (Node Package Manager): npm is installed automatically with Node.js. You can verify the version by running:
npm -v
2. Clone the Repository

First, you need to clone the React application repository to your local machine.

Clone the repository using Git:

git clone https://github.com/kegoba/dufil-frontend.git


3. Install Dependencies

Once you've cloned the project, you need to install the required dependencies to run the React app.

Navigate to the project directory if you haven't already:
cd dufil-frontend
Install the dependencies listed in the package.json file:

npm install
This command will install all the packages necessary for the application to run, such as React, React-DOM, React Scripts, and any other libraries the app depends on.

4. Run the  Application

Once the dependencies are installed, you can start the React development server.

Start the development server:
npm start
This command runs the application on a local development server. By default, it should be accessible in your browser at:


create .env file in the project dir


REACT_APP_LOCAL_URL= local url

REACT_APP_LIVE_URL=h deployed url

NODE_ENV ='development'

NOTE : YOU WILL NEED TO CREATE ACCOUNT AND LOGIN BEFORE YOU CAN ACCESS THE APP.