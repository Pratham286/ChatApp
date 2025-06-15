// dbupdate.js
import { User } from '../model/user.js';

const updateUsersWithFriendRequest = async () => {
  try {
    const result = await User.updateMany(
      { friendrequestrecieved: { $exists: false } },
      { $set: { friendrequestrecieved: [] } }
    );
    console.log(`Updated ${result.modifiedCount} users`);
  } catch (error) {
    console.error("Error updating users:", error);
  }
};

export default updateUsersWithFriendRequest;
