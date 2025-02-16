const adminSchema = require("../models/admin.model.js")
const bcrypt = require("bcrypt")
const pkg = require("jsonwebtoken")
const { sign } = pkg;
const restaurantSchema = require("../models/restaurant.model.js")
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "78793450c005b4",
        pass: "3f6797b4ee609e",
    },
});
exports.adminRegister = async (req, res) => {
    try {
        const { email, password, cpassword } = req.body;
        if (!(email && password && cpassword))
            return res.status(204).send({ msg: "fields are empty" });
        if (password !== cpassword)
            return res.status(401).send({ msg: "password not match" });
        const admin = await adminSchema.findOne();
        if (admin)
            return res.status(401).send({ msg: "email already exist" });
        bcrypt.hash(password, 10).then(async (hashedPassword) => {
            await adminSchema.create({ email, password: hashedPassword })
            res.status(201).send({ msg: "Admin Created" })
        }).catch((error) => {
            console.log(error);
        })
    } catch (error) {
        res.status(500).send({ error })
    }
}

exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password))
            return res.status(401).json({ msg: "fields are empty" });
        const admin = await adminSchema.findOne({ email })
        const success = await bcrypt.compare(password, admin.password);
        console.log(success);
        if (!success)
            return res.status(400).send({ msg: "un autherized access" })
        const { _id } = admin;
        const adminToken = await sign({ _id }, process.env.JWT_KEY, { expiresIn: "24h" })
        res.status(200).send({ msg: "Successfully Loged In ", adminToken })

    } catch (error) {
        res.status(500).send({ error });
    }
}

exports.forgetPassword = async (req, res) => {
    const { email } = req.body;
    if (!email)
        return res.status(401).json({ msg: "field is empty" });
    const admin = await adminSchema.findOne({ email });
    console.log(admin);

    if (!admin)
        return res.status(401).json({ msg: "email is not valid" });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"jinukrishnan.p@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Email Verification", // Subject line
        text: "Verify your email", // plain text body
        html: `<button><a  href="http://localhost:5173/resetpassword">Verify email</a></button>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    res.status(200).send({ msg: "Check your email for complete verification" })


}
exports.resetPassword = async (req, res) => {
    try {
        const { email, password, cpassword } = req.body
        if (!(email && password && cpassword))
            return res.status(401).json({ msg: "fields are empty" });
        if (password !== cpassword)
            return res.status(401).json({ msg: "password not match" });
        const admin = await adminSchema.findOne({ email });
        if (!admin)
            return res.status(401).json({ msg: "email is not valid" });
        const hashPassword = await bcrypt.hash(password, 10);
        const updateAdmin = await adminSchema.updateOne({ email }, { $set: { password: hashPassword } })
        console.log(updateAdmin);
        res.status(201).send({ msg: "successfully updated" })
    } catch (error) {
        res.status(403).send({ error });
    }

}

exports.adminHome = async (req, res) => {
    try {
        const { _id } = req.user;
        const admin = await adminSchema.findOne({ _id })
        if (!admin)
            return res.status(404).json({ msg: "admin not found" })
        res.status(200).json({ email: admin.email });
    } catch (error) {
    }



}


exports.addRestaurant = async (req, res) => {
    const { name, phone, email } = req.body;
    console.log(name, phone, email);

    try {
        // generate password
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&";
        let password = "";
        for (let i = 0; i < 8; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        const hashPwd = await bcrypt.hash(password, 10)
        console.log(name, email, phone, password);

        if (!(name && phone && email))
            return res.status(400).json({ msg: "fields are empty" });
        await restaurantSchema.create({ name, email, phone, password: hashPwd }).then(async (data) => {
            // send mail to client's email address

            const info = await transporter.sendMail({
                from: '"jinukrishnan.p@gmail.com', // sender address
                to: email, // list of receivers
                subject: "Password", // Subject line
                text: "Note your Password", // plain text body
                html: `Your email ${email} and password is<h4> ${password}</h4>`, // html body
            });

            console.log("Message sent: %s", info.messageId);
            res.status(201).json({ msg: "added data to data base and send mail to client" })

        })
    } catch (error) {
        res.status(400).json({ error })
    }

}

exports.listRestaurants=async(req,res)=>{
try {
    const restaurants=await restaurantSchema.find({},'-password');
    res.status(200).json(restaurants);
} catch (error) {
    res.status(400).send({error})
}
}