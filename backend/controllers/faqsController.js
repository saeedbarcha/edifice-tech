import asyncHandler from "../middleware/asyncHandler.js";
import Faqs from "../models/faqsModel.js";

// get faqs
const getFaqs = asyncHandler(async (req, res) => {
    const pageSize = process.env.PAGINATION_LIMIT || 8;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {
      question: {
        $regex: req.query.keyword,
        $options: "i"
      }
    } : {};
    const count = await Faqs.countDocuments({...keyword});
    const allFaqs = await Faqs.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1));
  
    if (!allFaqs) {
      res.status(404).json({ message: "Faq not found" });
    }
    res.status(200).json({ allFaqs, page, pages: Math.ceil(count / pageSize) });
});

// get active faqs
const getActiveFaqs = asyncHandler(async (req, res) => {
  const faqs = await Faqs.find({isActive:true})
  res.status(201).json(faqs);
});

// get faq by id
const getFaqById = asyncHandler(async (req, res) => {
  const faq = await Faqs.findById(req.params.id);

  if (faq) {
    return res.json(faq);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// create faq
  const createFaq = asyncHandler(async (req, res) => {
    const {question, answer, isActive} = req.body;
    const faq = await Faqs({
        user: req.user._id,
        question,
        answer,
        isActive
    });
    const createFaq = await faq.save();
    res.status(201).json(createFaq);
  });

// update faq
const updateFaq = asyncHandler(async (req, res) => {
  const { question, answer, isActive } = req.body;
  
  const faq = await Faqs.findById(req.params.id);

  if (faq) {
    faq.user = req.user ||  faq?.user;
    faq.question = question || faq?.question;
    faq.answer = answer || faq?.answer;
    faq.isActive = isActive ;
    const upFaq = await faq.save();

    res.status(200).json(upFaq);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// delete faq
const deleteFaq = asyncHandler(async (req, res) => {
    const faq = await Faqs.findById(req.params.id);
  
    if (faq) {
      await Faqs.deleteOne({ _id:req.params.id });
      res.status(200).json({ message: "Faqs deleted" });
    } else {
      res.status(404);
      throw new Error("Resource not found");
    }
  });

export {
  getFaqs,
  getActiveFaqs,
  getFaqById,
  createFaq,
  updateFaq,
  deleteFaq,
};
