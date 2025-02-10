import { Collapse, Typography } from 'antd';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FAQItem, faqMapping } from '@/utils/faqData';
const FAQ = () => {
    const location = useLocation();
    const [currentFAQs, setCurrentFAQs] = useState<FAQItem[]>([]);
    const [activeTitle, setActiveTitle] = useState<string>("Bankify FAQ")
    useEffect(() => {
        const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
        if (pathSegments.length === 0) {
            setCurrentFAQs(faqMapping.home);
            return;
          }
          const category = pathSegments[0].toLowerCase();
          setActiveTitle(category);
        const faqs = faqMapping[category];
        if (faqs) {
          setCurrentFAQs(faqs);
        } else {
          setCurrentFAQs(faqMapping.home);
        }
      }, [location.pathname]);
    return (
        
        <>
            <Typography.Title level={4} style={{textTransform:"capitalize"}}>{activeTitle}</Typography.Title>
            <Collapse accordion items={currentFAQs} />
        </>
    );
};

export default FAQ;