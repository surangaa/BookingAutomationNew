class JsonUtils {
    objectToJSONArrayWithoutKey = async (userdata) => {
      let jsonArray = JSON.parse(JSON.stringify(userdata));
      return jsonArray;
    };
  
  }
  
  export default new JsonUtils();
  