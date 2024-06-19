const Storage = require("../../services/storage");

const getStorage = async (req, res) => {
  const maxStorage = 3;
  const maxStorageKB = maxStorage * 1024 * 1024;

  const folder = Storage.getInstance().storage.root.children.find((folder) => folder.name === req.user.email);

  if (!folder)
    return res.status(200).json({
      message: "Success",
      storageUsed: 0,
      unit: "KB",
      percentage: 0,
    });

  const spaceUsed = (await Storage.getInstance().getSpaceUsed(folder)) ?? req.user.spaceUsed;

  const storageUsedKB = Math.round(spaceUsed);
  const storageUsedMB = Math.round(storageUsedKB / 1024);
  const storageUsedGB = Math.round(storageUsedKB / (1024 * 1024));

  let percentage = Math.round((storageUsedKB / maxStorageKB) * 100);

  if (storageUsedKB > 0 && storageUsedKB < 52429) percentage = 1;

  if (storageUsedKB > 1024 * 1024) {
    return res.status(200).json({
      message: "Success",
      storageUsed: storageUsedGB,
      unit: "GB",
      percentage,
    });
  } else if (storageUsedKB > 1024) {
    return res.status(200).json({
      message: "Success",
      storageUsed: storageUsedMB,
      unit: "MB",
      percentage,
    });
  }
  return res.status(200).json({
    message: "Success",
    storageUsed: storageUsedKB,
    unit: "KB",
    percentage,
  });
};

module.exports = getStorage;
