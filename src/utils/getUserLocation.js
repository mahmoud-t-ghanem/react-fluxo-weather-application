export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject("errors.notSupported");
    }

    const options = {
      // enableHighAccuracy: true,
      enableHighAccuracy: false,
      timeout: 10000,
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
        let errorKey = "errors.locationUnavailable";

        switch (error.code) {
          case 1:
            errorKey = "errors.locationDenied";
            break;
          case 3:
            errorKey = "errors.network";
            break;
          default:
            errorKey = "errors.locationUnavailable";
        }

        reject(errorKey);
      },
      options,
    );
  });
};
