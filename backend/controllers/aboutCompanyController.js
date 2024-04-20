import asyncHandler from "../middleware/asyncHandler.js";
import AboutCompany from "../models/aboutCompanyModel.js";

// @desc    Get About Company
// @route   GET /api/aboutcompany
// @access  Public
const getAboutCompany = asyncHandler(async (req, res) => {
  const aboutCompany = await AboutCompany.findOne();
  res.status(200).json(aboutCompany);
});

// @desc    Update About Company
// @route   PUT /api/aboutcompany/:id
// @access  Private/Admin
const updateAboutCompany = asyncHandler(async (req, res) => {
  const { logoImage, firstName, lastName, phone, whatsApp, address, establishDate, aboutUs, emailAddress, facebookPageUrl, instagramPageUrl, linkedInPageUrl } = req.body;

  let aboutCompany = await AboutCompany.findOne();

  if (!aboutCompany) {
    // If no About Company document exists, create a new one
    aboutCompany = new AboutCompany({
      logoImage,
      firstName,
      lastName,
      phone,
      whatsApp,
      address,
      establishDate,
      aboutUs,
      emailAddress,
      facebookPageUrl,
      instagramPageUrl,
      linkedInPageUrl
    });
  } else {
    // If About Company document exists, update it
    aboutCompany.logoImage = logoImage;
    aboutCompany.firstName = firstName;
    aboutCompany.lastName = lastName;
    aboutCompany.phone = phone;
    aboutCompany.whatsApp = whatsApp;
    aboutCompany.address = address;
    aboutCompany.establishDate = establishDate;
    aboutCompany.aboutUs = aboutUs;
    aboutCompany.emailAddress = emailAddress;
    aboutCompany.facebookPageUrl = facebookPageUrl;
    aboutCompany.instagramPageUrl = instagramPageUrl;
    aboutCompany.linkedInPageUrl = linkedInPageUrl;
  }

  const updatedAboutCompany = await aboutCompany.save();
  res.status(200).json(updatedAboutCompany);
});

// @desc    Delete About Company
// @route   DELETE /api/aboutcompany/:id
// @access  Private/Admin
// const deleteAboutCompany = asyncHandler(async (req, res) => {
//   await AboutCompany.deleteOne();
//   res.status(200).json({ message: "About Company deleted" });
// });

export {
  getAboutCompany,
  updateAboutCompany,
//   deleteAboutCompany
};
