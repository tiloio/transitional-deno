import * as Parcel from "https://unpkg.com/@parcel/core@2.0.0/src/index.js";

const bundler = new Parcel.Parcel({
    entries: 'output.js',
    config: 'parcel-config.json'
});
