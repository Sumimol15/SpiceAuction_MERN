// import { mongoose } from "mongoose";
// const spicesSchema = mongoose.Schema({
//     spiceName: { type: String, required: true },
//     desc: { type: String, required: true },
// });

// export const newSpice = mongoose.model('Spices',spicesSchema);

import mongoose from "mongoose";

const spicesSchema = mongoose.Schema({
    spiceName: { type: String, required: true },
    desc: { type: String, required: true },
});

const newSpice = mongoose.model('Spices', spicesSchema);

export { newSpice };