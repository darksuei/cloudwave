const { Novu } = require("@novu/node");

const novu = new Novu(process.env.NOVU_API_KEY);

const createNotificationSubscriber = async ({ id, email }) => {
  novu.subscribers.identify(id, {
    email: email,
  });
};

const sendPasswordResetEmail = async ({ id, email, resetLink }) => {
  novu.trigger("cloudwave-password-reset", {
    to: {
      subscriberId: id,
      email: email,
    },
    payload: {
      resetLink: resetLink,
    },
  });
};

module.exports = {
  createNotificationSubscriber,
  sendPasswordResetEmail,
};
