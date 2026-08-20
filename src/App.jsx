import { Fragment, useEffect, useRef, useState } from 'react';
import './App.css';
import './form-styles.css';

// Translations object stores all visible strings in each supported language.
// Use the translation key with the t() helper to render text in the current language.
// This file contains the main React component for the Chaitanya Education website.
// It includes localized text, page data, UI state, page sections, and interactive behavior.

const translations = {
  en: {
    academic1Desc: "Foundational learning with play-based activities and English-medium instruction for LKG through 3rd grade.",
    academic1Detail1: "Play-based learning methodology",
    academic1Detail2: "English and Kannada medium options",
    academic1Detail3: "Focus on literacy, numeracy, and social skills",
    academic1Detail4: "Individual attention with low student-teacher ratio",
    academic1Detail5: "Art, music, and physical education activities",
    academic1DetailsTitle: "Program Details:",
    academic1Duration: "<strong>Duration:</strong> Age 3-8 years (LKG to 3rd Grade)",
    academic1Title: "LKG to 3rd Grade",
    // 2. 4th to 5th Grade
    academic2Desc: "Focused coaching for 4th and 5th grades with preparation for Navodaya, Muraji, Alvas, Sainik School and many more exams.",
    academic2Detail1: "Competitive exam coaching and concept building",
    academic2Detail2: "Strong foundation in Maths and Science",
    academic2Detail3: "Practice tests for Navodaya, Muraji and other exams",
    academic2Detail4: "Small group mentoring and doubt clearing",
    academic2Detail5: "English language development and confidence building",
    academic2DetailsTitle: "Program Details:",
    academic2Duration: "<strong>Duration:</strong> Grades 4-5 (Age 8-11 years)",
    academic2Title: "4th to 5th Grade",
    //3. 6th to 7th grade
    academic3Desc: "Balanced learning for grades 6 to 7 with a strong foundation in core subjects and regular support.",
    academic3Detail1: "Comprehensive State Board curriculum",
    academic3Detail2: "Focus on critical thinking and study habits",
    academic3Detail3: "Regular assessment and teacher feedback",
    academic3Detail4: "Computer education and language support",
    academic3Detail5: "Extra classes for key subjects",
    academic3DetailsTitle: "Program Details:",
    academic3Duration: "<strong>Duration:</strong> Grades 6-7 (Age 11-13 years)",
    academic3Title: "6th to 7th Grade",
    //4. 8th to 10th grade
    academic4Desc: "Comprehensive education for grades 8 to 10 with IIT and NEET foundation coaching.",
    academic4Detail1: "IIT and NEET foundation classes ",
    academic4Detail2: "Exam-focused concept development",
    academic4Detail3: "Personalized coaching and doubt clearing",
    academic4Detail4: "Career guidance and science mentoring",
    academic4Detail5: "State Board exam preparation",
    academic4DetailsTitle: "Program Details:",
    academic4Duration: "<strong>Duration:</strong> Grades 8-10 (Age 13-16 years)",
    academic4Title: "8th to 10th Grade",
    //3. ITI
    academic5Desc: "Industrial Training Institute programs offering practical skills and vocational education for career readiness.",
    academic5Detail1: "Various trade courses (e.g., Electrician, Fitter, Mechanic)",
    academic5Detail2: "Hands-on training with industry-standard equipment",
    academic5Detail3: "Practical skill development and job placement assistance",
    academic5Detail4: "Affiliated with NCVT/SCVT",
    academic5Detail5: "Duration: 1-2 years depending on the trade",
    academic5DetailsTitle: "Program Details:",
    academic5Duration: "<strong>Eligibility:</strong> 10th pass or equivalent",
    academic5Title: "ITI Vocational Training",
    address: "Address:",
    contactLabel: "Contact",
    contactText: "Reach out to admissions to learn about class availability, resources, and campus support.",
    contactTitle: "Get in touch for enrollment information",
    email: "Email:",
    event1Date: "January 26, 2026",
    event1Desc: "Celebrating India's Republic Day with patriotic fervor and cultural programs.",
    event1Detail1: "Flag hoisting ceremony",
    event1Detail2: "Patriotic songs and cultural performances",
    event1Detail3: "Speech on national unity",
    event1Detail4: "Student parade and march past",
    event1DetailsTitle: "Event Highlights:",
    event1Link: "Read more about Republic Day →",
    event1Title: "Republic Day",
    event2Date: "December 19, 2025",
    event2Desc: "Grand stage finale celebrating academic excellence and cultural achievements.",
    event2Detail1: "Prize distribution ceremony",
    event2Detail2: "Cultural performances by students",
    event2Detail3: "Guest speakers and chief guest address",
    event2Detail4: "Display of student projects and artwork",
    event2DetailsTitle: "Event Highlights:",
    event2Link: "Read more about Annual Day →",
    event2Title: "Annual Day",
    event3Date: "November 1, 2025",
    event3Desc: "Celebrating Karnataka's formation day with traditional cultural programs.",
    event3Detail1: "Traditional Kannada folk dances",
    event3Detail2: "Kannada literature and poetry recitation",
    event3Detail3: "Traditional music performances",
    event3Detail4: "Speech on Karnataka's culture and heritage",
    event3DetailsTitle: "Event Highlights:",
    event3Link: "Read more about Kannada Rajyotsava →",
    event3Title: "Kannada Rajyotsava",
    eventsTitle: "Events & Gallery",
    feature1Desc: "English and Kannada medium options from LKG to 10th",
    feature1Title: "Dual Medium Education",
    feature2Desc: "Practical skill development for career opportunities",
    feature2Title: "ITI Vocational Training",
    feature3Desc: "Interactive learning with smart classrooms and digital tools",
    feature3Title: "Modern Teaching",
    feature4Desc: "Focus on academics, co-curricular activities, and character development",
    feature4Title: "Holistic Approach",
    footerAddress: "Naganur, Tq. Mudalgi, Belagavi, Karnataka 591312",
    footerAddressLabel: "Address:",
    footerContactTitle: "Contact Information",
    footerCopyright: "&copy; 2026 Chaitanya Education Institute. All rights reserved.",
    footerEmail1: "chaitnyaschool97@gmail.com",
    footerEmail2: "",
    footerEmailLabel: "Email:",
    footerHours1: "Monday - Saturday: 8:00 AM - 4:00 PM",
    footerHours2: "Sunday: Closed",
    footerHours3: "Office Hours: 9:00 AM - 5:00 PM",
    footerHoursTitle: "School Hours",
    footerLink1: "About School",
    footerLink2: "Leadership",
    footerLink3: "School Facilities",
    footerLink4: "Admission",
    footerLinksTitle: "Quick Links",
    footerPhone1: "KANNADA MEDIUM: +91 9880515726",
    footerPhone2: "ENGLISH MEDIUM: +91 8123984759",
    footerPhone3: "ITI: +91 99641 66679",
    footerPhoneLabel: "Phone:",
    footerTagline: "Established in 2003 • State Board Affiliation",
    formAdmissionInquiry: "Admission Inquiry",
    formCurriculumInquiry: "Curriculum Information",
    formEmail: "Email Address",
    formFacilitiesInquiry: "School Facilities",
    formFeesInquiry: "Fee Structure",
    formGeneralInquiry: "General Information",
    formGrade: "Grade Applying For",
    formHigh: "High School (8-10)",
    formITI: "ITI ",
    formInquiryType: "Inquiry Type",
    formMessage: "Message",
    formMiddle: "Middle School (6-7)",
    formName: "Full Name",
    formPhone: "Phone Number",
    formPrePrimary: "Pre-Primary(LKG & UKG)",
    formPrimary: "Primary (1-5)",
    formSelectGrade: "Select grade",
    formSelectOption: "Select inquiry type",
    formSubmit: "Send Message",
    formTransferInquiry: "School Transfer",
    galleryLabel: "Gallery",
    galleryTitle: "Explore Our School Life",
    heroBtn1: "Learn More",
    heroBtn2: "Enroll Now",
    heroBtn3: "View Programs",
    heroBtn4: "Enroll Now",
    heroBtn5: "Enroll Now",
    heroBtn6: "Enroll Now",
    heroSubtitle1: "AI based learning programs for all grades!!",
    heroSubtitle2: "IIT & NEET Foundation classes for • 8th to 10th • Resource • Study Material",
    heroSubtitle3: "25+ Years of Academic Excellence in Belagavi with English & Kannada mediums and ITI programs.",
    heroSubtitle4: "Comprehensive education in English and Kannada mediums from LKG to 10th Standard, plus ITI vocational training.",
    heroSubtitle5: "Academics in English/Kannada • Sports • Cultural Activities • ITI Vocational Training • Character Building",
    heroSubtitle6: "Practical skill development for career opportunities",
    heroTitle1: "AI Based Learning",
    heroTitle2: "IIT & NEET FOUNDATION",
    heroTitle3: "Admissions Open for Academic Year 2026-2027",
    heroTitle4: "State Board Excellence Since 2003",
    heroTitle5: "Holistic Development",
    heroTitle6: "ITI Vocational Training",
    visionAndMissionTitle: "Vision & Mission",
    visionTitle: "Vision",
    visionText: "To nurture confident learners who excel academically, think critically, and contribute positively to society.",
    missionTitle: "Mission",
    missionText: "Provide high-quality education, competitive exam coaching, and vocational training in a safe, inclusive environment.",
    leadershipTitle: "Leadership Messages",
    founderTitle: "Founder",
    founderName: "Mr. S S Horatti",
    founderMessage: "Education is the most powerful tool to shape tomorrow. Our core mission is to empower students with robust knowledge, essential life skills, and deep-rooted values, ensuring they step confidently into a successful and meaningful future.",
    chairTitle: "Co-Foundrer",
    chairName: "Mr. Y B Patil",
    chairMessage: "True education goes beyond textbooks. Our focus is on fostering meaningful learning experiences that actively build confidence, strong character, and absolute future readiness for every single student.",
    trusteeTitle: "Trustee",
    trusteeName: "Mr. Vijay S Horatti",
    trusteeMessage: "Growth requires the right soil. We are deeply committed to providing a safe, nurturing, and inspiring environment where students can thrive both academically and personally.",
    principalTitle1: "Kannada Medium Headmistress",
    principalName1: "Mrs. Sandhya Kulkarni",
    principalMessage1: "Discipline and dedication are the pillars of excellence. We maintain a structured academic culture enriched with personalized support to ensure the holistic and well-rounded development of every child.",
    principalTitle2: "English Medium Headmaster",
    principalName2: "Mr. Kumar Hubballi",
    principalMessage2: "Excellence is a habit, not an act. We blend a disciplined academic environment with tailored, individualized attention to foster both high achievement and well-rounded personal growth.",
    principalTitle3: "ITI Headmaster",
    principalName3: "Mr. Sunil Kulloli",
    principalMessage3: "We bridge classroom learning with industry realities. By providing comprehensive vocational training and industry-aligned programs, we prepare our students to build successful, hands-on careers.",
    coordinatorTitle: "Coordinator",
    coordinatorName: "Mr. Sindihati",
    coordinatorMessage: "Success is built day by day. Our dedicated team ensures smooth, uninterrupted learning journeys through consistent monitoring, empathetic mentoring, and personalized student care.",
    academicCoordinatorTitle: "Academic Coordinator",
    academicCoordinatorName: "Mr. Kamdal.",
    academicCoordinatorMessage: "We bridge the gap between school success and competitive excellence. By blending strong foundational concepts with rigorous competitive exam preparation, we unlock opportunities across all classes.",
    admissionsTitle: "Admissions",
    admissionsText: "Admissions are open for the academic year 2026-2027. Contact the office to secure your child’s seat and learn about available programs.",
    admissionsContact: "Reach our admissions team by phone, email or the inquiry form below.",
    navAbout: "About Us",
    navAcademics: "Academics",
    navAdmissions: "Admissions",
    navContact: "Contact Us",
    navHome: "Home",
    navNews: "News & Events",
    news1Conclusion: "The event concluded with prize distribution and a message from our principal emphasizing the importance of sports in holistic development.",
    news1Date: "March 15, 2026",
    news1Detail1: "100m, 200m, and 400m sprint winners",
    news1Detail2: "Relay race champions in both categories",
    news1Detail3: "Long jump and high jump medalists",
    news1Detail4: "Team spirit awards for outstanding participation",
    news1DetailsTitle: "Event Summary:",
    news1Text: "Our students showcased exceptional talent in athletics, winning multiple medals and demonstrating the spirit of teamwork and sportsmanship.",
    news1Title: "Annual Sports Day Success",
    news2Conclusion: "The inauguration was graced by local education officials and parents, marking a significant step in our commitment to digital education.",
    news2Date: "March 10, 2026",
    news2Detail1: "30 high-performance computers with latest processors",
    news2Detail2: "High-speed internet connectivity",
    news2Detail3: "Educational software and programming tools",
    news2Detail4: "Interactive whiteboards and projectors",
    news2DetailsTitle: "Lab Features:",
    news2Text: "State-of-the-art computer lab with latest technology inaugurated, providing students with modern digital learning tools.",
    news2Title: "New Computer Lab Inauguration",
    news3Conclusion: "Our students demonstrated exceptional creativity and scientific thinking, making Chaitanya Education Institute proud at the district level.",
    news3Date: "March 5, 2026",
    news3Detail1: "First prize in Environmental Science category",
    news3Detail2: "Second prize in Physics innovation project",
    news3Detail3: "Third prize in Chemistry experiments",
    news3Detail4: "Special mention for sustainable energy project",
    news3DetailsTitle: "Achievements:",
    news3Text: "Our students brought home numerous prizes at the district-level science fair, showcasing innovative projects and research.",
    news3Title: "Science Fair Winners",
    newsLabel: "Latest News",
    newsTitle: "School Updates & Events",
    phone: "Phone:",
    readMore: "Read more →",
    studentWinsTitle: "Student Wins",
    tab1Label: "Life at Chaitanya Education",
    tab2Label: "Teacher Staff",
    tab3Label: "Classroom Learning",
    tab4Label: "Study Resources",
    tab5Label: "Student Achievements",
    tab6Label: "Sports Activities",
    tab7Label: "Cultural Events",
    tab8Label: "ITI & Vocational Training",
    tab9Label: "ITI Special Events",
    testimonial1: "\" I am Mr D. S. Gudimani from Hidkal, Raibag taluk. My son, Master Nikhil Gudimani, was a student at your school from the 8th to the 10th grade. I am proud to share that in the 2025-26 SSLC examinations, he secured 603 out of 625 marks (96.48%). This achievement is a result of the tireless efforts, unwavering dedication, and selfless service of the Headmaster and all the teachers. You have worked for the progress of every student as if they were your own children. I offer my deepest gratitude and heartfelt thanks to all of you. 🙏🙏🌹🌹\"",
    testimonial2: "\" Madam, today’s cultural fest was executed beautifully. Seeing the profound bond between the students and teachers during the inaugural ceremony brought tears to my eyes. On one side, teachers were honoring the students, and on the other, parents and students joined together to felicitate the teachers. The mutual sense of gratitude displayed by both was truly admirable. I had heard a little about your institution before, but today, I witnessed its greatness with my own eyes. Thank you very much.\"",
    testimonial3: "\"We chose Chaitanya Education Institute for our daughter Adhya, and it has been an excellent decision. From the very first day, we experienced a warm welcome, highly supportive staff, and clear, consistent communication. The well-structured teaching methods have helped Adhya adapt and excel quickly. It is truly outstanding - the school's commitment to quality education and holistic student development.\"",
    testimonialsTitle: "Testimonials",
    viewAllEvents: "View All Events",
    whyChoosePoint1: "AI Based learning with personal AI Tutor support",
    whyChoosePoint2: "IIT and NEET foundation coaching from early grades",
    whyChoosePoint3: "Experienced faculty with personalized attention",
    whyChoosePoint4: "State Board curriculum with modern teaching methods",
    whyChoosePoint5: "Focus on co-curricular activities and sports",
    whyChoosePoint6: "Safe, secure, and nurturing learning environment",
    whyChoosePoint7: "Competitive exam coaching from early grades",
    whyChoosePoint8: "Hands-on ITI vocational training and practical skills",
    whyChooseText: "Chaitanya Education Institute has been a cornerstone of quality education in Mudalgi since 1997. We offer comprehensive education in both English and Kannada mediums from LKG to 10th Standard, along with ITI vocational training programs, focusing on holistic development, character building, and academic excellence.",
    whyChooseTitle: "Why Choose Chaitanya Education Institute?",
    win1Desc: "our Student Vivek Sullannavar has secured 2nd State Rank in 10th board exams",
    win1Title: "10th class 2nd State Rank",
    win2Desc: "our Student Suchitha B S has secured 5th State Rank in 10th board exams",
    win2Title: "10th class 5th State Rank",
    win3Desc: "Outstanding performance in 10th class state board exams with multiple state ranks (2, 5, 7, 8, etc) and academic excellence",
    win3Title: "10th class State Rank Excellence",
    win4Desc: "5th class students Outstanding performance and multiple selections in Alvas, Navodaya, Muraji and Sainik school",
    win4Title: "5th class Competative Exam Selection",
    win5Desc: "Outstanding performance in Navodaya selections with multiple students selected for Navodaya Vidyalaya Samiti schools",
    win5Title: "Navodaya Selection",
    win6Desc: "Outstanding performance in medical entrance exams with multiple students securing top ranks and admissions to prestigious medical colleges",
    win6Title: "Medical Excellence",
    win7Desc: "100% passing rate and outstanding performance in state board exams with multiple students securing top ranks and academic excellence",
    win7Title: "Academic Excellence",
    win8Desc: "Outstanding teaching with real-world skill development in ITI vocational training programs, leading to successful career placements and industry recognition",
    win8Title: "ITI Vocational Excellence"
  },
  kn: {
    academic1Detail1: "ಆಟದ ಆಧಾರಿತ ಕಲಿಕಾ ವಿಧಾನ",
    academic1Detail2: "ಇಂಗ್ಲಿಷ್ ಮತ್ತು ಕನ್ನಡ ಮಾಧ್ಯಮದ ಆಯ್ಕೆಗಳು",
    academic1Detail3: "ಸಾಕ್ಷರತೆ, ಸಂಖ್ಯಾಶಾಸ್ತ್ರ ಮತ್ತು ಸಾಮಾಜಿಕ ಕೌಶಲ್ಯಗಳ ಮೇಲೆ ಗಮನ",
    academic1Detail4: "ಕಡಿಮೆ ವಿದ್ಯಾರ್ಥಿ-ಶಿಕ್ಷಕರ ಅನುಪಾತದೊಂದಿಗೆ ವೈಯಕ್ತಿಕ ಗಮನ",
    academic1Detail5: "ಕಲೆ, ಸಂಗೀತ ಮತ್ತು ದೈಹಿಕ ಶಿಕ್ಷಣ ಚಟುವಟಿಕೆಗಳು",
    academic1DetailsTitle: "ಕಾರ್ಯಕ್ರಮದ ವಿವರಗಳು:",
    academic1Duration: "<strong>ಅವಧಿ:</strong> 3-8 ವರ್ಷ ವಯಸ್ಸು (ಎಲ್.ಕೆ.ಜಿ ಯಿಂದ 3ನೇ ತರಗತಿ)",
    academic1Title: "LKG ಯಿಂದ 3ನೇ ತರಗತಿ",
    // 2. 4th to 5th Grade
    academic2Desc: "4 ಮತ್ತು 5ನೇ ತರಗತಿಗಳಿಗೆ ಕೇಂದ್ರೀಕೃತ ತರಬೇತಿ ಹಾಗೂ ನವೋದಯ, ಮುರಾರ್ಜಿ, ಆಳ್ವಾಸ್, ಸೈನಿಕ ಶಾಲೆ ಮತ್ತು ಇನ್ನುಳಿದ ಪರೀಕ್ಷೆಗಳಿಗೆ ಸಿದ್ಧತೆ.",
    academic2Detail1: "ಸ್ಪರ್ಧಾತ್ಮಕ ಪರೀಕ್ಷೆಗಳಿಗೆ ತರಬೇತಿ ಮತ್ತು ಪರಿಕಲ್ಪನೆಗಳ ಅಭಿವೃದ್ಧಿ",
    academic2Detail2: "ಗಣಿತ ಮತ್ತು ವಿಜ್ಞಾನ ವಿಷಯಗಳಲ್ಲಿ ಬಲವಾದ ಅಡಿಪಾಯ",
    academic2Detail3: "ನವೋದಯ, ಮುರಾರ್ಜಿ ಮತ್ತು ಇತರ ಪರೀಕ್ಷೆಗಳಿಗೆ ಅಭ್ಯಾಸ ಪರೀಕ್ಷೆಗಳು",
    academic2Detail4: "ಸಣ್ಣ ಗುಂಪುಗಳಲ್ಲಿ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಸಂದೇಹ ಪರಿಹಾರ",
    academic2Detail5: "ಇಂಗ್ಲಿಷ್ ಭಾಷಾ ಅಭಿವೃದ್ಧಿ ಮತ್ತು ಆತ್ಮವಿಶ್ವಾಸ ವೃದ್ಧಿ",
    academic2DetailsTitle: "ಕಾರ್ಯಕ್ರಮದ ವಿವರಗಳು:",
    academic2Duration: "<strong>ಅವಧಿ:</strong> 4-5ನೇ ತರಗತಿ (8-11 ವರ್ಷ ವಯಸ್ಸು)",
    academic2Title: "4ನೇ ಮತ್ತು 5ನೇ ತರಗತಿ",
    // 3. 6th to 7th Grade
    academic3Desc: "6 ರಿಂದ 7ನೇ ತರಗತಿಗಳಿಗೆ ಸಮತೋಲಿತ ಕಲಿಕೆ, ಪ್ರಮುಖ ವಿಷಯಗಳಲ್ಲಿ ಬಲವಾದ ಅಡಿಪಾಯ ಮತ್ತು ನಿಯಮಿತ ಬೆಂಬಲ.",
    academic3Detail1: "ಸಮಗ್ರ ರಾಜ್ಯ ಪಠ್ಯಕ್ರಮ (State Board)",
    academic3Detail2: "ವಿಮರ್ಶಾತ್ಮಕ ಚಿಂತನೆ ಮತ್ತು ಅಭ್ಯಾಸದ ಹವ್ಯಾಸಗಳ ಮೇಲೆ ಗಮನ",
    academic3Detail3: "ನಿಯಮಿತ ಮೌಲ್ಯಮಾಪನ ಮತ್ತು ಶಿಕ್ಷಕರಿಂದ ಪ್ರತಿಕ್ರಿಯೆ",
    academic3Detail4: "ಗಣಕಯಂತ್ರ ಶಿಕ್ಷಣ ಮತ್ತು ಭಾಷಾ ಬೆಂಬಲ",
    academic3Detail5: "ಪ್ರಮುಖ ವಿಷಯಗಳಿಗಾಗಿ ವಿಶೇಷ ತರಗತಿಗಳು",
    academic3DetailsTitle: "ಕಾರ್ಯಕ್ರಮದ ವಿವರಗಳು:",
    academic3Duration: "<strong>ಅವಧಿ:</strong> 6-7ನೇ ತರಗತಿ (11-13 ವರ್ಷ ವಯಸ್ಸು)",
    academic3Title: "6ನೇ ಮತ್ತು 7ನೇ ತರಗತಿ",
    // 4. 8th to 10th Grade
    academic4Desc: "8 ರಿಂದ 10ನೇ ತರಗತಿಗಳಿಗೆ ಸಮಗ್ರ ಶಿಕ್ಷಣದೊಂದಿಗೆ IIT ಮತ್ತು NEET ಫೌಂಡೇಶನ್ ತರಬೇತಿ.",
    academic4Detail1: "IIT ಮತ್ತು NEET ಫೌಂಡೇಶನ್ ತರಗತಿಗಳು",
    academic4Detail2: "ಪರೀಕ್ಷಾ ಕೇಂದ್ರಿತ ಪರಿಕಲ್ಪನೆಗಳ ಅಭಿವೃದ್ಧಿ",
    academic4Detail3: "ವೈಯಕ್ತಿಕ ತರಬೇತಿ ಮತ್ತು ಸಂದೇಹ ಪರಿಹಾರ",
    academic4Detail4: "ವೃತ್ತಿ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ವಿಜ್ಞಾನ ವಿಷಯದ ಮಾರ್ಗದರ್ಶನ",
    academic4Detail5: "ರಾಜ್ಯ ಮಂಡಳಿ (State Board) ಪರೀಕ್ಷಾ ಸಿದ್ಧತೆ",
    academic4DetailsTitle: "ಕಾರ್ಯಕ್ರಮದ ವಿವರಗಳು:",
    academic4Duration: "<strong>ಅವಧಿ:</strong> 8-10ನೇ ತರಗತಿ (13-16 ವರ್ಷ ವಯಸ್ಸು)",
    academic4Title: "8ನೇ ಯಿಂದ 10ನೇ ತರಗತಿ",
    // 5. ITI Vocational Training
    academic5Desc: "ವೃತ್ತಿಜೀವನದ ಸಿದ್ಧತೆಗಾಗಿ ಪ್ರಾಯೋಗಿಕ ಕೌಶಲ್ಯ ಮತ್ತು ವೃತ್ತಿಪರ ಶಿಕ್ಷಣವನ್ನು ನೀಡುವ ಇಂಡಸ್ಟ್ರಿಯಲ್ ಟ್ರೈನಿಂಗ್ ಇನ್‌ಸ್ಟಿಟ್ಯೂಟ್ ಕಾರ್ಯಕ್ರಮಗಳು.",
    academic5Detail1: "ವಿವಿಧ ವೃತ್ತಿ ಶಿಕ್ಷಣ ಕೋರ್ಸ್‌ಗಳು (ಉದಾ: ಎಲೆಕ್ಟ್ರಿಷಿಯನ್, ಫಿಟ್ಟರ್, ಮೆಕ್ಯಾನಿಕ್)",
    academic5Detail2: "ಉದ್ಯಮ-ದರ್ಜೆಯ ಉಪಕರಣಗಳೊಂದಿಗೆ ಪ್ರಾಯೋಗಿಕ ತರಬೇತಿ",
    academic5Detail3: "ಪ್ರಾಯೋಗಿಕ ಕೌಶಲ್ಯ ಅಭಿವೃದ್ಧಿ ಮತ್ತು ಉದ್ಯೋಗ ನಿಯೋಜನೆಗೆ ನೆರವು",
    academic5Detail4: "NCVT/SCVT ಮಾನ್ಯತೆ ಹೊಂದಿದೆ",
    academic5Detail5: "ಅವಧಿ: ಆಯಾ ವೃತ್ತಿ ಶಿಕ್ಷಣಕ್ಕೆ ಅನುಗುಣವಾಗಿ 1-2 ವರ್ಷಗಳು",
    academic5DetailsTitle: "ಕಾರ್ಯಕ್ರಮದ ವಿವರಗಳು:",
    academic5Duration: "<strong>ಅರ್ಹತೆ:</strong> 10ನೇ ತರಗತಿ ಉತ್ತೀರ್ಣ ಅಥವಾ ತತ್ಸಮಾನ",
    academic5Title: "ITI ವೃತ್ತಿಪರ ತರಬೇತಿ",
    academicsTitle: "ಅಧ್ಯಯನ",
    visionAndMissionTitle: "ದೃಷ್ಠಿ ಮತ್ತು ಗುರಿ",
    visionTitle: "ದೃಷ್ಠಿ",
    visionText: "ನಮ್ಮ ವಿದ್ಯಾರ್ಥಿಗಳು ಶೈಕ್ಷಣಿಕವಾಗಿ ಮೆರೆದಿರುವುದರ ಜೊತೆಗೆ ಸಮಾಜಿಕವಾಗಿ ಕೂಡ ನಕಾರಾತ್ಮಕವಾಗಿ ಒಡಗಿಸಿಕೊಳ್ಳುವಂತೆ ಬೆಳೆಸುವುದು.",
    missionTitle: "ಗುರಿ",
    missionText: "ಅತ್ಯುನ್ನತ ಶಿಕ್ಷಣ, ಸ್ಪರ್ಧಾತ್ಮಕ కోಚಿಂಗ್ ಮತ್ತು ಉದ್ಯೋಗೋದ್ಯಮ ತರಬೇತಿಯನ್ನು ಸುರಕ್ಷಿತ, ಎಲ್ಲರಿಗೂ ತೆರೆಯಾದ ವಾತಾವರಣದಲ್ಲಿ ಒದಗಿಸುವುದು.",
    leadershipTitle: "ನಾಯಕತ್ವ ಸಂದೇಶಗಳು",
    founderTitle: "ಸಂಸ್ಥಾಪಕರ",
    founderName: "ಶ್ರೀ ಎಸ್. ಎಸ್. ಹೊರಟ್ಟಿ",
    founderMessage: "ಶಿಕ್ಷಣವು ನಾಳಿನ ದಿನವನ್ನು ರೂಪಿಸುವ ಅತ್ಯಂತ ಶಕ್ತಿಶಾಲಿ ಸಾಧನವಾಗಿದೆ. ನಮ್ಮ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಉತ್ತಮ ಜ್ಞಾನ, ಅತ್ಯಗತ್ಯ ಜೀವನ ಕೌಶಲ್ಯಗಳು ಮತ್ತು ಆಳವಾದ ನೈತಿಕ ಮೌಲ್ಯಗಳನ್ನು ನೀಡುವ ಮೂಲಕ, ಅವರು ಯಶಸ್ವಿ ಹಾಗೂ ಅರ್ಥಪೂರ್ಣ ಭವಿಷ್ಯದತ್ತ ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ಹೆಜ್ಜೆ ಇಡುವಂತೆ ಸಬಲೀಕರಣಗೊಳಿಸುವುದೇ ನಮ್ಮ ಪ್ರಮುಖ ಧೇಯವಾಗಿದೆ.",
    chairTitle: "ಸಹ-ಸಂಸ್ಥಾಪಕರು",
    chairName: "ಶ್ರೀ ವೈ. ಬಿ. ಪಾಟೀಲ್",
    chairMessage: "ನೈಜ ಶಿಕ್ಷಣವು ಕೇವಲ ಪಠ್ಯಪುಸ್ತಕಗಳಿಗೆ ಸೀಮಿತವಾಗಿಲ್ಲ. ಪ್ರತಿ ವಿದ್ಯಾರ್ಥಿಯಲ್ಲೂ ಆತ್ಮವಿಶ್ವಾಸ, ಉತ್ತಮ ಚಾರಿತ್ರ್ಯ ಮತ್ತು ಭವಿಷ್ಯದ ಸವಾಲುಗಳನ್ನು ಎದುರಿಸುವ ಪರಿಪೂರ್ಣ ಸಿದ್ಧತೆಯನ್ನು ಬೆಳೆಸುವಂತಹ ಅರ್ಥಪೂರ್ಣ ಕಲಿಕೆಯ ಅನುಭವಗಳನ್ನು ನೀಡುವುದೇ ನಮ್ಮ ಪ್ರಮುಖ ಆದ್ಯತೆಯಾಗಿದೆ.",
    trusteeTitle: "ಟ್ರಸ್ಟಿ",
    trusteeName: "ಶ್ರೀ ವಿಜಯ್ ಎಸ್. ಹೊರಟ್ಟಿ",
    trusteeMessage: "ವಿದ್ಯಾರ್ಥಿಗಳ ಸರ್ವತೋಮುಖ ಬೆಳವಣಿಗೆಗೆ ಪೂರಕವಾದ ವಾತಾವರಣದ ಅಗತ್ಯವಿದೆ. ನಮ್ಮ ವಿದ್ಯಾರ್ಥಿಗಳು ಶೈಕ್ಷಣಿಕವಾಗಿ ಮತ್ತು ವೈಯಕ್ತಿಕವಾಗಿ ಅತ್ಯುತ್ತಮವಾಗಿ ಬೆಳೆಯಲು ಸುರಕ್ಷಿತ, ಪ್ರೋತ್ಸಾಹದಾಯಕ ಹಾಗೂ ಸ್ಪೂರ್ತಿದಾಯಕ ವಾತಾವರಣವನ್ನು ಒದಗಿಸಲು ನಾವು ಬದ್ಧರಾಗಿದ್ದೇವೆ.",
    principalTitle1: "ಕನ್ನಡ ಮಾಧ್ಯಮ ಮುಖ್ಯೋಪಾಧ್ಯಾಯರು",
    principalName1: "ಶ್ರೀಮತಿ ಸಂಧ್ಯಾ ದೇಸಾಯಿ",
    principalMessage1: "ಶಿಸ್ತು ಮತ್ತು ಸಮರ್ಪಣಾ ಮನೋಭಾವವೇ ಶ್ರೇಷ್ಠತೆಯ ಮೂಲಾಧಾರಗಳು. ಪ್ರತಿ ಮಗುವಿನ ಸಮಗ್ರ ಮತ್ತು ಸರ್ವತೋಮುಖ ಬೆಳವಣಿಗೆಯನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಲು, ನಾವು ವೈಯಕ್ತಿಕ ಕಾಳಜಿಯೊಂದಿಗೆ ಉತ್ತಮ ಶೈಕ್ಷಣಿಕ ಶಿಸ್ತನ್ನು ಕಾಪಾಡಿಕೊಂಡು ಬಂದಿದ್ದೇವೆ.",
    principalTitle2:"ಆಂಗ್ಲ ಮಾಧ್ಯಮ ಮುಖ್ಯೋಪಾಧ್ಯಾಯರು",
    principalName2: "ಶ್ರೀ ಕುಮಾರ್ ಹುಬ್ಬಳ್ಳಿ",
    principalMessage2: "ಶ್ರೇಷ್ಠತೆ ಎಂಬುದು ಒಂದು ಕ್ರಿಯೆಯಲ್ಲ, ಅದೊಂದು ರೂಢಿ. ವಿದ್ಯಾರ್ಥಿಗಳಲ್ಲಿ ಉನ್ನತ ಸಾಧನೆ ಮತ್ತು ಪರಿಪೂರ್ಣ ವೈಯಕ್ತಿಕ ಬೆಳವಣಿಗೆಯನ್ನು ಉತ್ತೇಜಿಸಲು, ನಾವು ಶಿಸ್ತುಬದ್ಧ ಶೈಕ್ಷಣಿಕ ವಾತಾವರಣದೊಂದಿಗೆ ವೈಯಕ್ತಿಕ ಗಮನವನ್ನು ನೀಡುತ್ತೇವೆ.",
    principalTitle3: "ITI ಮುಖ್ಯೋಪಾಧ್ಯಾಯರು",
    principalName3: "ಶ್ರೀ ಸುನಿಲ್ ಕುಳ್ಳೋಳಿ",
    principalMessage3: "ನಾವು ತರಗತಿಯ ಕಲಿಕೆಯನ್ನು ಕೈಗಾರಿಕಾ ಕ್ಷೇತ್ರದ ನೈಜತೆಯೊಂದಿಗೆ ಜೋಡಿಸುತ್ತೇವೆ. ಸಮಗ್ರ ವೃತ್ತಿಪರ ತರಬೇತಿ ಮತ್ತು ಕೈಗಾರಿಕಾ ಕ್ಷೇತ್ರಕ್ಕೆ ಪೂರಕವಾದ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಒದಗಿಸುವ ಮೂಲಕ, ನಮ್ಮ ವಿದ್ಯಾರ್ಥಿಗಳು ಯಶಸ್ವಿ ಹಾಗೂ ಕೌಶಲ್ಯಪೂರ್ಣ ವೃತ್ತಿಜೀವನವನ್ನು ರೂಪಿಸಿಕೊಳ್ಳಲು ನಾವು ಸಿದ್ಧಗೊಳಿಸುತ್ತೇವೆ.",
    coordinatorTitle: "ಸಮನ್ವಯಕರು",
    coordinatorName: "ಶ್ರೀ ಸಿಂದಿಹಟ್ಟಿ",
    coordinatorMessage: "ನಿರಂತರ ಪ್ರಯತ್ನದಿಂದ ಯಶಸ್ಸು ಸಾಧ್ಯ. ನಮ್ಮ ಸಮರ್ಪಿತ ತಂಡವು ನಿರಂತರ ಮೇಲ್ವಿಚಾರಣೆ, ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಪ್ರತಿಯೊಬ್ಬ ವಿದ್ಯಾರ್ಥಿಯ ಮೇಲಿನ ಕಾಳಜಿಯ ಮೂಲಕ ಅವರ ಕಲಿಕೆಯ ಪಯಣವು ಯಾವುದೇ ಅಡೆತಡೆಯಿಲ್ಲದೆ ಸುಗಮವಾಗಿ ಸಾಗುವಂತೆ ನೋಡಿಕೊಳ್ಳುತ್ತದೆ.",
    academicCoordinatorTitle: "ಅಕಾಡೆಮಿಕ್ ಸಮನ್ವಯಕರು",
    academicCoordinatorName: "ಶ್ರೀ ಕಮದಾಲ್",
    academicCoordinatorMessage: "ನಾವು ಶಾಲಾ ಶಿಕ್ಷಣ ಮತ್ತು ಸ್ಪರ್ಧಾತ್ಮಕ ಪರೀಕ್ಷೆಗಳ ನಡುವಿನ ಕೊಂಡಿಯಾಗಿದ್ದೇವೆ. ಪ್ರಬಲವಾದ ಮೂಲಭೂತ ಪರಿಕಲ್ಪನೆಗಳೊಂದಿಗೆ ಕಠಿಣ ಸ್ಪರ್ಧಾತ್ಮಕ ಪರೀಕ್ಷೆಗಳ ಸಿದ್ಧತೆಯನ್ನು ಸಂಯೋಜಿಸುವ ಮೂಲಕ, ನಾವು ಎಲ್ಲಾ ತರಗತಿಗಳ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಉಜ್ವಲ ಅವಕಾಶಗಳ ಬಾಗಿಲನ್ನು ತೆರೆಯುತ್ತೇವೆ.",
    admissionsTitle: "ಪ್ರವೇಶ",
    admissionsText: "2026-2027 ಅಕಾಡೆಮಿಕ್ ಸಾಲಿಗಾಗಿ ಪ್ರವೇಶಗಳು ತೆರೆಯಲಾಗಿವೆ. ನಿಮ್ಮ ಮಗುವಿನ ಸೇಟ್ ಅನ್ನು ಖಚಿತಪಡಿಸಲು ಕಚೇರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    admissionsContact: "ದೂರವಾಣಿ, ಇಮೇಲ್ ಅಥವಾ ಕೆಳಗಿನ ಅನ್ವೇಷಣೆ ಫಾರ್ಮ್ ಮೂಲಕ ನಮಗೆ ಸಂಪರ್ಕಿಸಿ.",
    address: "ವಿಳಾಸ:",
    contactLabel: "ಸಂಪರ್ಕ",
    contactText: "ತರಗತಿ ಲಭ್ಯತೆ, ಸಂಪನ್ಮೂಲಗಳು ಮತ್ತು ಕ್ಯಾಂಪಸ್ ಬೆಂಬಲದ ಬಗ್ಗೆ ತಿಳಿದುಕೊಳ್ಳಲು ಪ್ರವೇಶಕ್ಕೆ ಸಂಪರ್ಕಿಸಿ.",
    contactTitle: "ದಾಖಲಾತಿ ಮಾಹಿತಿಗಾಗಿ ಸಂಪರ್ಕಿಸಿ",
    email: "ಇಮೇಲ್:",
    event1Date: "ಜನವರಿ 26, 2026",
    event1Desc: "ಭಾರತದ ಗಣರಾಜ್ಯೋತ್ಸವವನ್ನು ದೇಶಪ್ರೇಮದ ಭಾವನೆಯೊಂದಿಗೆ ಹಾಗೂ ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮಗಳೊಂದಿಗೆ ಆಚರಿಸಲಾಗುತ್ತದೆ.",
    event1Detail1: "ಧ್ವಜಾರೋಹಣ ಸಮಾರಂಭ",
    event1Detail2: "ದೇಶಭಕ್ತಿ ಹಾಡುಗಳು ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಪ್ರದರ್ಶನಗಳು",
    event1Detail3: "ರಾಷ್ಟ್ರೀಯ ಏಕತೆಯ ಬಗ್ಗೆ ಭಾಷಣ",
    event1Detail4: "ವಿದ್ಯಾರ್ಥಿ ಪೆರೇಡ್ ಮತ್ತು ಮಾರ್ಚ್ ಪಾಸ್ಟ್",
    event1DetailsTitle: "ಕಾರ್ಯಕ್ರಮ ವೈಶಿಷ್ಟ್ಯಗಳು:",
    event1Link: "ಗಣರಾಜ್ಯೋತ್ಸವದ ಬಗ್ಗೆ ಇನ್ನಷ್ಟು ಓದಿ →",
    event1Title: "ಗಣರಾಜ್ಯೋತ್ಸವ",
    event2Date: "ಡಿಸೆಂಬರ್ 19, 2025",
    event2Desc: "ಅಧ್ಯಯನಿಕ ಉತ್ಕೃಷ್ಟತೆ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಸಾಧನೆಗಳನ್ನು ಆಚರಿಸುವ ದೊಡ್ಡ ವೇದಿಕೆ.",
    event2Detail1: "ಪ್ರಶಸ್ತಿ ವಿತರಣೆ ಸಮಾರಂಭ",
    event2Detail2: "ವಿದ್ಯಾರ್ಥಿಗಳ ಸಾಂಸ್ಕೃತಿಕ ಪ್ರದರ್ಶನಗಳು",
    event2Detail3: "ಮೇಜ್ಞರು ಮತ್ತು ಮುಖ್ಯ ಅತಿಥಿಯ ಭಾಷಣ",
    event2Detail4: "ವಿದ್ಯಾರ್ಥಿ ಯೋಜನೆಗಳು ಮತ್ತು ಕಲಾಕೃತಿ ಪ್ರದರ್ಶನ",
    event2DetailsTitle: "ಕಾರ್ಯಕ್ರಮ ವೈಶಿಷ್ಟ್ಯಗಳು:",
    event2Link: "ವಾರ್ಷಿಕ ದಿನದ ಬಗ್ಗೆ ಇನ್ನಷ್ಟು ಓದಿ →",
    event2Title: "ವಾರ್ಷಿಕ ದಿನ",
    event3Date: "ನವೆಂಬರ್ 1, 2025",
    event3Desc: "ಕರ್ನಾಟಕದ ರಚನೆ ದಿನವನ್ನು ಸಾಂಪ್ರದಾಯಿಕ ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮಗಳೊಂದಿಗೆ ಆಚರಿಸಲಾಗುತ್ತದೆ.",
    event3Detail1: "ಸಾಂಪ್ರದಾಯಕ ಕನ್ನಡ ಜನಪದ ನೃತ್ಯಗಳು",
    event3Detail2: "ಕನ್ನಡ ಸಾಹಿತ್ಯ ಮತ್ತು ಕವನ ಪಠಣ",
    event3Detail3: "ಸಾಂಪ್ರದಾಯಿಕ ಸಂಗೀತ ಪ್ರದರ್ಶನಗಳು",
    event3Detail4: "ಕರ್ನಾಟಕದ ಸಂಸ್ಕೃತಿ ಮತ್ತು ಪರಂಪರೆಯ ಕುರಿತು ಭಾಷಣ",
    event3DetailsTitle: "ಕಾರ್ಯಕ್ರಮ ವೈಶಿಷ್ಟ್ಯಗಳು:",
    event3Link: "ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವದ ಬಗ್ಗೆ ಇನ್ನಷ್ಟು ಓದಿ →",
    event3Title: "ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ",
    eventsTitle: "ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಗ್ಯಾಲರಿ",
    feature1Desc: "LKG ರಿಂದ 10ನೇ ತರಗತಿವರೆಗೆ ಇಂಗ್ಲೀಷ್ ಮತ್ತು ಕನ್ನಡ ಮಾಧ್ಯಮ ಆಯ್ಕೆಗಳು",
    feature1Title: "ದ್ವಿಭಾಷಾ ಶಿಕ್ಷಣ",
    feature2Desc: "ಉದ್ಯೋಗ ಅವಕಾಶಗಳಿಗೆ ಪ್ರಾಯೋಗಿಕ ಕೌಶಲ್ಯ ಅಭಿವೃದ್ಧಿ",
    feature2Title: "ITI ಉದ್ಯೋಗ ತರಬೇತಿ",
    feature3Desc: "ಸ್ಮಾರ್ಟ್ ಕ್ಲಾಸ್‌ರೂಮ್‌ಗಳು ಮತ್ತು ಡಿಜಿಟಲ್ ಉಪಕರಣಗಳೊಂದಿಗೆ ಸಂವಾದಾತ್ಮಕ ಕಲಿಕೆ",
    feature3Title: "ಆಧುನಿಕ ಬೋಧನೆ",
    feature4Desc: "ಅಧ್ಯಯನ, ಸಹ-ಪಠ್ಯಕ್ರಮ ಚಟುವಟಿಕೆಗಳು ಮತ್ತು ವ್ಯಕ್ತಿತ್ವ ಅಭಿವೃದ್ಧಿಯ ಮೇಲೆ ಒತ್ತು",
    feature4Title: "ಸಮಗ್ರ ವಿಧಾನ",
    footerAddress: "ನಾಗನೂರು, ತಾ. ಮುದಲಗಿ, ಬೆಳಗಾವಿ, ಕರ್ನಾಟಕ 591224",
    footerAddressLabel: "ವಿಳಾಸ:",
    footerContactTitle: "ಸಂಪರ್ಕ ಮಾಹಿತಿ",
    footerCopyright: "&copy; 2026 ಚೈತನ್ಯ ಶಿಕ್ಷಣ ಸಂಸ್ಥೆ. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
    footerEmail1: "chaitnyaschool97@gmail.com",
    footerEmail2: "",
    footerEmailLabel: "ಇಮೇಲ್:",
    footerHours1: "ಸೋಮವಾರ - ಶನಿವಾರ: ಬೆಳಿಗ್ಗೆ 8:00 - ಸಂಜೆ 4:00",
    footerHours2: "ಭಾನುವಾರ: ಮುಚ್ಚಿದೆ",
    footerHours3: "ಕಚೇರಿ ಸಮಯ: ಬೆಳಿಗ್ಗೆ 9:00 - ಸಂಜೆ 5:00",
    footerHoursTitle: "ಶಾಲೆ ಸಮಯ",
    footerLink1: "ಶಾಲೆಯ ಬಗ್ಗೆ",
    footerLink2: "ನಾಯಕತ್ವ",
    footerLink3: "ಶಾಲೆ ಸೌಲಭ್ಯಗಳು",
    footerLink4: "ಪ್ರವೇಶ",
    footerLinksTitle: "ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು",
    footerPhone1: "ಕನ್ನಡ : +91 9880515726",
    footerPhone2: "ಇಂಗ್ಲಿಷ್ : +91 8123984759",
    footerPhone3: "ITI: +91 99641 66679",
    footerPhoneLabel: "ದೂರವಾಣಿ:",
    footerTagline: "2003ರಲ್ಲಿ ಸ್ಥಾಪಿತ • ರಾಜ್ಯ ಮಂಡಳಿ ಅನುಮೋದಿತ",
    formAdmissionInquiry: "ಪ್ರವೇಶ ವಿಚಾರಣೆ",
    formCurriculumInquiry: "ಪಠ್ಯಕ್ರಮ ಮಾಹಿತಿ",
    formEmail: "ಇಮೇಲ್ ವಿಳಾಸ",
    formFacilitiesInquiry: "ಶಾಲಾ ಸೌಲಭ್ಯಗಳು",
    formFeesInquiry: "ಶೂಲ್ಕ ರಚನೆ",
    formGeneralInquiry: "ಸಾಮಾನ್ಯ ಮಾಹಿತಿ",
    formGrade: "ಅರ್ಜಿಗೆ ತರಗತಿ",
    formHigh: "ಹೈ ಸ್ಕೂಲ್ (9-10)",
    formITI: "ITI ",
    formInquiryType: "ವಿಚಾರಣೆಯ ವಿಧ",
    formMessage: "ಸಂದೇಶ",
    formMiddle: "ಮಧ್ಯಮ ಶಾಲೆ (6-8)",
    formName: "ಪೂರ್ಣ ಹೆಸರು",
    formPhone: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ",
    formPrePrimary: "ಪ್ರಿ-ಪ್ರಾಥಮಿಕ",
    formPrimary: "ಪ್ರಾಥಮಿಕ (1-5)",
    formSelectGrade: "ತರಗತಿ ಆಯ್ಕೆಮಾಡಿ",
    formSelectOption: "ವಿಚಾರಣೆಯ ವಿಧ ಆಯ್ಕೆಮಾಡಿ",
    formSubmit: "ಸಂದೇಶ ಕಳುಹಿಸಿ",
    formTransferInquiry: "ಶಾಲಾ ಬದಲಾವಣೆ",
    galleryLabel: "ಗ್ಯಾಲರಿ",
    galleryTitle: "ನಮ್ಮ ಶಾಲೆಯ ಜೀವನವನ್ನು ಅನ್ವೇಷಿಸಿ",
    heroBtn1: "ಈಗ ನೋಂದಾಯಿಸು",
    heroBtn2: "ಇನ್ನಷ್ಟು ತಿಳಿದುಕೊಳ್ಳಿ",
    heroBtn3: "ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ನೋಡಿ",
    heroBtn4: "ಈಗ ನೋಂದಾಯಿಸು",
    heroBtn5: "ಈಗ ನೋಂದಾಯಿಸು",
    heroBtn6: "ಈಗ ನೋಂದಾಯಿಸು",
    heroSubtitle1:"AI ಆಧಾರಿತ ಕಲಿಕಾ ಕಾರ್ಯಕ್ರಮಗಳು ಎಲ್ಲಾ ತರಗತಿಗಳಿಗಾಗಿ!!",
    heroSubtitle2: "IIT ಮತ್ತು NEET ಫೌಂಡೇಶನ್ ತರಗತಿಗಳು: 8 ರಿಂದ 10ನೇ ತರಗತಿಯ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಸಂಪನ್ಮೂಲ ಮತ್ತು ಅಧ್ಯಯನ ಸಾಮಗ್ರಿ ಲಭ್ಯ",
    heroSubtitle3: "ಬೆಳಗಾವಿಯಲ್ಲಿ 25+ ವರ್ಷಗಳ ಶೈಕ್ಷಣಿಕ ಶ್ರೇಷ್ಠತೆ: ಇಂಗ್ಲಿಷ್ ಮತ್ತು ಕನ್ನಡ ಮಾಧ್ಯಮಗಳು ಹಾಗೂ ITI ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಒಳಗೊಂಡಿದೆ.",
    heroSubtitle4: "ಸಮಗ್ರ ಶಿಕ್ಷಣ: LKG ಯಿಂದ 10ನೇ ತರಗತಿಯವರೆಗೆ ಇಂಗ್ಲಿಷ್ ಮತ್ತು ಕನ್ನಡ ಮಾಧ್ಯಮ ಶಿಕ್ಷಣ, ಜೊತೆಗೆ ITI ವೃತ್ತಿಪರ ತರಬೇತಿ.",
    heroSubtitle5: "ಸಂಪೂರ್ಣ ಅಭಿವೃದ್ಧಿ: ಪಠ್ಯಕ್ರಮ (ಇಂಗ್ಲಿಷ್/ಕನ್ನಡ ಮಾಧ್ಯಮ) • ಕ್ರೀಡೆಗಳು • ಸಾಂಸ್ಕೃತಿಕ ಚಟುವಟಿಕೆಗಳು • ITI ವೃತ್ತಿಪರ ತರಬೇತಿ • ವ್ಯಕ್ತಿತ್ವ ನಿರ್ಮಾಣ.",
    heroSubtitle6: "ಪ್ರಾಯೋಗಿಕ ಕೌಶಲ್ಯ ಅಭಿವೃದ್ಧಿಯ ಮೇಲೆ ಒತ್ತು",
    heroTitle1: "AI ಆಧಾರಿತ ಕಲಿಕೆ",
    heroTitle2: "IIT ಮತ್ತು NEET ಫೌಂಡೇಶನ್",
    heroTitle3: "ಶೈಕ್ಷಣಿಕ ವರ್ಷ 2026-2027 ಗೆ ಪ್ರವೇಶ ತೆರೆದಿದೆ",
    heroTitle4: "2003 ರಿಂದ ರಾಜ್ಯ ಮಂಡಳಿ ಶಿಕ್ಷಣದ ಉತ್ಕೃಷ್ಟತೆ",
    heroTitle5: "ಸಮಗ್ರ ಅಭಿವೃದ್ಧಿ",
    heroTitle6: "ITI ವೃತ್ತಿಪರ ತರಬೇತಿ",
    navAbout: "ನಮ್ಮ ಬಗ್ಗೆ",
    navAcademics: "ಅಧ್ಯಯನ",
    navAdmissions: "ಪ್ರವೇಶ",
    navContact: "ಸಂಪರ್ಕಿಸಿ",
    navHome: "ಮುಖಪುಟ",
    navNews: "ಸುದ್ದಿ ಮತ್ತು ಕಾರ್ಯಕ್ರಮಗಳು",
    news1Conclusion: "ಕಾರ್ಯದಮವು ಪ್ರಶಸ್ತಿ ವಿತರಣೆ ಮತ್ತು ನಮ್ಮ ಪ್ರಾಂಶುಪಾಲರು ಸಮಗ್ರ ಅಭಿವೃದ್ಧಿಯ ಮಹತ್ತವನ್ನು ಒತ್ತಿ ಹೇಳುವ ಸಂದೇಶದೊಂದಿಗೆ ಮುಗಿಯಿತು.",
    news1Date: "ಮಾರ್ಚ್ 15, 2026",
    news1Detail1: "100 ಮೀ, 200 ಮೀ ಮತ್ತು 400 ಮೀ ಸ್ಪ್ರಿಂಟ್ ವಿಜೇತರು",
    news1Detail2: "ಎರಡು ವರ್ಗಗಳಲ್ಲಿಯೂ ರಿಲೇ ರೇಸ್ ಚಾಂಪಿಯನ್ಸ್",
    news1Detail3: "ಲಾಂಂಗ್ ಜಂಪ್ ಮತ್ತು ಹೈ ಜಂಪ್ ಮೆಡಲಿಸ್ಟ್‌ಗಳು",
    news1Detail4: "ಉತ್ತಮ ಪಾಲ್ಗೊಳ್ಳುವಿಕೆಗೆ ತಂಡದ ಆತ್ಮವಿಶ್ವಾಸ ಪ್ರಶಸ್ತಿ",
    news1DetailsTitle: "ಕಾರ್ಯಕ್ರಮ ಸಾರಾಂಶ:",
    news1Text: "ನಮ್ಮ ವಿದ್ಯಾರ್ಥಿಗಳು ಕ್ರೀಡೆಯಲ್ಲಿ ಅಸಾಧಾರಣ ಪ್ರತಿಭೆಯನ್ನು ಪ್ರದರ್ಶಿಸಿದರು, ಅನೇಕ ಪದಕರನ್ನು ಗೆದ್ದು ತಂಡಾತ್ಮಕತೆ ಮತ್ತು ಕ್ರೀಡಾ ಮನೋಭಾವವನ್ನು ತೋರಿಸಿದರು.",
    news1Title: "ವಾರ್ಷಿಕ ಕ್ರೀಡಾ ದಿನ ಯಶಸ್ಸು",
    news2Conclusion: "ಉದ್ಘಾಟನೆ ಸ್ಥಳೀಯ ಶಿಕ್ಷಣ ಅಧಿಕಾರಿಗಳು ಮತ್ತು ಪಾಲಕರು ಹಾಜರಾಗಿದ್ದು, ಡಿಜಿಟಲ್ ಶಿಕ್ಷಣದ ನಾವಿನ್ಯತೆಯತ್ತ ನಮ್ಮ ಬದ್ಧತೆಯ ಮಹತ್ವದ ಹೆಜ್ಜೆಯಾಗಿದೆ.",
    news2Date: "ಮಾರ್ಚ್ 10, 2026",
    news2Detail1: "ತಾಜಾ ಪ್ರೊಸೆಸರ್‌ಗಳೊಂದಿಗೆ 30 ಉನ್ನತ ಕಾರ್ಯಕ್ಷಮತೆ ಕಂಪ್ಯೂಟರ್‌ಗಳು",
    news2Detail2: "ಹೈ-ಸ್ಪೀಡ್ ಇಂಟರ್‍ನೆಟ್ ಸಂಪರ್ಕ",
    news2Detail3: "ಶೈಕ್ಷಣಿಕ ಸಾಫ್ಟ್‌ವೇರ್ ಮತ್ತು ಪ್ರೋಗ್ರಾಮಿಂಗ್ ಸಾಧನಗಳು",
    news2Detail4: "ಇಂಟರ್ಯಾಕ್ಟಿವ್ ವೈಟ್‌ಬೋರ್ಡುಗಳು ಮತ್ತು ಪ್ರೊಜೆಕ್ಟರ್‌ಗಳು",
    news2DetailsTitle: "ಲ್ಯಾಬ್ ವೈಶಿಷ್ಟ್ಯಗಳು:",
    news2Text: "ಅತ್ಯಾಧುನಿಕ ತಂತ್ರಜ್ಞಾನಗಳೊಂದಿಗೆ ಕಂಪ್ಯೂಟರ್ ಲ್ಯಾಬ್ ಉದ್ಘಾಟಿಸಲಾಯಿತು, ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಆಧುನಿಕ ಡಿಜಿಟಲ್ ಕಲಿಕೆ ಸಾಧನಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ.",
    news2Title: "ಹೊಸ ಕಂಪ್ಯೂಟರ್ ಲ್ಯಾಬ್ ಉದ್ಘಾಟನೆ",
    news3Conclusion: "ನಮ್ಮ ವಿದ್ಯಾರ್ಥಿಗಳು ಅತ್ಯುತ್ತಮ ಸೃಜನಶೀಲತೆ ಮತ್ತು ವಿಜ್ಞಾನ ಚಿಂತನೆ ಪ್ರದರ್ಶಿಸಿ, 우리 ಶಾಲೆಗೆ ಹೆಮ್ಮೆ ತಂದರು.",
    news3Date: "ಮಾರ್ಚ್ 5, 2026",
    news3Detail1: "ಪರಿಸರ ವಿಜ್ಞಾನ ವಿಭಾಗದಲ್ಲಿ ಪ್ರಥಮ ಬಹುಮಾನ",
    news3Detail2: "ಭೌತಶಾಸ್ತ್ರ ನವೋದ್ಯಮ ಯೋಜನೆಗೆ ದ್ವಿತೀಯ ಬಹುಮಾನ",
    news3Detail3: "ರಸಾಯನಶಾಸ್ತ್ರ ಪ್ರಯೋಗಗಳಿಗೆ ಮೂರನೆ ಬಹುಮಾನ",
    news3Detail4: "ಸ್ಥಿರ ಶಕ್ತಿ ಯೋಜನೆಗೆ ವಿಶೇಷ ಉಲ್ಲೇಖ",
    news3DetailsTitle: "ಸಾಧನೆಗಳು:",
    news3Text: "ನಮ್ಮ ವಿದ್ಯಾರ್ಥಿಗಳು ಜಿಲ್ಲಾ ಮಟ್ಟದ ವಿಜ್ಞಾನ ಮೇಳದಲ್ಲಿ ಅನೇಕ ಪದಕರನ್ನು ಗೆದ್ದು ಅನ್ವೇಷಣಾತ್ಮಕ ಯೋಜನೆಗಳು ಮತ್ತು ಸಂಶೋಧನೆಯನ್ನು ಪ್ರದರ್ಶಿಸಿದರು.",
    news3Title: "ವಿಜ್ಞಾನ ಮೇಳ ಗೆದ್ದವರು",
    newsLabel: "ಇತ್ತೀಚಿನ ಸುದ್ದಿ",
    newsTitle: "ಶಾಲೆ ನವೀಕರಣಗಳು ಮತ್ತು ಕಾರ್ಯಕ್ರಮಗಳು",
    phone: "ದೂರವಾಣಿ:",
    readMore: "ಇನ್ನಷ್ಟು ಓದಿ →",
    studentWinsTitle: "ವಿದ್ಯಾರ್ಥಿ ಗೆಲುವುಗಳು",
    tab1Label: "ಚೈತನ್ಯ ಶಿಕ್ಷಣದ ಜೀವನ",
    tab2Label: "ಶಿಕ್ಷಕ ಸಿಬ್ಬಂದಿ",
    tab3Label: "ಕ್ಲಾಸ್‌ರೂಮ್ ಕಲಿಕೆ",
    tab4Label: "ಅಧ್ಯಯನ ಸಂಪನ್ಮೂಲಗಳು",
    tab5Label: "ವಿದ್ಯಾರ್ಥಿ ಸಾಧನೆಗಳು",
    tab6Label: "ಕ್ರೀಡಾ ಚಟುವಟಿಕೆಗಳು",
    tab7Label: "ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮಗಳು",
    tab8Label: "ITI ಹಾಗೂ ಉದ್ಯೋಗೋದ್ಯಮ ತರಬೇತಿ",
    tab9Label: "ITI ವಿಶೇಷ ಕಾರ್ಯಕ್ರಮಗಳು",
    testimonial1: "\"ನಾನು ಶ್ರೀ D. S. ಗುಡಿಮನಿ  ಸಾ - ಹಿಡಕಲ್. ತಾ :ರಾಯಬಾಗ.ನನ್ನ ಮಗನಾದ ಕು. ನಿಖಿಲ  ಗುಡಿಮನಿ ಇವನು ತಮ್ಮ ಶಾಲೆಯಲ್ಲಿ 8,9,10 ನೇ ತರಗತಿಯಲ್ಲಿ ಕಲಿತು 2025 - 26 ನೇ ಸಾಲಿನ SSLC ಪರೀಕ್ಷೆಯಲ್ಲಿ 603/625  96.48% ಅಂಕಗಳನ್ನು ಪಡೆದುಕೊಂಡಿದ್ದಾನೆ. ಮಾನ್ಯ ಮುಖ್ಯೋಪಾಧ್ಯಯರು ಹಾಗೂ ಎಲ್ಲ ಶಿಕ್ಷಕರ ಅವಿರತ ಪ್ರಯತ್ನ, ಅವಿಛ್ಘನ್ನ ಮನೋಭಾವ, ನಿಸ್ವಾರ್ಥ ಸೇವೆ, ಎಲ್ಲ ಮಕ್ಕಳು ನಮ್ಮ ಮಕ್ಕಳೆಂದು ತಿಳಿದು ಮಕ್ಕಳ ಶ್ರೇಯೋಭಿವೃದ್ಧಿಗಾಗಿ ತಾವೆಲ್ಲರೂ ಶ್ರಮಿಸಿದ್ದೀರಿ.ಹಾಗಾಗಿ ತಮ್ಮೆಲ್ಲರಿಗೂ ಕೃತಜ್ಞತಾಭಾವದ ಧನ್ಯವಾದಗಳು...🙏🙏🌹🌹\"",
    testimonial2: "\"ಮೇಡಂ,ಇವತ್ತಿನ ಸಾಂಸ್ಕೃತಿಕ ಉತ್ಸವ ತುಂಬಾ ಉತ್ತಮವಾಗಿ ಮೂಡಿಬಂತು. ಉದ್ಘಾಟನಾ ಕಾರ್ಯಕ್ರಮ ದಲ್ಲಿ ವಿದ್ಯಾರ್ಥಿ ಮತ್ತು ಶಿಕ್ಷಕರ ಬಾಂಧವ್ಯ ನೊಡಿ ಕಣ್ಣಂಚಿನಲ್ಲಿ ಕಂಬನಿಯನ್ನು ತಡೆಯದಾದೆ. ಒಂದೆಡೆ ಶಿಕ್ಷಕರು ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಸನ್ಮಾನ ಇನ್ನೊಂದೆಡೆ ಪಾಲಕ - ವಿದ್ಯಾರ್ಥಿಗಳು ಸೇರಿ ಶಿಕ್ಷಕರಿಗೆ ಸನ್ಮಾನ. ಈ ಇಬ್ಬರಲ್ಲೂ ಕ್ರತಜ್ಞತಾ ಭಾವನೆ,ಮೆಚ್ಚುವಂತಹದ್ದು. ನಿಮ್ಮ ಸಂಸ್ಥೆಯ ಬಗ್ಗೆ ಸ್ವಲ್ಪ ಕೆಳಿದ್ದೆ.ಆದರೆ ಇಂದು ಕಣ್ಣಾರೆ ಕಂಡೆ.ತುಂಬಾ ತುಂಬಾ ಧನ್ಯವಾದಗಳು\"",
    testimonial3: "\"ಅಧ್ಯಯನದ ಜೊತೆಗೆ ವ್ಯಕ್ತಿತ್ವ ನಿರ್ಮಾಣದ ಮೇಲಿನ ಶಾಲೆಯ ಒತ್ತು ನಮ್ಮ ಮಗನ ಅಭಿವೃದ್ದಿಗೆ ಮಹತ್ವದ ಪ್ರಭಾವ ಬಿರಿಸಿದೆ. ಶಿಕ್ಷಕರು ಪ್ರತಿ ವಿದ್ಯಾರ್ಥಿಯ ಬೆಳವಣಿಗೆಯನ್ನು ನಿಜವಾಗಿಯೂ ಪರಿಗಣಿಸುತ್ತಾರೆ.\"",
    testimonialsTitle: "ಸಾಕ್ಷ್ಯಗಳು",
    viewAllEvents: "ಎಲ್ಲಾ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ನೋಡಿ",
    whyChoosePoint1: "AI ಆಧಾರಿತ ಕಲಿಕೆ ವೈಯಕ್ತಿಕ AI ಟ್ಯೂಟರ್ ಬೆಂಬಲದೊಂದಿಗೆ",
    whyChoosePoint2: "ಪ್ರಾರಂಭಿಕ ತರಗತಿಗಳಿಂದ IIT ಮತ್ತು NEET ಫೌಂಡೇಶನ್ ಕೋಚಿಂಗ್",
    whyChoosePoint3: "ಅನುಭವಸಂಪನ್ನ ಶಿಕ್ಷಕರು ವೈಯಕ್ತಿಕ ಗಮನದೊಂದಿಗೆ",
    whyChoosePoint4: "ಆಧುನಿಕ ಬೋಧನಾ ವಿಧಾನಗಳೊಂದಿಗೆ ರಾಜ್ಯ ಮಂಡಳಿ ಪಠ್ಯಕ್ರಮ",
    whyChoosePoint5: "ಸಹ-ಪಠ್ಯಕ್ರಮ ಚಟುವಟಿಕೆಗಳು ಮತ್ತು ಕ್ರೀಡೆಗಳ ಮೇಲೆ ಒತ್ತು",
    whyChoosePoint6: "ಸುರಕ್ಷಿತ, ಸುರಕ್ಷಿತ ಮತ್ತು ಪೋಷಕ ಕಲಿಕೆ ವಾತಾವರಣ",
    whyChoosePoint7: "ಪ್ರಾರಂಭಿಕ ತರಗತಿಗಳಿಂದ ಸ್ಪರ್ಧಾತ್ಮಕ ಪರೀಕ್ಷಾ ಕೋಚಿಂಗ್",
    whyChoosePoint8: "ಪ್ರಾಯೋಗಿಕ ITI ಕೌಶಲ್ಯಗಳು ಮತ್ತು ಕೈಯಾರಿಕ ವೃತ್ತಿಪರ ತರಬೇತಿ",
    whyChooseText: "ಚೈತನ್ಯ ಶಿಕ್ಷಣ ಸಂಸ್ಥೆ 2003 ರಿಂದ ಮುದಲಗಿಯಲ್ಲಿ ಗುಣಮಟ್ಟದ ಶಿಕ್ಷಣದ ಆಧಾರಸ್ತಂಭವಾಗಿದೆ. ನಾವು ಸಮಗ್ರ ಅಭಿವೃದ್ಧಿ, ವ್ಯಕ್ತಿತ್ವ ನಿರ್ಮಾಣ ಮತ್ತು ಶೈಕ್ಷಣಿಕ ವಿಜೃಂಭಣೆಯನ್ನು ಒದಗಿಸುತ್ತೇವೆ.",
    whyChooseTitle: "ಚೈತನ್ಯ ಶಿಕ್ಷಣ ಸಂಸ್ಥೆಯನ್ನು ಏಕೆ ಆಯ್ಕೆ ಮಾಡಬೇಕು?",
    win1Desc: "10ನೇ ತರಗತಿಯ ರಾಜ್ಯ ಮಂಡಳಿ ಪರೀಕ್ಷೆಯಲ್ಲಿ ನಮ್ಮ ಸಂಸ್ಥೆಯ ವಿದ್ಯಾರ್ಥಿ ವಿವೇಕ್ ಸುಳ್ಳಣ್ಣವರ 10ನೇ ತರಗತಿ ಬೋರ್ಡ್ ಪರೀಕ್ಷೆಯಲ್ಲಿ ರಾಜ್ಯಕ್ಕೆ 2ನೇ ಶ್ರೇಣಿ (2nd Rank) ಪಡೆದಿದ್ದಾನೆ",
    win1Title: "10ನೇ ತರಗತಿ: ರಾಜ್ಯಕ್ಕೆ 2ನೇ ಸ್ಥಾನ",
    win2Desc: "10ನೇ ತರಗತಿಯ ರಾಜ್ಯ ಮಂಡಳಿ ಪರೀಕ್ಷೆಯಲ್ಲಿ ನಮ್ಮ ಸಂಸ್ಥೆಯ ವಿದ್ಯಾರ್ಥಿನಿ ಸುಚಿತಾ ಬಿ. ಎಸ್. 10ನೇ ತರಗತಿ ಬೋರ್ಡ್ ಪರೀಕ್ಷೆಯಲ್ಲಿ ರಾಜ್ಯಕ್ಕೆ 5ನೇ ಶ್ರೇಣಿ (5th Rank) ಪಡೆದಿದ್ದಾಳೆ",
    win2Title: "10ನೇ ತರಗತಿ: ರಾಜ್ಯಕ್ಕೆ 5ನೇ ಸ್ಥಾನ",
    win3Desc: "10ನೇ ತರಗತಿಯ ರಾಜ್ಯ ಬೋರ್ಡ್ ಪರೀಕ್ಷೆಯಲ್ಲಿ ಅತ್ಯುತ್ತಮ ಸಾಧನೆ: ರಾಜ್ಯ ಮಟ್ಟದ ವಿವಿಧ ಶ್ರೇಣಿಗಳು (2, 5, 7, 8 ಇತ್ಯಾದಿ) ಹಾಗೂ ಶೈಕ್ಷಣಿಕ ಕ್ಷೇತ್ರದಲ್ಲಿ ಅಭೂತಪೂರ್ವ ಯಶಸ್ಸು.",
    win3Title: "10ನೇ ತರಗತಿ: ರಾಜ್ಯ ಮಟ್ಟದ ಶ್ರೇಣಿಗಳ ಸಾಧನಾ ಶಿಖರ",
    win4Desc: "5ನೇ ತರಗತಿ ವಿದ್ಯಾರ್ಥಿಗಳಿಂದ ಅದ್ಭುತ ಪ್ರದರ್ಶನ: ಆಳ್ವಾಸ್, ನವೋದಯ, ಮೊರಾರ್ಜಿ ಮತ್ತು ಸೈನಿಕ ಶಾಲೆಗಳ ಪ್ರವೇಶ ಪರೀಕ್ಷೆಯಲ್ಲಿ ದಾಖಲೆ ಮಟ್ಟದ ಆಯ್ಕೆ.",
    win4Title: "5ನೇ ತರಗತಿ: ಸ್ಪರ್ಧಾತ್ಮಕ ಪರೀಕ್ಷೆಗಳಲ್ಲಿ ಅಪ್ರತಿಮ ಸಾಧನೆ.",
    win5Desc: "ಹಲವಾರು ವಿದ್ಯಾರ್ಥಿಗಳು ಉನ್ನತ ಶ್ರೇಣಿಗಳನ್ನು (ಟಾಪ್ ರ್ಯಾಂಕ್) ಪಡೆಯುವ ಮೂಲಕ ಹಾಗೂ ಪ್ರತಿಷ್ಠಿತ ವೈದ್ಯಕೀಯ ಕಾಲೇಜುಗಳಿಗೆ ಪ್ರವೇಶ ಗಿಟ್ಟಿಸಿಕೊಳ್ಳುವ ಮೂಲಕ, ವೈದ್ಯಕೀಯ ಪ್ರವೇಶ ಪರೀಕ್ಷೆಗಳಲ್ಲಿ ಅತ್ಯುತ್ತಮ ಸಾಧನೆ",
    win5Title: "ನವೋದಯ ಆಯ್ಕೆಗಳು",
    win6Desc: "ಹಲವಾರು ವಿದ್ಯಾರ್ಥಿಗಳು ಉನ್ನತ ಶ್ರೇಣಿಗಳನ್ನು ಪಡೆಯುವ ಮೂಲಕ ಹಾಗೂ ಪ್ರತಿಷ್ಠಿತ ವೈದ್ಯಕೀಯ ಕಾಲೇಜುಗಳಿಗೆ ಪ್ರವೇಶ ಗಿಟ್ಟಿಸಿಕೊಳ್ಳುವ ಮೂಲಕ, ವೈದ್ಯಕೀಯ ಪ್ರವೇಶ ಪರೀಕ್ಷೆಗಳಲ್ಲಿ ಅತ್ಯುತ್ತಮ ಸಾಧನೆ",
    win6Title: "ವೈದ್ಯಕೀಯ ಕ್ಷೇತ್ರದಲ್ಲಿ ಸಾಧನೆ",
    win7Desc: "ಹಲವಾರು ವಿದ್ಯಾರ್ಥಿಗಳು ಉನ್ನತ ಶ್ರೇಣಿಗಳನ್ನು ಮತ್ತು ಶೈಕ್ಷಣಿಕ ಶ್ರೇಷ್ಠತೆಯನ್ನು ಸಾಧಿಸುವ ಮೂಲಕ, ರಾಜ್ಯ ಮಂಡಳಿ ಪರೀಕ್ಷೆಗಳಲ್ಲಿ 100% ತೇರ್ಗಡೆ ಹಾಗೂ ಅತ್ಯುತ್ತಮ ಸಾಧನೆ",
    win7Title: "ಶೈಕ್ಷಣಿಕ ಶ್ರೇಷ್ಠತೆ",
    win8Desc: "ITI ವೃತ್ತಿಪರ ತರಬೇತಿಯಲ್ಲಿ ಅಸಾಧಾರಣ ಸಾಧನೆ: ಕೈಗಾರಿಕಾ ತರಬೇತಿ ಕಾರ್ಯಕ್ರಮಗಳಲ್ಲಿ ನೈಜತೆಯೊಂದಿಗೆ ಪ್ರಾಯೋಗಿಕ ಕೌಶಲ್ಯ ಅಭಿವೃದ್ಧಿ, ಯಶಸ್ವಿ ಉದ್ಯೋಗ ನಿಯೋಜನೆ ಮತ್ತು ಕೈಗಾರಿಕಾ ಮಾನ್ಯತೆ.",
    win8Title: "ITI ವೃತ್ತಿಪರ ಸಾಧನೆ"
  }
};

