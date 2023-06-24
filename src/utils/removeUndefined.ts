export const removeUndefined = (obj: any): any => {
    const newObj: any = {};
  
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "object" && value !== null) {
        const nestedObj = removeUndefined(value); 
        if (Object.keys(nestedObj).length > 0) {
          newObj[key] = nestedObj;
        }
      } else if (value) { 
        newObj[key] = value;
      }
    }
  
    return newObj;
  };
  