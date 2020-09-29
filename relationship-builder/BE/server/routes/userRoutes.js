const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { Relation } = require("../models/Relations");
const mongoose = require("mongoose");

// const async = require("async");

//=================================
//             User
//=================================
router.post("/enter", async (req, res) => {
	try {
		console.log("INSIDE ENTER>>>>>", req.body);
		let enterUser = "";
		const exist = await User.findOne({ name: req.body.name });
		console.log("EXIST_______", exist);
		if (exist) {
			enterUser = exist;
		} else {
			enterUser = await new User(req.body).save();
		}

		return res.status(200).json({
			success: true,
			enterUser,
		});
	} catch (err) {
		console.log("ERRORRRRR");
		res.send(err);
	}
});

router.post("/add-relation", async (req, res) => {
	try {
		const relation = new Relation(req.body);
		console.log(req.body);
		const newRelation = await relation.save();
		const user = await User.findById(req.body.from);
		user.relatives.push(req.body.to);
		await user.save();
		res.status(200).json({
			newRelation,
		});
	} catch (err) {
		res.send(err);
	}
});
router.post("/edit", async (req, res) => {
	try {
		const { from, to, type } = req.body;
		console.log(req.body);
		let rel = Relation.findOneAndUpdate({ from: from, to: to }, { type: type });
		res.status(200).json({
			rel,
		});
	} catch (err) {
		res.send(err);
	}
});

router.post("/dashboard", async (req, res) => {
	try {
		const { id } = req.body;
		// const sample = "5f6f75f848f8714890ea436e";
		// _id: { $ne: sample }
		let allUsers;
		let newAllUsers = [];

		console.log("idRRR______", id);
		if (id == "NaN") {
			console.log("INSIDE IF TRUE_______");
			allUsers = await User.find({}).populate("relatives", ["name"]);
			console.log("ALLUSER________IF____________", allUsers);

			for (let i = 0; i < allUsers.length; i++) {
				console.log("REACHED INSIDE LOOOOOOOOOOOOOOOP");
				let userUpdate = { ...allUsers[i]._doc };
				userUpdate.relation = "No Relation";
				newAllUsers.push(userUpdate);
			}
		} else {
			console.log("INSIDE ELSE TRUE_______");

			allUsers = await User.find({
				_id: { $ne: id },
			}).populate("relatives", ["name"]);
			console.log("ALLUSER__________ELSE__________", allUsers);

			for (let i = 0; i < allUsers.length; i++) {
				const rel = await Relation.findOne({ from: id, to: allUsers[i]._id });
				let userUpdate = { ...allUsers[i]._doc };
				if (rel) {
					userUpdate.relation = rel.type;
				} else {
					userUpdate.relation = "No Relation";
				}
				newAllUsers.push(userUpdate);
			}
		}

		console.log("ALLUSER____________________", allUsers);

		console.log("All USERS----->", newAllUsers);
		res.status(200).json({
			// allUsers,
			newAllUsers,
		});
	} catch (err) {
		console.log("ERRRRRRRRRRR");
		res.send(err);
	}
});

const result = [];
let isDone;
let popper = 0;

router.post("/degree", async (req, res) => {
	isDone = false;
	popper = 0;
	while (result.length) {
		result.pop();
	}
	try {
		const user = "5f6f75f848f8714890ea436e";

		console.log("finding degree------------");
		const { first, second } = req.body;
		result.push(first);
		const data = await User.find({}).populate("relatives", ["name"]);
		// console.log("+++++++++++++++++++++", data);

		let newAllUsers = [];
		for (let i = 0; i < data.length; i++) {
			// console.log("ENTERED LOOOOOOOOOOOOOOOOOP");
			const rel = await Relation.findOne({ from: user, to: data[i]._id });
			let userUpdate = { ...data[i]._doc };
			// console.log("USER UPDATE OBJECT---->", userUpdate);
			if (rel) {
				userUpdate.relation = rel.type;
			} else {
				userUpdate.relation = "No Relation";
			}
			newAllUsers.push(userUpdate);
		}

		findR(first, second, newAllUsers);
		let degree = result;
		// console.log("---------------------", newAllUsers);
		if (result.length === 1) {
			degree = "No Relation";
		}
		res.status(200).json({
			success: true,
			degree,
		});
	} catch (err) {
		res.send(err);
	}
});

//---------- recursion

function findR(first, last, data) {
	// console.log("----------STARTED-----------", data);
	console.log("CHECKING_______", first, last);
	if (first === last) {
		isDone = true;
		return;
	}
	console.log("DONE___", isDone);
	if (isDone) return;

	const { relatives: relArray } = data.find((ele) => {
		// console.log("ELEMENT____", ele);
		if (ele.name === first) return ele;
	});
	console.log({ relArray });
	if (!relArray.length) {
		while (popper) {
			result.pop();
			popper--;
		}
	} else {
		relArray.forEach((ele) => {
			console.log("INSIDE FINAL_______", ele);
			if (isDone) return;
			popper++;
			result.push(ele.name);
			console.log({ result });
			findR(ele.name, last, data);
		});
	}
}