const heroSlides = [
  {
    img: '/images/logo.jpeg',
    alt: 'AI Based Learning',
    eyebrow: 'AI Based Learning Programs for All Grades!!',
    titleKey: 'heroTitle1',
    subtitleKey: 'heroSubtitle1',
    buttonKey: 'heroBtn1',
    href: '#contact',
    buttonClass: 'btn-primary'
  },
  {
    img: '/images/NEET & JEE Foundations.jpg',
    alt: 'IIT & NEET Foundation',
    eyebrow: '8th to 10th Grade | IIT & NEET Foundation Classes',
    titleKey: 'heroTitle2',
    subtitleKey: 'heroSubtitle2',
    buttonKey: 'heroBtn2',
    href: '#about',
    buttonClass: 'btn-secondary'
  },
  {
    img: '/images/school1.jpeg',
    alt: 'Admissions Open',
    eyebrow: 'English & Kannada Medium | LKG to 10th & ITI',
    titleKey: 'heroTitle3',
    subtitleKey: 'heroSubtitle3',
    buttonKey: 'heroBtn3',
    href: '#programs',
    buttonClass: 'btn-primary'
  },
  {
    img: '/images/school.jpeg',
    alt: 'School Campus',
    eyebrow: 'LKG to 10th | ITI Courses',
    titleKey: 'heroTitle4',
    subtitleKey: 'heroSubtitle4',
    buttonKey: 'heroBtn4',
    href: '#programs',
    buttonClass: 'btn-primary'
  },
  {
    img: '/images/WhatsApp Image 2025-12-23 at 11.33.09 AM.jpeg',
    alt: 'Student Activities',
    eyebrow: 'Dual Medium Education | ITI Vocational Training',
    titleKey: 'heroTitle5',
    subtitleKey: 'heroSubtitle5',
    buttonKey: 'heroBtn5',
    href: '#programs',
    buttonClass: 'btn-primary'
  },
  {
    img: '/images/ITI 3.jpeg',
    alt: 'ITI Vocational Training',
    eyebrow: 'ITI Vocational Training',
    titleKey: 'heroTitle6',
    subtitleKey: 'heroSubtitle6',
    buttonKey: 'heroBtn6',
    href: '#programs',
    buttonClass: 'btn-primary'
  }
];

