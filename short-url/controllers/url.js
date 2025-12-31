const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGeneratNewShortURL(req, res) {
    const body = req.body || {};

    if (!body.url)
        return res.status(400).json({ error: "url is required" });

    // Safety check: Ensure user is authenticated
    if (!req.user || !req.user._id) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const shortID = nanoid(8);

        await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
            createdBy: req.user._id,
        });
        
        // Fetch all URLs for the user to display on home page
        const allurls = await URL.find({ createdBy: req.user._id });
        
        return res.render("home", {
            urls: allurls,
            id: shortID,
        });
    } catch (error) {
        return res.status(500).json({ error: "Failed to create short URL" });
    }
}
async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    return res.json(
    {
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory
});
}

module.exports = {
    handleGeneratNewShortURL,
    handleGetAnalytics,
};
