'use strict';

/* eslint-disable no-console */

const fs = require('fs');

const zonesJson = fs.readFileSync('./zones.json');
const zones = JSON.parse(zonesJson);

const out = {};
Object.keys(zones.zones).forEach(z => {
  out[z] = zones.zones[z].ics;
});

Object.keys(zones.aliases).forEach(z => {
  const aliasTo = zones.aliases[z].aliasTo;
  if (zones.zones[aliasTo]) {
    out[z] = zones.zones[aliasTo].ics;
  } else {
    console.warn(`${aliasTo} (${z}) not found, skipping`);
  }
});

fs.writeFileSync('../src/zones-compiled.json', JSON.stringify(out));
