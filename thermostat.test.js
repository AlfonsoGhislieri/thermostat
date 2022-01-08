import axios from 'axios';
const Thermostat = require('./thermostat.js') 

describe('Thermostat', () => {
  let thermostat;
  beforeEach(() => {
    thermostat = new Thermostat();
  });
  
  test('initial temp of 20 degrees', () => {
    expect(thermostat.getTemperature()).toEqual(20);
  });
  
  test('can increase temp with .up', () => { 
    thermostat.up();
    expect(thermostat.getTemperature()).toEqual(21);
  });
  
  test('can decrease temp with .down', () => { 
    thermostat.down();
    expect(thermostat.getTemperature()).toEqual(19);
  });
  
  test('min temp is 10', () => {
    for (let i=0; i<20;i++) {
      thermostat.down();
    }
    expect(thermostat.getTemperature()).toEqual(10);
  });

  test('power saving mode on by default', () => {
    expect(thermostat.powerSaving).toEqual(true);
  });

  test('power saving mode can be turned off', () => {
    thermostat.setPowerSavingMode(false);
    expect(thermostat.powerSaving).toEqual(false);
  });

  test('power saving mode can be turned on', () => {
    thermostat.setPowerSavingMode(false);
    thermostat.setPowerSavingMode(true);
    expect(thermostat.powerSaving).toEqual(true);
  });

  test('max temp is 25 with power saving', () => {
    for (let i=0; i<20;i++) {
      thermostat.up();
    }
    expect(thermostat.getTemperature()).toEqual(25);
  });

  test('max temp is 32 with power saving', () => {
    thermostat.setPowerSavingMode(false);
    for (let i=0; i<20;i++) {
      thermostat.up();
    }
    expect(thermostat.getTemperature()).toEqual(32);
  });

  test('.reset sets temp back to 20', () => {
    for (let i=0; i<10;i++) {
      thermostat.up();
    }
    thermostat.reset();
    expect(thermostat.getTemperature()).toEqual(20);
  });

  test(' energy usage below 18  = low', () => {
    for (let i=0; i<3;i++) {
      thermostat.down();
    }
    expect(thermostat.currentEnergyUsage()).toEqual('low-usage');
  });

  test(' energy usage 18  = medium', () => {
      thermostat.down();
      thermostat.down();
    expect(thermostat.currentEnergyUsage()).toEqual('medium-usage');
  });

  test('energy usage 25  = medium', () => {
    for (let i=0; i<5;i++) {
      thermostat.up();
    }
    expect(thermostat.currentEnergyUsage()).toEqual('medium-usage');
  });

  test(' energy usage above 25  = high', () => {
    thermostat.setPowerSavingMode(false);
    for (let i=0; i<6;i++) {
      thermostat.up();
    }
    expect(thermostat.currentEnergyUsage()).toEqual('high-usage');
  });
});