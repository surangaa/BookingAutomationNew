import JsonUtils from '../utils/Jsonutils.js'

import productdata from '../test-Data/td_product.json' assert { type: "json" };

class LocationService {

  getLocation = async () => {
    const jsonArray = await JsonUtils.objectToJSONArrayWithoutKey(productdata);
    return jsonArray;
  }
}

export default new LocationService();