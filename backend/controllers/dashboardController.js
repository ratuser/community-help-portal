const HelpRequest = require("../models/HelpRequest");

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    
    const totalRequests = await HelpRequest.countDocuments({ user: userId });
    const activeRequests = await HelpRequest.countDocuments({
      user: userId,
      status: "Pending",
    });
    const completedRequests = await HelpRequest.countDocuments({
      user: userId,
      status: "Completed",
    });

    // Recent requests
    const recentRequests = await HelpRequest.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title location status createdAt");

    // Chart data — requests per week (last 4 weeks)
    const now = new Date();
    const weeks = [];

    for (let i = 3; i >= 0; i--) {
      const startOfWeek = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - now.getDay() - i * 7
      );
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 7);

      const weekCount = await HelpRequest.countDocuments({
        user: userId,
        createdAt: { $gte: startOfWeek, $lt: endOfWeek },
      });
      weeks.push(weekCount);
    }

    // Pie chart: resource types (example field)
    const resourceAggregation = await HelpRequest.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$category", // assumes HelpRequest has a "category" field
          count: { $sum: 1 },
        },
      },
    ]);

    const resourceLabels = resourceAggregation.map((r) => r._id || "Other");
    const resourceCounts = resourceAggregation.map((r) => r.count);

    res.json({
      user: { id: req.user._id, name: req.user.name, email: req.user.email }, // ✅ Added user info
      totalRequests,
      activeRequests,
      completedRequests,
      recentRequests,
      chartData: {
        weeks,
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        resources: { labels: resourceLabels, data: resourceCounts },
      },
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getDashboardData };
