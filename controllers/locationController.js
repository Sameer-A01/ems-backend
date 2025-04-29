import exif from 'exif-parser';
import fs from 'fs';
import Location from '../models/Location.js';

// Controller for handling location check-in
const getLocation = async (req, res) => {
  try {
    // Ensure a photo is uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No photo uploaded.' });
    }

    // Parse device info from the request body (optional, for additional data)
    let deviceInfo = {};
try {
  if (!req.body || !req.body.deviceInfo) {
    return res.status(400).json({ success: false, message: 'Device info is missing.' });
  }
  deviceInfo = JSON.parse(req.body.deviceInfo);
} catch (err) {
  return res.status(400).json({ success: false, message: 'Invalid device info format.' });
}



    // Read the uploaded photo and parse EXIF data
    const buffer = fs.readFileSync(req.file.path);
    const parser = exif.create(buffer);
    const result = parser.parse();

    // Check if the photo contains GPS data (latitude and longitude)
    if (!result.tags.GPSLatitude || !result.tags.GPSLongitude) {
      return res.status(400).json({
        success: false,
        message: 'No GPS data found. Please take a live photo using your camera.',
      });
    }

    const lat = result.tags.GPSLatitude;
    const lon = result.tags.GPSLongitude;
    const accuracy = result.tags.GPSHPositioningError || null;  // Optional
    const altitude = result.tags.GPSAltitude || null;  // Optional

    // Get the user's IP address (helps in verifying the location)
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress || null;

    // Generate the full path for the uploaded photo
    const photoPath = req.file.path.replace(/\\/g, '/');
    const fullPhotoUrl = `${req.protocol}://${req.get('host')}/${photoPath}`;

    // Create a new Location entry for this check-in
    const newLocation = new Location({
      employeeId: req.user._id,  // Assuming req.user contains authenticated user's data
      lat,
      lon,
      accuracy,
      altitude,
      ipAddress,
      deviceInfo,
      photoPath,
      photoUrl: fullPhotoUrl,
      isVerified: false,  // default, can be updated later
      remarks: '',        // empty initially
      timestamp: new Date()
    });

    // Save the location to the database
    await newLocation.save();

    // Respond with success and the location details
    res.status(200).json({
      success: true,
      message: 'Location check-in successful',
      location: { lat, lon },
      photoUrl: fullPhotoUrl,
      accuracy,
      altitude,
      ipAddress
    });
  } catch (error) {
    console.error('❌ Location check-in error:', error.message);
    return res.status(500).json({ success: false, message: 'Server error. Try again.' });
  }
};

// Controller function to fetch all location data (admin view)
const getAllLocations = async (req, res) => {
  try {
    let locations;

    // If the user is an admin, return all locations
    if (req.user.role === 'admin') {
      locations = await Location.find().populate('employeeId', 'name employeeId department');
    } else {
      // If the user is not an admin, return only their own location
      locations = await Location.find({ employeeId: req.user._id }).populate('employeeId', 'name department');
    }

    res.status(200).json({
      success: true,
      locations,
    });
  } catch (error) {
    console.error('❌ Error fetching locations:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching locations. Please try again later.',
    });
  }
};

export { getLocation, getAllLocations };