const studentWins = [
  {
    img: '/images/studentwin1.jpeg',
    alt: 'student Excellence',
    titleKey: 'win1Title',
    descKey: 'win1Desc'
  },
  {
    img: '/images/studentwin2.jpeg',
    alt: 'student Excellence',
    titleKey: 'win2Title',
    descKey: 'win2Desc'
  },
  {
    img: '/images/studentwin3.jpeg',
    alt: 'accademic Excellence',
    titleKey: 'win3Title',
    descKey: 'win3Desc'
  },
  {
    img: '/images/studentwin4.jpeg',
    alt: 'Alumnus Achievements',
    titleKey: 'win4Title',
    descKey: 'win4Desc'
  },
  {
    img: '/images/achiv5.jpeg',
    alt: 'Navodaya Selection',
    titleKey: 'win5Title',
    descKey: 'win5Desc'
  },
  {
    img: '/images/achiv6.jpeg',
    alt: 'Medical Achievements',
    titleKey: 'win6Title',
    descKey: 'win6Desc'
  },
  {
    img: '/images/achiv7.jpeg',
    alt: 'Cultural Achievements',
    titleKey: 'win7Title',
    descKey: 'win7Desc'
  },
  {
    img: '/images/achiv8.jpeg',
    alt: 'Vocational Excellence',
    titleKey: 'win8Title',
    descKey: 'win8Desc'
  }
];

