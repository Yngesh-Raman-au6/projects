const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
	name: {
		type: String,
		maxlength: 50,
	},
	// relType: {
	// 	type: Schema.Types.ObjectId,
	// 	ref: "relations",
	// },
	relatives: [
		{
			type: Schema.Types.ObjectId,
			ref: "user",
		},
	],
});

const User = mongoose.model("user", userSchema);

module.exports = { User };
