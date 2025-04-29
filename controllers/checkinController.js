import Location from '../models/Location.js';
// import { getDeviceInfo } from '../utils/deviceUtils';  // Utility function to parse device info if needed

export const handleCheckIn = async (req, res) => {
  const { lat, lon, accuracy, altitude, photoPath, photoUrl, remarks } = req.body;

  try {
    // Extract device info from the request body (could be sent from the frontend)
    const deviceInfo = req.body.deviceInfo || {};

    // Capture the IP Address from the request (this could be done server-side)
    const ipAddress = req.ip;

    // Create a new Location record
    const newLocation = new Location({
      employeeId: req.user._id,  // Assuming user authentication is in place
      lat,
      lon,
      accuracy,
      altitude,
      ipAddress,
      deviceInfo,
      photoPath,
      photoUrl,
      remarks
    });

    await newLocation.save();

    res.status(200).json({
      success: true,
      message: 'Check-in successful!',
      location: { lat, lon }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error during check-in. Please try again.'
    });
  }
};
