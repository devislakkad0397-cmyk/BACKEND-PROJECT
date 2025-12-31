const express = require("express");
const URL = require("../models/url");

const router = express.Router();

// Define middleware function explicitly for NORMAL role users
function restrictToNormalMiddleware(req, res, next) {
    if (!req.user) {
        return res.redirect("/login");
    }
    
    if (!["NORMAL","ADMIN"].includes(req.user.role)) {
        return res.status(403).end('Unauthorized');
    }
    
    return next();
}

// Define middleware function explicitly for ADMIN role users
function restrictToAdminMiddleware(req, res, next) {
    if (!req.user) {
        return res.redirect("/login");
    }
    
    if (!["ADMIN"].includes(req.user.role)) {
        return res.status(403).end('Unauthorized');
    }
    
    return next();
}

router.get('/admin/urls', restrictToAdminMiddleware, async(req, res) => {
    const allurls = await URL.find({});
    return res.render("home", {
        urls: allurls,
    });
})

router.get('/', restrictToNormalMiddleware, async(req, res) => {
    // Safety check: Ensure user exists (already checked by middleware, but extra safety)
    if (!req.user || !req.user._id) {
        return res.redirect("/login");
    }
    
    const allurls = await URL.find({ createdBy: req.user._id });
    return res.render("home", {
        urls: allurls,
    });
})

router.get("/signup", (req, res) => {
    return res.render("signup")
});

router.get("/login", (req, res) => {
    return res.render("login")
});

module.exports = router;
