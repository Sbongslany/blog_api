//
// const getTokenFromHeader = req => {
//     // get token header
//      const headerObj = req.headers;
//
//      const token = headerObj["authorization"].split(" ")[1];
//
//     if (token !== undefined) {
//         return token;
//     }else{
//         return false;
//     }
//  }
//
//  module.exports = getTokenFromHeader;

const getTokenFromHeader = (req) => {
    // Check if headers exist and contain the authorization property
    if (!req.headers || !req.headers.authorization) {
        return false; // Or return null if you prefer
    }

    const authHeader = req.headers.authorization;
    const tokenParts = authHeader.split(" ");

    // Ensure it's in the expected "Bearer <token>" format
    if (tokenParts.length === 2 && tokenParts[0] === "Bearer") {
        return tokenParts[1];
    }

    return false; // Return false if format is incorrect
};

module.exports = getTokenFromHeader;
