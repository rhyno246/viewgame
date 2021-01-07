export const formatChars = function(str) {
    try {
      return str
        .replace(/[àáảãạâầấẩẫậăằắẳẵặ]/g, "a")
        .replace(/[èéẻẽẹêềếểễệ]/g, "e")
        .replace(/[đ]/g, "d")
        .replace(/[ìíỉĩị]/g, "i")
        .replace(/[òóỏõọôồốổỗộơờớởỡợ]/g, "o")
        .replace(/[ùúủũụưừứửữự]/g, "u")
        .replace(/[ỳýỷỹỵ]/g, "y")
        .replace(/[^\w\s]/gi, "") //replace special chars
        .replace(/  +/g, " ") //replace multi space to one space
        .replace(/ /g, "-");
    } catch {
      return "";
    }
  };
  
  export const urlParse = function(str) {
    let query = "";
    let href = str || location.href;
    const url = href.split("?");
    if (url.length >= 2) {
      query = url[1];
    }
  
    let result = {};
    query.split("&").forEach(function(part) {
      if (part) {
        var item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
      }
    });
    return result;
  };
  
  export const urlStringify = function(obj) {
    var encode = encodeURIComponent;
    return Object.keys(obj || {})
      .reduce(function(arr, key) {
        [].concat(obj[key]).forEach(function(v) {
          arr.push(encode(key) + "=" + encode(v));
        });
        return arr;
      }, [])
      .join("&")
      .replace(/\s/g, "+");
  };
  