router.post("/login", (req, res) => {
	User.findOne({ email: req.body.email }, (err, user) => {
		if (!user)
			return res.json({
				loginSuccess: false,
				message: "Auth failed, email not found",
			});

		user.comparePassword(req.body.password, (err, isMatch) => {
			if (!isMatch)
				return res.json({ loginSuccess: false, message: "Wrong password" });

			user.generateToken((err, user) => {
				if (err) return res.status(400).send(err);
				res.cookie("w_authExp", user.tokenExp);
				res.cookie("w_auth", user.token).status(200).json({
					loginSuccess: true,
					userId: user._id,
				});
			});
		});
	});
});

router.get("/logout", (req, res) => {
	User.findOneAndUpdate(
		{ _id: req.user._id },
		{ token: "", tokenExp: "" },
		(err, doc) => {
			if (err) return res.json({ success: false, err });
			return res.status(200).send({
				success: true,
			});
		}
	);
});

router.get("/addToCart", (req, res) => {
	User.findOne({ _id: req.user._id }, (err, userInfo) => {
		let duplicate = false;

		console.log(userInfo);

		userInfo.cart.forEach((item) => {
			if (item.id == req.query.productId) {
				duplicate = true;
			}
		});

		if (duplicate) {
			User.findOneAndUpdate(
				{ _id: req.user._id, "cart.id": req.query.productId },
				{ $inc: { "cart.$.quantity": 1 } },
				{ new: true },
				(err, userInfo) => {
					if (err) return res.json({ success: false, err });
					res.status(200).json(userInfo.cart);
				}
			);
		} else {
			User.findOneAndUpdate(
				{ _id: req.user._id },
				{
					$push: {
						cart: {
							id: req.query.productId,
							quantity: 1,
							date: Date.now(),
						},
					},
				},
				{ new: true },
				(err, userInfo) => {
					if (err) return res.json({ success: false, err });
					res.status(200).json(userInfo.cart);
				}
			);
		}
	});
});

router.get("/removeFromCart", (req, res) => {
	User.findOneAndUpdate(
		{ _id: req.user._id },
		{
			$pull: { cart: { id: req.query._id } },
		},
		{ new: true },
		(err, userInfo) => {
			let cart = userInfo.cart;
			let array = cart.map((item) => {
				return item.id;
			});

			Product.find({ _id: { $in: array } })
				.populate("writer")
				.exec((err, cartDetail) => {
					return res.status(200).json({
						cartDetail,
						cart,
					});
				});
		}
	);
});

router.get("/userCartInfo", (req, res) => {
	User.findOne({ _id: req.user._id }, (err, userInfo) => {
		let cart = userInfo.cart;
		let array = cart.map((item) => {
			return item.id;
		});

		Product.find({ _id: { $in: array } })
			.populate("writer")
			.exec((err, cartDetail) => {
				if (err) return res.status(400).send(err);
				return res.status(200).json({ success: true, cartDetail, cart });
			});
	});
});

router.post("/successBuy", (req, res) => {
	let history = [];
	let transactionData = {};

	//1.Put brief Payment Information inside User Collection
	req.body.cartDetail.forEach((item) => {
		history.push({
			dateOfPurchase: Date.now(),
			name: item.title,
			id: item._id,
			price: item.price,
			quantity: item.quantity,
			paymentId: req.body.paymentData.paymentID,
		});
	});

	//2.Put Payment Information that come from Paypal into Payment Collection
	transactionData.user = {
		id: req.user._id,
		name: req.user.name,
		lastname: req.user.lastname,
		email: req.user.email,
	};

	transactionData.data = req.body.paymentData;
	transactionData.product = history;

	User.findOneAndUpdate(
		{ _id: req.user._id },
		{ $push: { history: history }, $set: { cart: [] } },
		{ new: true },
		(err, user) => {
			if (err) return res.json({ success: false, err });

			const payment = new Payment(transactionData);
			payment.save((err, doc) => {
				if (err) return res.json({ success: false, err });

				//3. Increase the amount of number for the sold information

				//first We need to know how many product were sold in this transaction for
				// each of products

				let products = [];
				doc.product.forEach((item) => {
					products.push({ id: item.id, quantity: item.quantity });
				});

				// first Item    quantity 2
				// second Item  quantity 3

				async.eachSeries(
					products,
					(item, callback) => {
						Product.update(
							{ _id: item.id },
							{
								$inc: {
									sold: item.quantity,
								},
							},
							{ new: false },
							callback
						);
					},
					(err) => {
						if (err) return res.json({ success: false, err });
						res.status(200).json({
							success: true,
							cart: user.cart,
							cartDetail: [],
						});
					}
				);
			});
		}
	);
});

router.get("/getHistory", (req, res) => {
	User.findOne({ _id: req.user._id }, (err, doc) => {
		let history = doc.history;
		if (err) return res.status(400).send(err);
		return res.status(200).json({ success: true, history });
	});
});

module.exports = router;
