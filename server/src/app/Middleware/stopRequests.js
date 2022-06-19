export default async (req, res, next) => {
  return res.status(503).json({
    type: "error",
    msg: "Service unavailable",
    data: null,
    extra: null,
  });
};
