const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
const fs = require("fs")



const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What github username do you want to find?"
    },
    {
      type: "input",
      name: "color",
      message: "What display color would you like to use (blue, gray, green, red, yellow, or black)?"
    },
  ]);
};

function getGitBio(username) {
  const URL = "https://api.github.com/users/" + username;

  axios.get(URL).then(response => {
    const functionalBio = {
      name: response.name,
      login: response.login,
      avatar: response.avatar_url,
      profileLink: response.url,
      location: response.location,
      employer: response.company,
      bio: response.bio,
      publicRep: response.public_repos,
      followers: response.followers,
      following: response.following,
    };

    return functionalBio;

  })
    //catches reception error
    .catch(err => {
      console.log(err);
      console.log("Failure to recieve response, either due to an issue with github, or an invalid username.");
    })
};

function getColor(color) {
  switch (color) {
    case color === "blue":
      return "primary";
      break;
    case color === "gray":
      return "secondary";
      break;
    case color === "green":
      return "success";
      break;
    case color === "red":
      return "danger";
      break;
    case color === "yellow":
      return "warning";
      break;
    case color === "black":
      return "dark";
      break;
    default:
      console.log("Error in color selection, defaulting to blue...")
      return "primary";
  }
};

function generateHTML(info, color){

};


promptUser()
  .then(function (answers) {
    useInfo = getGitBio(answers.name);
    color = getColor(answers.color);

    const html = generateHTML(useInfo, color);

    return writeFileAsync("index.html", html);
  })
  .then(function () {
    console.log("Successfully wrote to index.html");
  })
  .then(function () {
    console.log("Reading from index.html...");
  })
  .catch(function (err) {
    console.log(err);
  });