const testimonials = [
  {
    textKey: 'testimonial1',
    author: 'D. S. Gudimani',
    role: 'Parent of PassOut Student',
    img: 'https://via.placeholder.com/60x60?text=Parent'
  },
  {
    textKey: 'testimonial2',
    author: 'Nadishwar Munnolli',
    role: 'Parent of Grade 5 Student',
    img: 'https://via.placeholder.com/60x60?text=Parent'
  },
  {
    textKey: 'testimonial3',
    author: 'Sunita Patel',
    role: 'Parent of Grade 5 Student',
    img: 'https://via.placeholder.com/60x60?text=Parent'
  }
];

const events = [
  {
    img: '/images/republic.jpeg',
    alt: 'Republic Day',
    titleKey: 'event1Title',
    dateKey: 'event1Date',
    descKey: 'event1Desc',
    detailsTitleKey: 'event1DetailsTitle',
    details: ['event1Detail1', 'event1Detail2', 'event1Detail3', 'event1Detail4'],
    linkKey: 'event1Link'
  },
  {
    img: '/images/annual.jpeg',
    alt: 'Annual Day',
    titleKey: 'event2Title',
    dateKey: 'event2Date',
    descKey: 'event2Desc',
    detailsTitleKey: 'event2DetailsTitle',
    details: ['event2Detail1', 'event2Detail2', 'event2Detail3', 'event2Detail4'],
    linkKey: 'event2Link'
  },
  {
    img: '/images/IMG-20241222-WA0005.jpg',
    alt: 'Kannada Rajyotsava',
    titleKey: 'event3Title',
    dateKey: 'event3Date',
    descKey: 'event3Desc',
    detailsTitleKey: 'event3DetailsTitle',
    details: ['event3Detail1', 'event3Detail2', 'event3Detail3', 'event3Detail4'],
    linkKey: 'event3Link'
  }
];

