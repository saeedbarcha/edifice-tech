import jsPDF from "jspdf";
import certificateImage from "./certificate.png";
import{formatDateMothFormat} from "./formatDate.js"


const downloadCertificate = (admissionB, enrollment) => {


    const doc = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: [20, 10],
    });
    doc.addImage(admissionB.batch.image || certificateImage, "PNG", 0, 0, 20, 11);
    const firstText = `${enrollment?.firstName} ${enrollment?.lastName}`;
    doc.setFont("Noto Serif");
    doc.setFontSize(77);
    const firstTextWidth =
      (doc.getStringUnitWidth(firstText) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const firstTextX = (19.5 - firstTextWidth) / 2;
    const firstTextY = 5.1;
    doc.text(firstText, firstTextX, firstTextY);
    const secondText = `${enrollment?.gender === "Male" ? "Son" : "Daughter"} of  ${enrollment.fatherName} for successful complition for the course of ${enrollment?.courseId?.title} from  ${formatDateMothFormat(admissionB?.batch?.startDate)} to ${formatDateMothFormat(admissionB?.batch?.endDate)}`;
    
    
    doc.setFont("Noto Serif");
    doc.setFontSize(22);
    doc.setFillColor(255, 255, 255);
    const secondTextWidth =
      (doc.internal.pageSize.getWidth() * 35.7) / doc.internal.scaleFactor;
    const secondTextX = (26.3 - firstTextWidth) / 2;
    const secondTextY = 6;
    doc.text(secondText, secondTextX, secondTextY, {
      align: "center",
      maxWidth: secondTextWidth,
    });
    doc.save("certificate.pdf");
  };

  
export { downloadCertificate };