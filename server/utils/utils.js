const crypto = require("crypto");
require("dotenv").config();

const formatDateLabel = (date) => {
  const currentDate = new Date();
  const providedDate = new Date(date);

  const timeDifference = currentDate - providedDate;
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

  if (timeDifference < oneDayInMilliseconds) {
    if (timeDifference < 60 * 1000) {
      return "Just now";
    } else if (timeDifference < 2 * 60 * 1000) {
      return "A minute ago";
    } else if (timeDifference < 60 * 60 * 1000) {
      return Math.floor(timeDifference / (60 * 1000)) + " minutes ago";
    } else if (timeDifference < 2 * 60 * 60 * 1000) {
      return "An hour ago";
    } else {
      return Math.floor(timeDifference / (60 * 60 * 1000)) + " hours ago";
    }
  } else if (timeDifference < 2 * oneDayInMilliseconds) {
    return "yesterday";
  } else {
    return providedDate.toDateString();
  }
};

const getCategoryFromFileName = (file) => {
  const fileExtension = file.split(".").pop().toLowerCase();

  const categories = {
    pictures: ["jpg", "jpeg", "png", "gif"],
    audio: ["mp3", "wav", "ogg"],
    videos: ["mp4", "avi", "mov", "mkv"],
    documents: ["pdf", "doc", "docx", "txt"],
  };

  for (const category in categories) {
    if (categories[category].includes(fileExtension)) {
      return category;
    }
  }

  return "documents";
};

const getCategoryIcon = (category) => {
  switch (category) {
    case "pictures": {
      return "fa-image";
    }
    case "audio": {
      return "fa-headphones";
    }
    case "videos": {
      return "fa-video";
    }
    case "documents": {
      return "fa-file-alt";
    }
    default: {
      return "fa-file-alt";
    }
  }
};

const linkHash = async (data) => {
  const encryptionKey = process.env.ENCRYPTION_KEY;
  const iv = process.env.IV;
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(encryptionKey),
    Buffer.from(iv, "hex"),
  );
  let encryptedData = cipher.update(data, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  return encryptedData;
};

const deLinkHash = async (encryptedData) => {
  const encryptionKey = process.env.ENCRYPTION_KEY;
  const iv = process.env.IV;
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(encryptionKey),
    Buffer.from(iv, "hex"),
  );
  let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
  decryptedData += decipher.final("utf-8");
  return decryptedData;
};

module.exports = {
  formatDateLabel,
  getCategoryFromFileName,
  getCategoryIcon,
  linkHash,
  deLinkHash,
};