const academics = [
  {
    titleKey: 'academic1Title',
    descKey: 'academic1Desc',
    detailsTitleKey: 'academic1DetailsTitle',
    details: ['academic1Detail1', 'academic1Detail2', 'academic1Detail3', 'academic1Detail4', 'academic1Detail5'],
    durationKey: 'academic1Duration'
  },
  {
    titleKey: 'academic2Title',
    descKey: 'academic2Desc',
    detailsTitleKey: 'academic2DetailsTitle',
    details: ['academic2Detail1', 'academic2Detail2', 'academic2Detail3', 'academic2Detail4', 'academic2Detail5'],
    durationKey: 'academic2Duration'
  },
  {
    titleKey: 'academic3Title',
    descKey: 'academic3Desc',
    detailsTitleKey: 'academic3DetailsTitle',
    details: ['academic3Detail1', 'academic3Detail2', 'academic3Detail3', 'academic3Detail4', 'academic3Detail5'],
    durationKey: 'academic3Duration'
  },
  {
    titleKey: 'academic4Title',
    descKey: 'academic4Desc',
    detailsTitleKey: 'academic4DetailsTitle',
    details: ['academic4Detail1', 'academic4Detail2', 'academic4Detail3', 'academic4Detail4', 'academic4Detail5'],
    durationKey: 'academic4Duration'
  },
  {
    titleKey: 'academic5Title',
    descKey: 'academic5Desc',
    detailsTitleKey: 'academic5DetailsTitle',
    details: ['academic5Detail1', 'academic5Detail2', 'academic5Detail3', 'academic5Detail4', 'academic5Detail5'],
    durationKey: 'academic5Duration'
  }
];

