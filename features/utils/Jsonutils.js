class JsonUtils {
    objectToJSONArrayWithoutKey = async (userdata) => {
      let jsonArray = JSON.parse(JSON.stringify(userdata));
      return jsonArray;
    };
  
    objectToJSONArrayWithKeys = async (userdata) => {
      const jsonArray = await Object.keys(userdata).map((key) => userdata[key]);
      return jsonArray;
    };
  }
  
  export default new JsonUtils();
  