# Emotion-based-reactive-app

## Overview

- There are 2 branches (`master` and `no-gifs`).
    - `master` &rarr; since the initial plan was to analyze the emotion of the user and accordingly a gif is prompted using the api of gifhy. The code-base for such purpose is on the `master` branch, with the need of UI enhancement.
    - `no-gifs` &rarr; for GameChangers event, analyzng the emotion of the users and prompting them with movie quotes alongside with a tab to register users in such event was done on the `no-gifs` branch.


## How to run

- For both branches the emotion recognition platform needs a running server. Python was used in such case. `cd` to the folder containing the `index.html`.

    - For python 3.X, run:
    ```
    python -m http.server
    ```

    - For python 2.X, run:
    ```
    python -m SimpleHTTPServer
    ```

    - By default, the server is running on port 8000.

- For the `no-gifs` branch, since storing the email is done using mongo. Mongo server should be running. Moreover, the backend service for storing and checking for duplicate emails needs to be running. `cd` inside `server` folder. Run the following command:

    ```
    node index.js
    ```

    - Note that running the express server should be done after running the mongo server.
    - The port on which the backend is running is 3000.