const features = [
  { titleKey: 'feature1Title', descKey: 'feature1Desc' },
  { titleKey: 'feature2Title', descKey: 'feature2Desc' },
  { titleKey: 'feature3Title', descKey: 'feature3Desc' },
  { titleKey: 'feature4Title', descKey: 'feature4Desc' }
];

const newsCards = [
  {
    dateKey: 'news1Date',
    titleKey: 'news1Title',
    textKey: 'news1Text',
    detailsTitleKey: 'news1DetailsTitle',
    details: ['news1Detail1', 'news1Detail2', 'news1Detail3', 'news1Detail4'],
    conclusionKey: 'news1Conclusion'
  },
  {
    dateKey: 'news2Date',
    titleKey: 'news2Title',
    textKey: 'news2Text',
    detailsTitleKey: 'news2DetailsTitle',
    details: ['news2Detail1', 'news2Detail2', 'news2Detail3', 'news2Detail4'],
    conclusionKey: 'news2Conclusion'
  },
  {
    dateKey: 'news3Date',
    titleKey: 'news3Title',
    textKey: 'news3Text',
    detailsTitleKey: 'news3DetailsTitle',
    details: ['news3Detail1', 'news3Detail2', 'news3Detail3', 'news3Detail4'],
    conclusionKey: 'news3Conclusion'
  }
];

