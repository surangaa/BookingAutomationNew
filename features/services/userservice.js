import JsonUtils from '../utils/Jsonutils.js'

import userdata from '../test-Data/td_user.json' assert { type: "json" };

class UserDataService {

  getUserByType = async (usertype) => {
    const jsonArray = await JsonUtils.objectToJSONArrayWithoutKey(userdata);
    const user = await jsonArray.find((user) => {
      return user.userType === usertype;
    });
    return user;
  }
}

export default new UserDataService();
