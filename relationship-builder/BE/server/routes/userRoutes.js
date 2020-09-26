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
		const user = await new User(req.body).save();

		return res.status(200).json({
			success: true,
			user,
		});
	} catch (err) {
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

router.get("/dashboard", async (req, res) => {
	try {
		// const sample = "5f6f6483fe82f31da03d1a7a";
		const sample = "5f6f75f848f8714890ea436e";
		// _id: { $ne: sample }
		const allUsers = await User.find({}).populate("relatives", ["name"]);
		let newAllUsers = [];
		for (let i = 0; i < allUsers.length; i++) {
			const rel = await Relation.findOne({ from: sample, to: allUsers[i]._id });
			// console.log("FOUND RELATIONS---->", rel);
			let userUpdate = { ...allUsers[i]._doc };
			console.log("USER UPDATE OBJECT---->", userUpdate);
			if (rel) {
				userUpdate.relation = rel.type;
			} else {
				userUpdate.relation = "No Relation";
			}
			newAllUsers.push(userUpdate);
		}
		console.log("All USERS----->", newAllUsers);
		res.status(200).json({
			newAllUsers,
		});
	} catch (err) {
		res.send(err);
	}
});
let chain = [];

router.post("/degree", async (req, res) => {
	try {
		const { first, second } = req.body;

		// chain.push(mongoose.Types.ObjectId(first));
		findDegree(first, second);
		res.status(200).json({
			success: true,
		});
	} catch (err) {
		res.send(err);
	}
});

//---------- recursion
let done = false;
let popper = 0;
const findDegree = async (f, s) => {
	chain.push(f.toString());
	console.log("this is chain---", chain);
	if (f == s) {
		let pureChain = [...new Set(chain)];
		console.log("found CHAIN----->", chain);
		done = true;
		return;
	}
	const user = await User.findOne({ _id: f });

	if (user.relatives.length > 0) {
		for (let i = 0; i < user.relatives.length; i++) {
			if (done) {
				return;
			}
			popper++;
			console.log("chain BUILDING------>", user.relatives[i]);
			findDegree(user.relatives[i]._id, s);
		}
	} else {
		for (let j = 0; j < popper; j++) {
			chain.pop();
		}
		popper = 0;
		return;
	}
};
//--------------------

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
