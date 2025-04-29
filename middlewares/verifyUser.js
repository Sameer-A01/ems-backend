// // middlewares/verifyUser.js
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js'; // Adjust the path if necessary

// const verifyUser = async (req, res, next) => {
//     try {
//         // Extract the token from the Authorization header
//         const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
//         if (!token) {
//             return res.status(401).json({ success: false, error: "Token Not Provided" });
//         }

//         // Verify the token using JWT
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         if (!decoded) {
//             return res.status(401).json({ success: false, error: "Token Not Valid" });
//         }

//         // Find the user from the decoded token
//         const user = await User.findById(decoded._id).select('-password');
//         if (!user) {
//             return res.status(404).json({ success: false, error: "User not found" });
//         }

//         // Attach the user to the request object
//         req.user = user;

//         // Proceed to the next middleware or route handler
//         next();
//     } catch (error) {
//         console.error(error.message);
//         return res.status(500).json({ success: false, error: "Internal server error" });
//     }
// };

// export default verifyUser;
