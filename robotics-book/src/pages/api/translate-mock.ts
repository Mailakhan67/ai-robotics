// Mock translation API endpoint
import type { NextApiRequest, NextApiResponse } from 'next';

// Simple English to Urdu mapping for demonstration
const englishToUrduMap: Record<string, string> = {
  'Physical AI & Humanoid Robotics': 'فزکل ای آئی اور ہیومنوائڈ روبوٹکس',
  'A comprehensive course on building intelligent physical systems': 'انٹلیجینٹ فزکل سسٹمز بنانے پر ایک جامع کورس',
  'Introduction': 'تعارف',
  'Course': 'کورس',
  'GitHub': 'گِٹ ہب',
  'Foundations': 'بنیادیں',
  'Module': 'ماڈیول',
  'Assessments': 'جائزے',
  'Hardware': 'ہارڈ ویئر',
  'Introduction to Physical AI': 'فزکل ای آئی کا تعارف',
  'Embodied Intelligence': 'مادی انٹلیجنس',
  'Humanoid Landscape': 'ہیومنوائڈ لینڈ سکیپ',
  'Sensor Systems': 'سینسر سسٹمز',
  'The Robotic Nervous System': 'روبوٹک نروسسسٹم',
  'ROS2 Overview': 'ROS2 کا جائزہ',
  'Nodes, Topics, Services': 'نودز، ٹوپکس، سروسز',
  'Python ROS2': 'پائی تھون ROS2',
  'URDF Humanoids': 'URDF ہیومنوائڈز',
  'Launch Files': 'لاؤنچ فائلیں',
  'The Digital Twin': 'ڈیجیٹل ٹوئن',
  'Gazebo Setup': 'گزیبو سیٹ اپ',
  'Physics Simulation': 'فزکس سیمولیشن',
  'Unity Rendering': 'یونٹی رینڈرنگ',
  'Sensor Simulation': 'سینسر سیمولیشن',
  'URDF SDF': 'URDF SDF',
  'The AI-Robot Brain': 'ای آئی - روبوٹ براہین',
  'Isaac Sim': 'آئیساک سیم',
  'Synthetic Data': 'مصنوعی ڈیٹا',
  'Isaac ROS': 'آئیساک ROS',
  'VSLAM Navigation': 'VSLAM نیویگیشن',
  'Nav2 Bipedal': 'Nav2 بائی پیڈل',
  'Reinforcement Learning': 'ریفورسمنٹ لرننگ',
  'Vision-Language-Action': 'وژن - لینگویج - ایکشن',
  'Voice to Action': 'وائس ٹو ایکشن',
  'LLM Robotics': 'LLM روبوٹکس',
  'Cognitive Planning': 'کوگنیٹو پلاننگ',
  'Humanoid Kinematics': 'ہیومنوائڈ کنیمیٹکس',
  'Bipedal Locomotion': 'بائی پیڈل لوکوموشن',
  'Manipulation Grasping': 'مینیپولیشن گریسنگ',
  'HRI Design': 'HRI ڈیزائن',
  'Capstone Project': 'کیپ اسٹون پروجیکٹ',
  'Workstation Requirements': 'ورک اسٹیشن کی ضروریات',
  'Edge Computing': 'ایج کمپیوٹنگ',
  'Robot Lab Options': 'روبوٹ لیب آپشنز',
  'Cloud vs On-Premise': 'کلاؤڈ vs آن پریمائز',
  'ROS2 Project': 'ROS2 پروجیکٹ',
  'Gazebo Implementation': 'گزیبو ایمپلیمنٹیشن',
  'Isaac Perception': 'آئیساک پر سیپشن',
  'Capstone': 'کیپ اسٹون',
  'Welcome to the Physical AI & Humanoid Robotics Course': 'فزکل ای آئی اور ہیومنوائڈ روبوٹکس کورس میں خوش آمدید',
  'This course provides a comprehensive introduction': 'یہ کورس ایک جامع تعارف فراہم کرتا ہے',
  'to building intelligent physical systems': 'انٹلیجینٹ فزکل سسٹمز بنانے کے',
  'that can perceive, reason, and act': 'جو سمجھ سکتے ہیں، سوچ سکتے ہیں، اور کام کر سکتے ہیں',
  'in the real world': 'حقیقی دنیا میں',
  'Physical': 'فزکل',
  'AI': 'ای آئی',
  'Humanoid': 'ہیومنوائڈ',
  'Robotics': 'روبوٹکس',
  'Weeks': 'ہفتوں',
  'Assessment': 'جائزہ',
  'Project': 'پروجیکٹ',
  'Implementation': 'ایمپلیمنٹیشن',
  'Perception': 'پر سیپشن',
  'Design': 'ڈیزائن',
  'Requirements': 'ضروریات',
  'Options': 'آپشنز',
  'Computing': 'کمپیوٹنگ',
  'Overview': 'جائزہ',
  'Systems': 'سسٹمز',
  'Landscape': 'لینڈ سکیپ',
  'Intelligence': 'انٹلیجنس',
  'Nervous': 'نروس',
  'Digital': 'ڈیجیٹل',
  'Twin': 'ٹوئن',
  'Simulation': 'سیمولیشن',
  'Rendering': 'رینڈرنگ',
  'AI-Robot': 'ای آئی - روبوٹ',
  'Navigation': 'نیویگیشن',
  'Learning': 'لرننگ',
  'Vision': 'وژن',
  'Language': 'لینگویج',
  'Action': 'ایکشن',
  'Voice': 'وائس',
  'Cognitive': 'کوگنیٹو',
  'Kinematics': 'کنیمیٹکس',
  'Locomotion': 'لوکوموشن',
  'Manipulation': 'مینیپولیشن',
  'Grasping': 'گریسنگ',
  'HRI': 'HRI',
  'Workstation': 'ورک اسٹیشن',
  'Edge': 'ایج',
  'Lab': 'لیب',
  'Cloud': 'کلاؤڈ',
  'On-Premise': 'آن پریمائز',
  'Capstone': 'کیپ اسٹون',
  'Welcome': 'خوش آمدید',
  'This': 'یہ',
  'course': 'کورس',
  'provides': 'فراہم کرتا ہے',
  'comprehensive': 'جامع',
  'introduction': 'تعارف',
  'building': 'بنانے',
  'intelligent': 'انٹلیجینٹ',
  'physical': 'فزکل',
  'systems': 'سسٹمز',
  'that': 'جو',
  'can': 'کر سکتے',
  'perceive': 'سمجھ سکتے',
  'reason': 'سوچ سکتے',
  'and': 'اور',
  'act': 'کام کر سکتے',
  'in': 'میں',
  'the': 'کے',
  'real': 'حقیقی',
  'world': 'دنیا',
  'Home': 'ہوم',
  'Sign Up': 'سائن اپ',
  'Log In': 'لاگ ان',
  'About This Course': 'اس کورس کے بارے میں',
  'License': 'لائسنس',
  'Resources': 'وسائل',
  'Discussion Forum': 'بحث فورم',
  'About': 'کے بارے میں',
  'Content': 'مواد',
  'Course Content': 'کورس کا مواد',
  'Introduction': 'تعارف',
  'Foundations': 'بنیادیں',
  'Module 1': 'ماڈیول 1',
  'Module 2': 'ماڈیول 2',
  'Module 3': 'ماڈیول 3',
  'Module 4': 'ماڈیول 4',
  'Hardware & Infrastructure': 'ہارڈ ویئر اور انفراسٹرکچر',
  'Assessments': 'جائزے',
  'Search': 'تلاش',
  'Switch to English': 'انگریزی پر سوئچ کریں',
  'Switch to Urdu': 'اردو پر سوئچ کریں',
  'English': 'انگریزی',
  'Urdu': 'اردو',
  'Please log in to use the translation feature': 'ترجمہ کی خصوصیت استعمال کرنے کے لیے براہ کرم لاگ ان کریں',
  'Translating...': 'ترجمہ ہو رہا ہے...',
  'Translating content...': 'مواد کا ترجمہ ہو رہا ہے...',
};