// Gallery tabs for the "Explore Our School Life" section.
// Add or replace images here. For local photos, place them in public/images
// and use a URL like '/images/your-photo.jpg'.
// galleryTabs defines the tabs and image sets used in the "Explore Our School Life" gallery.
// Each tab has an id, a translation key for the label, and a list of images to display.
const galleryTabs = [
  {
    id: 1,
    labelKey: 'tab1Label',
    images: [
      { src: '/images/school1.jpeg', alt: 'School Campus View' },
      { src: '/images/school2.jpeg', alt: 'School Building' },
      { src: '/images/school3.jpeg', alt: 'School Grounds' },
      { src: '/images/school4.jpeg', alt: 'School Entrance' },
      { src: '/images/school5.jpeg', alt: 'School Facilities' },
      { src: '/images/school6.jpeg', alt: 'School Environment' }
    ]
  },
  {
    id: 2,
    labelKey: 'tab2Label',
    images: [
      { src: '/images/staff1.jpeg', alt: 'staff' },
      { src: '/images/staff2.jpeg', alt: 'staff room' },
      { src: '/images/staff3.jpeg', alt: 'Chemistry Experiments' },
      { src: '/images/staff4.jpeg', alt: 'Biology Lab' },
      { src: '/images/staff5.jpeg', alt: 'Physics Lab' },
      { src: '/images/staff6.jpeg', alt: 'Lab Safety' }
    ]
  },
  {
    id: 3,
    labelKey: 'tab3Label',
    images: [
      { src: '/images/class1.jpeg', alt: 'Classroom Teaching' },
      { src: '/images/class2.jpeg', alt: 'Student Learning' },
      { src: '/images/class3.jpeg', alt: 'Interactive Class' },
      { src: '/images/class4.jpeg', alt: 'Group Study' },
      { src: '/images/class5.jpeg', alt: 'Digital Learning' },
      { src: '/images/class6.jpeg', alt: 'Teacher and Students' }
    ]
  },
  {
    id: 4,
    labelKey: 'tab4Label',
    images: [
      { src: '/images/StdRes1.jpeg', alt: 'School Library' },
      { src: '/images/NEET & JEE Foundations.jpg', alt: 'Study Resources' },
      { src: '/images/StdRes3.jpeg', alt: 'Books and Materials' },
      { src: '/images/StdRes4.jpeg', alt: 'Computer Lab' },
      { src: '/images/StdRes5.jpeg', alt: 'Digital Resources' },
      { src: '/images/StdRes6.jpeg', alt: 'Study Area' }
    ]
  },
  {
    id: 5,
    labelKey: 'tab5Label',
    images: [
      { src: '/images/studentwin3.jpeg', alt: 'Award Ceremony' },
      { src: '/images/studentwin4.jpeg', alt: 'Student Awards' },
      { src: '/images/achiv3.jpeg', alt: 'Academic Excellence' },
      { src: '/images/achiv4.jpeg', alt: 'Competition Winners' },
      { src: '/images/achiv5.jpeg', alt: 'Scholarships' },
      { src: '/images/achiv6.jpeg', alt: 'Recognition' }
    ]
  },
  {
    id: 6,
    labelKey: 'tab6Label',
    images: [
      { src: '/images/sports1.jpeg', alt: 'Sports Field' },
      { src: '/images/sports2.jpeg', alt: 'Football Match' },
      { src: '/images/sports3.JPG', alt: 'Basketball Game' },
      { src: '/images/sports4.JPG', alt: 'Athletics' },
      { src: '/images/sports5.JPG', alt: 'Sports Day' },
      { src: '/images/sports6.jpeg', alt: 'Team Sports' }
    ]
  },
  {
    id: 7,
    labelKey: 'tab7Label',
    images: [
      // Use public/images for local photos.
      { src: '/images/culture1.JPG', alt: 'Dance Performance' },
      { src: '/images/culture2.JPG', alt: 'Music Program' },
      { src: '/images/culture5.jpeg', alt: 'Drama Club' },
      { src: '/images/culture3.JPG', alt: 'Festival Celebrations' },
      { src: '/images/culture4.jpeg', alt: 'Festival Celebrations' },
      { src: '/images/culture6.JPG', alt: 'Art Exhibition' }
    ]
  },
  {
    id: 8,
    labelKey: 'tab8Label',
    images: [
      { src: '/images/ITI 1.jpeg', alt: 'ITI Workshop' },
      { src: '/images/ITI 2.jpeg', alt: 'Vocational Training' },
      { src: '/images/ITI 3.jpeg', alt: 'Hands-on Practical Training' },
      { src: '/images/ITI 4.jpeg', alt: 'Modern Workshop Facility' },
      { src: '/images/ITI 5.jpeg', alt: 'Skilled Trade Training' },
      { src: '/images/ITI 6.jpeg', alt: 'Industrial Skills Education' }
    ]
  },
  {
    id: 9,
    labelKey: 'tab9Label',
    images: [
      { src: '/images/ITIS1.jpeg', alt: 'ITI Workshop' },
      { src: '/images/ITIS2.jpeg', alt: 'Vocational Training' },
      { src: '/images/ITIS3.jpeg', alt: 'Hands-on Practical Training' },
      { src: '/images/ITIS4.jpeg', alt: 'Modern Workshop Facility' },
      { src: '/images/ITIS5.jpeg', alt: 'Skilled Trade Training' },
      { src: '/images/ITIS6.jpeg', alt: 'Industrial Skills Education' }
    ]
  }
];

const formInquiryOptions = [
  { value: '', labelKey: 'formSelectOption' },
  { value: 'admission', labelKey: 'formAdmissionInquiry' },
  { value: 'fees', labelKey: 'formFeesInquiry' },
  { value: 'curriculum', labelKey: 'formCurriculumInquiry' },
  { value: 'facilities', labelKey: 'formFacilitiesInquiry' },
  { value: 'transfer', labelKey: 'formTransferInquiry' },
  { value: 'general', labelKey: 'formGeneralInquiry' }
];

const gradeOptions = [
  { value: '', labelKey: 'formSelectGrade' },
  { value: 'pre-primary', labelKey: 'formPrePrimary' },
  { value: 'primary', labelKey: 'formPrimary' },
  { value: 'middle', labelKey: 'formMiddle' },
  { value: 'high', labelKey: 'formHigh' },
  { value: 'ITI', labelKey: 'formITI' }
];

const footerLinks = [
  { href: '#about', labelKey: 'footerLink1' },
  { href: '#leadership', labelKey: 'footerLink2' },
  { href: '#facilities', labelKey: 'footerLink3' },
  { href: '#admissions', labelKey: 'footerLink4' }
];

// Flatten all gallery images for the lightbox so navigation can move across all tabs.
const galleryImages = galleryTabs.flatMap((tab) => tab.images);

