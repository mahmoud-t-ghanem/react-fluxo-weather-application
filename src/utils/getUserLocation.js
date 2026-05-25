export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject("errors.notSupported");
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        let errorKey = "errors.network";

        switch (error.code) {
          case 1:
          case 2:
            errorKey = "errors.locationDenied";
            break;
          case 3:
          default:
            errorKey = "errors.network";
            break;
        }

        reject(errorKey);
      },
      options,
    );
  });
};
