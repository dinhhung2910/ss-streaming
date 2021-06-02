const GetBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      // console.log(reader.result);
      resolve(reader.result);
    };
    reader.onerror = function(error) {
      // console.log('Error: ', error);
      reject(error);
    };
  });
};

export default GetBase64;
