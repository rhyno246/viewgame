import lscache from "lscache";

const Storage = {
  get(key, parseType) {
    let data = lscache.get(key);
    try {
      if (data && parseType) {
        data = JSON.parse(data);
      }
    } catch (err) {
      //config parse ex: "{}" or "[]"
      if (parseType == "[]") data = [];
      else data = {};
    }

    return data || "";
  },
  set(key, value, expire) {
    expire = expire || "3*24*60";
    lscache.set(key, value, expire);
  },
  remove(key) {
    lscache.remove(key);
  }
};

export default Storage;

/**
 * Use
 * Storage.get('keyname'); result: value
 * Storage.get('keyname', '[]'); result: array
 * Storage.get('keyname', '{}'); result: object
 * Storage.get('keyname', '{}'); result: object
 */
