# Deep Cloud Web #

To apply Jupyter Notebook customization copy the contents of Jupyter Notebook Changes/.jupyter to /home/<user>/.jupyter folder.

The following assumes a basic familiarity with webpack, npm package management, express.js servers and React.js. If not, [this](https://www.codementor.io/tamizhvendan/beginner-guide-setup-reactjs-environment-npm-babel-6-webpack-du107r9zr) is a good place to get started with the modern web development workflow.  

## Downloading and Setup for Development:
1. Clone the repository using `git clone --recursive https://bitbucket.org/s3lab/web.git`.
2. Change directory into `Web/UI`.
3. Execute `npm install`. This will install the required dependencies for the project.
4. To run the project in a local server, execute `npm start`. This runs the project in a local webpack-dev server. It should automatically open the url in a browser window. It also supports hot-reloading meaning as soon as you make changes to the code, it is visible in the browser on refresh; no need to restart the server.

## Steps for Deployment:
1. Once the changes are done, push to the git repository using `git push origin master`.
2. SSH into the server and clone into a folder as above. If the code is already present in the server do a `git pull` to get the latest changes.
3. Then execute `npm install`. If it doesn't automatically run the post-install script, also execute `npm run-script postinstall`.
4. To start the server execute `npm run-script prod` or `npm run-script prod &` to have it in the background. This is setup to execute on port 80.

## Project/Folder Structure:
1. The root of the project is in `Web\UI`. Inside there are 3 folders: `app`, `dist`, `semantic` and a handful of files.
2. The `app` folder is where the actual code resides. `index.js` is the entry point.
3. The `dist` folder is where the final code gets compiled and built by webpack. The `semantic` folder contains the files from the Semantic UI html framework which we use in combination with React.js.
4. The `app` directory in turn has folders such as `components`, `config` and `containers`. The `containers` folder has files which provide an abstraction on top of the actual UI code. The files in this directory contain all the functions needed for interaction with the UI components which are stored in the folder `components`. The folder `config` stores the `routes.js` file. This application makes use of the [ReactRouter](https://medium.com/@dabit3/beginner-s-guide-to-react-router-53094349669) functionality and `routes.js` has all the routing code.
5. The css and the dependent js code are in appropriately named folders.

## Jupyter Notebook installation
1. Go to the directory where the repository is cloned and cd into notebook.
2. Execute the following commands:
- `sudo npm install`
- `sudo python setup.py build`
- `sudo python setup.py install`
- `sudo pip install .`

## JupyterHub installation(not needed anymore if using docker)
1. Needs Python version >= 3.3 -- Might use virtualenv
2. Go to the directory where the repository is cloned and cd into jupyterhub.
3. Execute the following commands:
- `mkdir -p ~/jupyterhub-venv`
- `virtualenv -p python3 ~/jupyterhub-venv`
- `source ~/jupyterhub-venv/bin/activate`
- `sudo npm install`
- `sudo python setup.py build`
- `sudo python setup.py install`
- If there is an error saying 'No module named `setuptools`', execute `sudo apt-get install python3-setuptools`
- `sudo pip install .`
- `sudo npm isntall -g configurable-http-proxy`

### Copy Notebook customizations specific to DeepCloud
* Copy `.jupyter` folder from Jupyter Notebook Changes directory to $HOME
* To change allowable URLs for CORS, look in the jupyter_notebook_config.py file.
* To start Jupyter Notebook as a background process, execute:
`exec jupyter notebook --ip deepc05.acis.ufl.edu --port 8000 --config $HOME/.jupyter/jupyter_notebook_config.py &> /dev/null &`