export default function handler(req: NextApiRequest, Response: NextApiResponse) {
  if (req.method !== 'POST') {
    return Response.status(405).json({ error: 'Method not allowed' });
  }

  const { content, target_language, source_language } = req.body;

  if (!content || !target_language) {
    return Response.status(400).json({ error: 'Content and target language are required' });
  }

  let translated_content = content;

  // Simple translation based on predefined mappings
  if (target_language === 'ur' && source_language === 'en') {
    // English to Urdu translation
    translated_content = content.split(' ').map(word => {
      // Check if the full phrase exists in the map
      if (englishToUrduMap[word]) {
        return englishToUrduMap[word];
      }
      // If not found, return the original word
      return word;
    }).join(' ');
  } else if (target_language === 'en' && source_language === 'ur') {
    // Urdu to English translation (reverse mapping)
    const urduToEnglishMap: Record<string, string> = {};
    Object.entries(englishToUrduMap).forEach(([en, ur]) => {
      urduToEnglishMap[ur] = en;
    });

    translated_content = content.split(' ').map(word => {
      if (urduToEnglishMap[word]) {
        return urduToEnglishMap[word];
      }
      return word;
    }).join(' ');
  }

  // In a real implementation, this would call an actual translation API
  // For now, we're returning the content as is or with simple word replacements

  Response.status(200).json({
    translated_content: translated_content,
    source_language: source_language,
    target_language: target_language,
  });
}