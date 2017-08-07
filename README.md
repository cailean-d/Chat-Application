# Chat Application

Chat Application based on Electron (NodeJS, Chromium, V8)

**The application contains these common files:**

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `config.json` - Points to the app's config file.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.

You can learn more about each of these components within the [Quick Start Guide](http://electron.atom.io/docs/tutorial/quick-start).

## How To Use

To clone and run this repository you'll need [Git](https://git-scm.com), [Yarn](https://yarnpkg.com/lang/en/) (to build application) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/cailean-d/Chat-Application.git
# Go into the repository
cd Chat-Application
# Install dependencies
npm install
# Run the app
npm start
```

## How to build

**For Windows users jus follow next steps:**

- run `build-package-win.bat` to build win package without installer
- run `build-installer-win.bat` to build win package with installer
