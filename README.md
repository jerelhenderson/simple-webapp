# Node-Postgres Web App
This is a simple todo list web application example, following this [blog tutorial](https://developer.okta.com/blog/2019/11/22/node-postgres-simple-webapp) and using [Okta Developer](https://developer.okta.com/).

## Setup and Start
To get set up, start by cloning this repository:
```git clone ```
Then, navigate to the project directory and install the necessary Node packages
``` npm install ```

You will need to create a Postgres database to run this application. [Click here](https://www.postgresql.org/download/) to download a distribution. After setting up the server and creating login details, create a database to hold the table.
``` CREATE DATABASE todolist; ```

Then create the table marking the todolist items.
```sql
CREATE TABLE item (
    ID SERIAL PRIMARY KEY,
    title VARCHAR(100),
    description TEXT,
    isComplete BOOLEAN
);
```

Finally, you'll need to set up the configuration files.
* Rename `.env.sample` file to `.env`
* Update the details in `.env.` according to your environment
* Sign up for a [Okta developer account](https://developer.okta.com) (free to sign up, but only non-free email providers are allowed)
* Create a new **Web** application in the **Okta Developer Dashboard**
* Use port `3000` for the **Base** and **redirect** URIs (e.g. Login redirect URI `http://localhost:3000/authorization-code/callback`)
* Update the `.env` file with your newly acquired Okta developer client details - **Client Id**, **Client secret**, and **Okta Org Url**

## Run the App
You can now run the web app using:
``` node index.js ```

## License
[Apache 2.0](LICENSE)