// Main application component. Renders the full page and handles UI state/events.
function App() {
  // Local component state for menu, language, sliders, gallery, and scroll behavior.

  const [navOpen, setNavOpen] = useState(false);
  const [lang, setLang] = useState('en');
  const [heroIndex, setHeroIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showScroll, setShowScroll] = useState(false);
  const [winsCanScrollLeft, setWinsCanScrollLeft] = useState(false);
  const [winsCanScrollRight, setWinsCanScrollRight] = useState(true);
  const [leadershipCanScrollLeft, setLeadershipCanScrollLeft] = useState(false);
  const [leadershipCanScrollRight, setLeadershipCanScrollRight] = useState(true);
  const [eventsCanScrollLeft, setEventsCanScrollLeft] = useState(false);
  const [eventsCanScrollRight, setEventsCanScrollRight] = useState(true);
  const [academicsCanScrollLeft, setAcademicsCanScrollLeft] = useState(false);
  const [academicsCanScrollRight, setAcademicsCanScrollRight] = useState(true);
  const [newsCanScrollLeft, setNewsCanScrollLeft] = useState(false);
  const [newsCanScrollRight, setNewsCanScrollRight] = useState(true);
  
  // Contact form state
  const [formData, setFormData] = useState({
    inquiryType: '',
    name: '',
    email: '',
    phone: '',
    grade: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const winsRef = useRef(null);
  const leadershipRef = useRef(null);
  const eventsRef = useRef(null);
  const academicsRef = useRef(null);
  const newsRef = useRef(null);

  const setupSlider = (ref, setLeft, setRight) => {
    const container = ref.current;
    if (!container) return () => {};

    const updateButtons = () => {
      setLeft(container.scrollLeft > 20);
      setRight(container.scrollLeft + container.clientWidth < container.scrollWidth - 20);
    };

    updateButtons();
    container.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);

    return () => {
      container.removeEventListener('scroll', updateButtons);
      window.removeEventListener('resize', updateButtons);
    };
  };

  const scrollSection = (ref, cardSelector, direction) => {
    const container = ref.current;
    if (!container) return;

    const card = container.querySelector(cardSelector);
    const offset = card ? card.offsetWidth + 16 : Math.round(container.clientWidth * 0.9);
    container.scrollBy({ left: direction * offset, behavior: 'smooth' });
  };

  // Translation helpers: t() looks up plain text, tHtml() is for HTML-safe content.
  const t = (key) => translations[lang]?.[key] ?? key;
  const tHtml = (key) => ({ __html: t(key) });

  // Hide the loading spinner once the page is fully loaded.
  useEffect(() => {
    const handleLoad = () => {
      const loadingSpinner = document.getElementById('loadingSpinner');
      if (loadingSpinner) {
        loadingSpinner.classList.add('hidden');
        setTimeout(() => {
          loadingSpinner.style.display = 'none';
        }, 300);
      }
      document.body.classList.add('loaded');
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  // Automatically rotate hero slides every 8 seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Track page scroll position to show a back-to-top button or similar UI.
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.pageYOffset > 300);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use IntersectionObserver to animate sections when they enter the viewport.
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('section, .news-card, .academic-card, .event-card, .win-item, .testimonial-item, .image-grid img').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const winsCleanup = setupSlider(winsRef, setWinsCanScrollLeft, setWinsCanScrollRight);
    const leadershipCleanup = setupSlider(leadershipRef, setLeadershipCanScrollLeft, setLeadershipCanScrollRight);
    const eventsCleanup = setupSlider(eventsRef, setEventsCanScrollLeft, setEventsCanScrollRight);
    const academicsCleanup = setupSlider(academicsRef, setAcademicsCanScrollLeft, setAcademicsCanScrollRight);
    const newsCleanup = setupSlider(newsRef, setNewsCanScrollLeft, setNewsCanScrollRight);

    return () => {
      winsCleanup();
      leadershipCleanup();
      eventsCleanup();
      academicsCleanup();
      newsCleanup();
    };
  }, []);

  const scrollWins = (direction) => scrollSection(winsRef, '.win-item', direction);
  const scrollLeadership = (direction) => scrollSection(leadershipRef, '.leadership-card', direction);
  const scrollEvents = (direction) => scrollSection(eventsRef, '.event-card', direction);
  const scrollAcademics = (direction) => scrollSection(academicsRef, '.academic-card', direction);
  const scrollNews = (direction) => scrollSection(newsRef, '.news-card', direction);

  // Smooth scrolling for navigation links; closes the mobile menu after navigation.
  const handleNavLinkClick = (event, targetId) => {
    event.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setNavOpen(false);
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const changeLightbox = (direction) => {
    setLightboxIndex((current) => (current + direction + galleryImages.length) % galleryImages.length);
  };

  // Contact form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('');

    try {
      console.log('Submitting form with data:', formData);
      const API_BASE = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Response result:', result);

      if (result.success) {
        setFormStatus('Thank you! Your message has been sent successfully.');
        setFormData({
          inquiryType: '',
          name: '',
          email: '',
          phone: '',
          grade: '',
          message: ''
        });
      } else {
        setFormStatus('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('Error: ' + error.message + '. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const changeHeroSlide = (direction) => {
    setHeroIndex((current) => (current + direction + heroSlides.length) % heroSlides.length);
  };

  const changeTestimonial = (direction) => {
    setTestimonialIndex((current) => (current + direction + testimonials.length) % testimonials.length);
  };

  const currentGalleryTab = galleryTabs.find((tab) => tab.id === activeTab) ?? galleryTabs[0];
  const heroSlide = heroSlides[heroIndex];

  return (
    <>
      <div className="loading-spinner" id="loadingSpinner">
        <div className="spinner" />
      </div>

      <div className="top-bar">
        <div className="container">
          <div className="social-media">
            <a href="#" className="social-link" aria-label="YouTube">
              <i className="fab fa-youtube" />
            </a>
            <a href="#" className="social-link" aria-label="Facebook">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <i className="fab fa-instagram" />
            </a>
            <a href="https://wa.me/+919880515726" className="social-link" aria-label="WhatsApp">
              <i className="fab fa-whatsapp" />
            </a>
            <a href="tel:+919880515726" className="social-link" aria-label="Phone">
              <i className="fas fa-phone" />
            </a>
          </div>
          <div className="top-contact">
            <a href="tel:+919880515726" className="contact-link">
              KANNADA MEDIUM: +91 9880515726 
            </a>
            <a href="tel:+918123984759" className="contact-link">
              ENGLISH MEDIUM: +91 8123984759 
            </a>
            <a href="tel:+91 9964166679" className="contact-link">
              ITI: +91 99641 66679 
            </a>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <div className="brand-logo">
            <img src="/images/WhatsApp_Image_2026-04-23_at_8.37.48_PM-removebg-preview.png" alt="Chaitanya logo" />
          </div>
          <div className="logo-section">
            <div className="logo">
              <h2>Chaitanya Education Institute</h2>
              <div className="affiliation">State Board Affiliation</div>
            </div>
          </div>

          <nav className={`main-nav ${navOpen ? 'open' : ''}`} id="mainNav">
            <div className="nav-item">
              <a href="#home" onClick={(event) => handleNavLinkClick(event, 'home')}>
                {t('navHome')}
              </a>
            </div>
            <div className="nav-item">
              <a href="#about" onClick={(event) => handleNavLinkClick(event, 'about')}>
                {t('navAbout')}
              </a>
            </div>
            <div className="nav-item">
              <a href="#programs" onClick={(event) => handleNavLinkClick(event, 'programs')}>
                {t('navAcademics')}
              </a>
            </div>
            <div className="nav-item">
              <a href="#admissions" onClick={(event) => handleNavLinkClick(event, 'admissions')}>
                {t('navAdmissions')}
              </a>
            </div>
            <div className="nav-item">
              <a href="#news" onClick={(event) => handleNavLinkClick(event, 'news')}>
                {t('navNews')}
              </a>
            </div>
            <div className="nav-item">
              <a href="#contact" onClick={(event) => handleNavLinkClick(event, 'contact')}>
                {t('navContact')}
              </a>
            </div>
          </nav>

          <div className="language-toggle">
            {['en', 'kn'].map((code) => (
              <button
                key={code}
                type="button"
                className={`lang-btn ${lang === code ? 'active' : ''}`}
                onClick={() => setLang(code)}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            className="nav-toggle"
            id="navToggle"
            aria-label="Toggle navigation"
            onClick={() => setNavOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-slider">
            {heroSlides.map((slide, index) => (
              <div key={slide.titleKey} className={`hero-slide ${index === heroIndex ? 'active' : ''}`}>
                <img src={slide.img} alt={slide.alt} />
                <div className="hero-overlay">
                  <div className="hero-content">
                    <p className="eyebrow">{slide.eyebrow}</p>
                    <h1>{t(slide.titleKey)}</h1>
                    <p>{t(slide.subtitleKey)}</p>
                    <a className={`btn ${slide.buttonClass}`} href={slide.href} onClick={(event) => handleNavLinkClick(event, slide.href.replace('#', ''))}>
                      {t(slide.buttonKey)}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hero-nav">
            <button className="hero-nav-btn prev" aria-label="Previous slide" type="button" onClick={() => changeHeroSlide(-1)}>
              ‹
            </button>
            <button className="hero-nav-btn next" aria-label="Next slide" type="button" onClick={() => changeHeroSlide(1)}>
              ›
            </button>
          </div>
        </section>

        <section className="vision-mission" id="vision">
          <div className="container">
            <h2 className="section-title">{t('visionAndMissionTitle')}</h2>
            <div className="vision-cards">
              <div className="vision-card">
                <h3>{t('visionTitle')}</h3>
                <p>{t('visionText')}</p>
              </div>
              <div className="vision-card">
                <h3>{t('missionTitle')}</h3>
                <p>{t('missionText')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="student-wins">
          <div className="container">
            <h2 className="section-title">{t('studentWinsTitle')}</h2>
            <div className="wins-slider">
              <button
                className="wins-arrow left"
                type="button"
                onClick={() => scrollWins(-1)}
                disabled={!winsCanScrollLeft}
                aria-label="Scroll student wins left"
              >
                ‹
              </button>
              <div className="wins-grid" ref={winsRef}>
                {studentWins.map((win) => (
                  <div key={win.titleKey} className="win-item">
                    <img src={win.img} alt={win.alt} />
                    <div className="win-content">
                      <h3>{t(win.titleKey)}</h3>
                      <p>{t(win.descKey)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="wins-arrow right"
                type="button"
                onClick={() => scrollWins(1)}
                disabled={!winsCanScrollRight}
                aria-label="Scroll student wins right"
              >
                ›
              </button>
            </div>
          </div>
        </section>

        <section className="why-choose" id="about">
          <div className="container">
            <h2 className="section-title">{t('whyChooseTitle')}</h2>
            <div className="why-choose-content">
              <div className="why-choose-text">
                <p>{t('whyChooseText')}</p>
                <ul>
                  {['whyChoosePoint1', 'whyChoosePoint2', 'whyChoosePoint3', 'whyChoosePoint4', 'whyChoosePoint5', 'whyChoosePoint6', 'whyChoosePoint7', 'whyChoosePoint8'].map((key) => (
                    <li key={key}>{t(key)}</li>
                  ))}
                </ul>
              </div>
              <div className="why-choose-image">
                <img src="/images/school.jpeg" alt="School Building" />
              </div>
            </div>
          </div>
        </section>

        <section className="leadership" id="leadership">
          <div className="container">
            <h2 className="section-title">{t('leadershipTitle')}</h2>
            <div className="slider-wrapper leadership-slider">
              <button
                type="button"
                className="slider-btn left-btn"
                onClick={() => scrollLeadership(-1)}
                disabled={!leadershipCanScrollLeft}
                aria-label="Scroll leadership section left"
              >
                ‹
              </button>
              <div className="leadership-grid" ref={leadershipRef}>
                {[
                  {
                    img: '/images/founder.jpg',
                    titleKey: 'founderTitle',
                    nameKey: 'founderName',
                    messageKey: 'founderMessage'
                  },
                  {
                    img: '/images/IMG_20240624_114144.jpg',
                    titleKey: 'chairTitle',
                    nameKey: 'chairName',
                    messageKey: 'chairMessage'
                  },
                  {
                    img: '/images/trustee.jpeg',
                    titleKey: 'trusteeTitle',
                    nameKey: 'trusteeName',
                    messageKey: 'trusteeMessage'
                  },
                  {
                    img: '/images/coordinator.jpeg',
                    titleKey: 'coordinatorTitle',
                    nameKey: 'coordinatorName',
                    messageKey: 'coordinatorMessage'
                  },
                  {
                    img: '/images/academic co-ordinator.jpeg',
                    titleKey: 'academicCoordinatorTitle',
                    nameKey: 'academicCoordinatorName',
                    messageKey: 'academicCoordinatorMessage'
                  },
                  {
                    img: '/images/principal1.jpeg',
                    titleKey: 'principalTitle1',
                    nameKey: 'principalName1',
                    messageKey: 'principalMessage1'
                  },
                  {
                    img: '/images/principal2.jpeg',
                    titleKey: 'principalTitle2',
                    nameKey: 'principalName2',
                    messageKey: 'principalMessage2'
                  },
                  {
                    img: '/images/ITI.jpeg',
                    titleKey: 'principalTitle3',
                    nameKey: 'principalName3',
                    messageKey: 'principalMessage3'
                  }
                  
                ].map((member) => (
                  <div key={member.titleKey} className="leadership-card">
                    <img src={member.img} alt={t(member.titleKey)} />
                    <div className="leader-info">
                      <h4>{t(member.nameKey)}</h4>
                      <span>{t(member.titleKey)}</span>
                    </div>
                    <p>{t(member.messageKey)}</p>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="slider-btn right-btn"
                onClick={() => scrollLeadership(1)}
                disabled={!leadershipCanScrollRight}
                aria-label="Scroll leadership section right"
              >
                ›
              </button>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <div className="container">
            <h2 className="section-title">{t('testimonialsTitle')}</h2>
            <div className="testimonials-slider">
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.textKey} className={`testimonial-item ${index === testimonialIndex ? 'active' : ''}`}>
                  <div className="testimonial-content">
                    <p>{t(testimonial.textKey)}</p>
                    <div className="testimonial-author">
                      <img src={testimonial.img} alt="Parent" />
                      <div>
                        <h4>{testimonial.author}</h4>
                        <span>{testimonial.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="testimonial-nav">
              <button type="button" className="testimonial-btn prev" aria-label="Previous testimonial" onClick={() => changeTestimonial(-1)}>
                ‹
              </button>
              <div className="testimonial-dots">
                {testimonials.map((_, index) => (
                  <span key={index} className={`dot ${index === testimonialIndex ? 'active' : ''}`} onClick={() => setTestimonialIndex(index)} />
                ))}
              </div>
              <button type="button" className="testimonial-btn next" aria-label="Next testimonial" onClick={() => changeTestimonial(1)}>
                ›
              </button>
            </div>
          </div>
        </section>

        <section className="events-gallery" id="news">
          <div className="container">
            <h2 className="section-title">{t('eventsTitle')}</h2>
            <div className="slider-wrapper events-slider">
              <button
                type="button"
                className="slider-btn left-btn"
                onClick={() => scrollEvents(-1)}
                disabled={!eventsCanScrollLeft}
                aria-label="Scroll events section left"
              >
                ‹
              </button>
              <div className="events-grid" ref={eventsRef}>
                {events.map((event) => (
                  <div key={event.titleKey} className="event-card expandable">
                    <div className="card-header">
                      <img src={event.img} alt={event.alt} />
                      <div className="event-content">
                        <h3>{t(event.titleKey)}</h3>
                        <p className="event-date">{t(event.dateKey)}</p>
                      </div>
                    </div>
                    <div className="card-content">
                      <p>{t(event.descKey)}</p>
                      <div className="event-details">
                        <h4>{t(event.detailsTitleKey)}</h4>
                        <ul>
                          {event.details.map((detail) => (
                            <li key={detail}>{t(detail)}</li>
                          ))}
                        </ul>
                        <a href="#gallery" className="event-link" onClick={(event) => handleNavLinkClick(event, 'gallery')}>
                          {t(event.linkKey)}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="slider-btn right-btn"
                onClick={() => scrollEvents(1)}
                disabled={!eventsCanScrollRight}
                aria-label="Scroll events section right"
              >
                ›
              </button>
            </div>
            <div className="view-all">
              <a className="btn btn-secondary" href="#gallery" onClick={(event) => handleNavLinkClick(event, 'gallery')}>
                {t('viewAllEvents')}
              </a>
            </div>
          </div>
        </section>

        <section className="academics" id="programs">
          <div className="container">
            <h2 className="section-title">{t('academicsTitle')}</h2>
            <div className="slider-wrapper academics-slider">
              <button
                type="button"
                className="slider-btn left-btn"
                onClick={() => scrollAcademics(-1)}
                disabled={!academicsCanScrollLeft}
                aria-label="Scroll academics section left"
              >
                ‹
              </button>
              <div className="academics-grid" ref={academicsRef}>
                {academics.map((program) => (
                  <div key={program.titleKey} className="academic-card expandable">
                    <div className="card-header">
                      <h3>{t(program.titleKey)}</h3>
                    </div>
                    <div className="card-content">
                      <p>{t(program.descKey)}</p>
                      <div className="program-details">
                        <h4>{t(program.detailsTitleKey)}</h4>
                        <ul>
                          {program.details.map((detail) => (
                            <li key={detail}>{t(detail)}</li>
                          ))}
                        </ul>
                        <p className="program-duration" dangerouslySetInnerHTML={tHtml(program.durationKey)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="slider-btn right-btn"
                onClick={() => scrollAcademics(1)}
                disabled={!academicsCanScrollRight}
                aria-label="Scroll academics section right"
              >
                ›
              </button>
            </div>
            <div className="academic-features">
              {features.map((feature) => (
                <div key={feature.titleKey} className="feature-item">
                  <h4>{t(feature.titleKey)}</h4>
                  <p>{t(feature.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="news" id="news">
          <div className="container">
            <div className="section-header">
              <span className="section-label">{t('newsLabel')}</span>
              <h2>{t('newsTitle')}</h2>
            </div>
            <div className="slider-wrapper news-slider">
              <button
                type="button"
                className="slider-btn left-btn"
                onClick={() => scrollNews(-1)}
                disabled={!newsCanScrollLeft}
                aria-label="Scroll news section left"
              >
                ‹
              </button>
              <div className="news-grid" ref={newsRef}>
                {newsCards.map((item) => (
                  <article key={item.titleKey} className="news-card expandable">
                    <div className="card-header">
                      <div className="news-date">{t(item.dateKey)}</div>
                      <h3>{t(item.titleKey)}</h3>
                    </div>
                    <div className="card-content">
                      <p>{t(item.textKey)}</p>
                      <div className="news-details">
                        <h4>{t(item.detailsTitleKey)}</h4>
                        <ul>
                          {item.details.map((detail) => (
                            <li key={detail}>{t(detail)}</li>
                          ))}
                        </ul>
                        <p>{t(item.conclusionKey)}</p>
                      </div>
                      <a href="#news" className="news-link" onClick={(event) => handleNavLinkClick(event, 'news')}>
                        {t('readMore')}
                      </a>
                    </div>
                  </article>
                ))}
              </div>
              <button
                type="button"
                className="slider-btn right-btn"
                onClick={() => scrollNews(1)}
                disabled={!newsCanScrollRight}
                aria-label="Scroll news section right"
              >
                ›
              </button>
            </div>
          </div>
        </section>

        <section className="gallery" id="gallery">
          <div className="container">
            <div className="section-header">
              <span className="section-label">{t('galleryLabel')}</span>
              <h2>{t('galleryTitle')}</h2>
            </div>
            <div className="tabs">
              {galleryTabs.map((tab) => (
                <Fragment key={`tab-${tab.id}`}>
                  <input
                    type="radio"
                    id={`tab${tab.id}`}
                    name="tab"
                    checked={activeTab === tab.id}
                    onChange={() => setActiveTab(tab.id)}
                  />
                  <label htmlFor={`tab${tab.id}`}>{t(tab.labelKey)}</label>
                </Fragment>
              ))}
              <div className="tab-content">
                {galleryTabs.map((tab) => (
                  <div key={`panel-${tab.id}`} className={`tab-panel ${activeTab === tab.id ? 'active' : ''}`} id={`panel${tab.id}`}>
                    <div className="image-grid">
                      {tab.images.map((item, index) => {
                        const imageIndex = galleryImages.findIndex((img) => img.src === item.src && img.alt === item.alt);
                        return (
                          <img
                            key={item.src}
                            src={item.src}
                            alt={item.alt}
                            onClick={() => openLightbox(imageIndex)}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="admissions" id="admissions">
          <div className="container admissions-grid">
            <div className="admissions-card">
              <h2 className="section-title">{t('admissionsTitle')}</h2>
              <p>{t('admissionsText')}</p>
              <p>{t('admissionsContact')}</p>
              <ul>
                <li><strong>{t('phone')}</strong> +91 98805 15726 (Kannada medium) / +91 81239 84759 (English medium) / +91 99641 66679 (ITI)</li>
                <li><strong>{t('email')}</strong> chaitnyaschool97@gmail.com</li>
              </ul>
            </div>
            <div className="admissions-card">
              <h3>{t('formAdmissionInquiry')}</h3>
              <p>{t('contactText')}</p>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="container contact-grid">
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <span className="section-label">{t('contactLabel')}</span>
              <label>
                <span>{t('formInquiryType')}</span>
                <select name="inquiryType" value={formData.inquiryType} onChange={handleInputChange} required>
                  <option value="">{t('formSelectOption')}</option>
                  {formInquiryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {t(option.labelKey)}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>{t('formName')}</span>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name" 
                  required 
                />
              </label>
              <label>
                <span>{t('formEmail')}</span>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com (optional)" 
                />
              </label>
              <label>
                <span>{t('formPhone')}</span>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 XXXXX XXXXX" 
                  pattern="[0-9]{10}" 
                />
              </label>
              <label>
                <span>{t('formGrade')}</span>
                <select name="grade" value={formData.grade} onChange={handleInputChange}>
                  <option value="">{t('formSelectGrade')}</option>
                  {gradeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {t(option.labelKey)}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>{t('formMessage')}</span>
                <textarea 
                  name="message" 
                  rows="5" 
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="How can we help? (optional)"  
                />
              </label>
              <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : t('formSubmit')}
              </button>
              {formStatus && (
                <div className={`form-status ${formStatus.includes('Error') ? 'error' : 'success'}`}>
                  {formStatus}
                </div>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>{t('footerLinksTitle')}</h3>
              <ul>
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} onClick={(event) => handleNavLinkClick(event, link.href.replace('#', ''))}>
                      {t(link.labelKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-section">
              <h3>{t('footerContactTitle')}</h3>
              <p>
                <strong>{t('footerAddressLabel')}</strong>
                <br />
                {t('footerAddress')}
              </p>
              <p>
                <strong>{t('footerPhoneLabel')}</strong>
                <br />
                {t('footerPhone1')}
                <br />
                {t('footerPhone2')}
                <br />
                {t('footerPhone3')}
              </p>
              <p>
                <strong>{t('footerEmailLabel')}</strong>
                <br />
                {t('footerEmail1')}
                <br />
                {t('footerEmail2')}
              </p>
            </div>
            <div className="footer-section">
              <h3>{t('footerHoursTitle')}</h3>
              <p>{t('footerHours1')}</p>
              <p>{t('footerHours2')}</p>
              <p>{t('footerHours3')}</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p dangerouslySetInnerHTML={tHtml('footerCopyright')} />
            <p>{t('footerTagline')}</p>
          </div>
        </div>
      </footer>

      <button
        className={`scroll-to-top ${showScroll ? 'visible' : ''}`}
        id="scrollToTop"
        type="button"
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </button>

      <div className={`lightbox ${lightboxOpen ? 'open' : ''}`} id="lightbox" onClick={closeLightbox}>
        <span className="lightbox-close" onClick={closeLightbox}>
          &times;
        </span>
        <img
          className="lightbox-content"
          id="lightboxImg"
          src={galleryImages[lightboxIndex]?.src}
          alt={galleryImages[lightboxIndex]?.alt || ''}
          onClick={(event) => event.stopPropagation()}
        />
        <div className="lightbox-caption" id="lightboxCaption">
          {galleryImages[lightboxIndex]?.alt}
        </div>
        <button className="lightbox-prev" type="button" onClick={(event) => { event.stopPropagation(); changeLightbox(-1); }}>
          &#10094;
        </button>
        <button className="lightbox-next" type="button" onClick={(event) => { event.stopPropagation(); changeLightbox(1); }}>
          &#10095;
        </button>
      </div>
    </>
  );
}

export default App;
