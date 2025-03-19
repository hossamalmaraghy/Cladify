import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        // ✅ Extract token from Authorization header
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

        // ✅ Check if token exists
        if (!token) {
            return res.json({ success: false, message: "Not Authorized, Login Again" });
        }

        // ✅ Verify token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ Ensure the decoded token has the correct email
        if (token_decode.email !== process.env.ADMIN_EMAIL) {
            return res.json({ success: false, message: "Not Authorized, Login Again" });
        }

        req.user = token_decode; // Store user info for further use
        next();
    } catch (error) {
        console.log("Auth Error:", error);
        res.json({ success: false, message: "Invalid Token" });
    }
};

export default adminAuth;

// import jwt from 'jsonwebtoken'

// const adminAuth = async (req,res,next) => {
//     try {
//         const { token } = req.headers;
//         if (!token) {
//             return res.json({ success: false, message: "Not Authorized, Login Again" });
//         }
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//         if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
//             return res.json({ success: false, message: "Not Authorized, Login Again" });
//         }
//         next();
//     } catch (error) {
//         console.log(error);
//         res.json({success: false, message: error.message});
//     }
// } 

// export default adminAuth;