const { resolve } = require('path');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const Thermostat = require('./thermostat.js');
const thermostat = new Thermostat();

function controlTemp(){
  return new Promise(resolve => {
    rl.question(`enter command > `,(answer) => {
      if (answer === 'up'){
        thermostat.up();
      }
      else if (answer === 'down'){
        thermostat.down();
      }
      resolve(answer);
    });
  });
}

async function run() {
    while (true) {
      await controlTemp();
      console.log(`Current temp: ${thermostat.temperature}`)
    }
}

run()

class Example {
  constructor(variable) {
     this.getVar = () => variable; 
  }
}