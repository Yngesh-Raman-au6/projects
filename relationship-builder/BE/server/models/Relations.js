const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const relationSchema = Schema({
	from: {
		type: Schema.Types.ObjectId,
		ref: "user",
	},
	to: {
		type: Schema.Types.ObjectId,
		ref: "user",
	},
	type: String,
});

const Relation = mongoose.model("relations", relationSchema);

module.exports = { Relation };
