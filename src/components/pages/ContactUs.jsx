import React, { useState } from 'react';
import {
  User, Mail, MessageSquare, Phone, MapPin, Send,
  CheckCircle, Loader, Clock, Truck,
  Facebook, Twitter, Instagram, ChevronDown, Info
} from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    newsletter: false
  });

  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const [activeTab, setActiveTab] = useState('contact');
  const [activeFaq, setActiveFaq] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, success: false, error: null });

    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitStatus({ loading: false, success: true, error: null });

      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          newsletter: false
        });
        setSubmitStatus({ loading: false, success: false, error: null });
      }, 3000);
    }, 1500);
  };

  const companyInfo = {
    name: "Amazons Enterprises",
    address: "Bidii House - New Sunrise, Maseno - Kenya",
    phone1: "0715 080 432",
    phone2: "0702 026 544",
    email: "sales@amazons.co.ke",
    hours: "Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 4:00 PM",
    socialMedia: [
      { name: "Facebook", url: "https://facebook.com", icon: Facebook },
      { name: "Twitter", url: "https://twitter.com", icon: Twitter },
      { name: "Instagram", url: "https://instagram.com", icon: Instagram }
    ]
  };

  const faqs = [
    {
      question: "How do I track my order?",
      answer: "You can track your order by visiting our Order Tracking page and entering your order ID or phone number that you provided during checkout."
    },
    {
      question: "What payment methods do you accept?",
      answer: "Currently, we only accept Cash on Delivery (COD) as our payment method. We plan to add more payment options in the future."
    },
    {
      question: "How long does delivery take?",
      answer: "Delivery typically takes 24-48 hours for areas within Nairobi and surrounding regions. For other areas, delivery may take 2-5 business days."
    },
    {
      question: "Can I cancel my order?",
      answer: "Yes, you can cancel your order within 2 hours of placing it. Please contact our customer service team immediately."
    },
    {
      question: "Do you offer gas cylinder exchange?",
      answer: "Yes, we offer cylinder exchange services. You can trade in your empty cylinder for a filled one at a reduced price."
    }
  ];

  const ContactTabContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="dark:bg-gray-800 bg-white p-6 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-orange-600/10">
          <h2 className="text-2xl font-bold mb-6 text-orange-400 flex items-center dark:text-orange-300">
            <Info className="mr-2" size={24} />
            Contact Information
          </h2>
          <div className="space-y-6">
            <ContactInfoItem
              icon={<MapPin className="text-orange-400 dark:text-orange-300" size={22} />}
              title="Our Location"
              content={companyInfo.address}
            />
            <ContactInfoItem
              icon={<Phone className="text-orange-400 dark:text-orange-300" size={22} />}
              title="Phone Numbers"
              content={[companyInfo.phone1, companyInfo.phone2]}
            />
            <ContactInfoItem
              icon={<Mail className="text-orange-400 dark:text-orange-300" size={22} />}
              title="Email Address"
              content={companyInfo.email}
              isEmail={true}
            />
            <ContactInfoItem
              icon={<Clock className="text-orange-400 dark:text-orange-300" size={22} />}
              title="Business Hours"
              content={companyInfo.hours}
            />
          </div>
          <div className="mt-8 pt-6 border-t dark:border-gray-700 border-gray-300">
            <h3 className="text-lg font-semibold mb-4 dark:text-gray-200">Connect With Us</h3>
            <div className="flex space-x-4">
              {companyInfo.socialMedia.map((platform, index) => {
                const SocialIcon = platform.icon;
                return (
                  <a
                    key={index}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-xl bg-orange-700 hover:bg-orange-600 transform hover:scale-105 transition-all duration-300"
                    aria-label={platform.name}
                  >
                    <SocialIcon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-2">
        <div className="dark:bg-gray-800 bg-white p-8 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-orange-600/10">
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-300 dark:border-gray-700 pb-4 dark:text-gray-200">Send Us a Message</h2>
          {submitStatus.success ? (
            <div className="bg-green-900 bg-opacity-30 rounded-xl p-8 text-center border border-green-700 animate-fadeIn">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-800 bg-opacity-50 mb-4">
                <CheckCircle className="text-green-400" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-green-400 mb-3">Message Sent Successfully!</h3>
              <p className="text-gray-300 text-lg">Thank you for reaching out. Our team will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  id="name"
                  name="name"
                  label="Full Name"
                  type="text"
                  placeholder="Your full name"
                  icon={<User size={18} />}
                  value={formData.name}
                  onChange={handleChange}
                  required={true}
                />
                <FormField
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="your.email@example.com"
                  icon={<Mail size={18} />}
                  value={formData.email}
                  onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  id="phone"
                  name="phone"
                  label="Phone Number (Optional)"
                  type="tel"
                  placeholder="07XX XXX XXX"
                  icon={<Phone size={18} />}
                  value={formData.phone}
                  onChange={handleChange}
                />
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2" htmlFor="subject">
                    Subject
                  </label>
                  <div className="relative">
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pl-12 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                      required
                    >
                      <option value="">Select a topic</option>
                      <option value="order">Order Inquiry</option>
                      <option value="product">Product Information</option>
                      <option value="delivery">Delivery Question</option>
                      <option value="complaint">Complaint</option>
                      <option value="other">Other</option>
                    </select>
                    <MessageSquare className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={18} />
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none" size={18} />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2" htmlFor="message">
                  Your Message
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-12 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                    rows="5"
                    placeholder="How can we help you today?"
                    required
                  ></textarea>
                  <MessageSquare className="absolute left-4 top-5 text-gray-500 dark:text-gray-400" size={18} />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center">
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      id="newsletter"
                      name="newsletter"
                      type="checkbox"
                      checked={formData.newsletter}
                      onChange={handleChange}
                      className="absolute block w-6 h-6 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-full appearance-none cursor-pointer checked:right-0 checked:border-orange-500 transition-all duration-300 focus:outline-none"
                    />
                    <label
                      htmlFor="newsletter"
                      className="block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer"
                    ></label>
                  </div>
                  <label htmlFor="newsletter" className="block text-sm text-gray-700 dark:text-gray-400">
                    Subscribe to our newsletter
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={submitStatus.loading}
                  className={`px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white font-medium rounded-xl shadow-lg hover:shadow-orange-600/30 transform hover:translate-y-1 transition-all duration-300 flex items-center ${
                    submitStatus.loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {submitStatus.loading ? (
                    <>
                      <Loader className="animate-spin mr-2" size={18} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2" size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
        <div className="mt-8 dark:bg-gray-800 bg-white border border-gray-300 dark:border-gray-700 rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-orange-600/10 h-64 group">
          <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 dark:bg-gray-900 opacity-60"></div>
            <div className="absolute inset-0 bg-[url('https://i.ibb.co/b5TV3S5R/logo-1.png')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="text-center text-gray-800 dark:text-gray-200 relative z-10">
              <div className="dark:bg-gray-800 bg-gray-300 bg-opacity-70 p-4 rounded-xl backdrop-blur-sm">
                <MapPin className="mx-auto mb-2 text-orange-400 dark:text-orange-300" size={32} />
                <p className="font-medium">Find Us at Bidii House, Maseno</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Click for directions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const FaqTabContent = () => (
    <div className="max-w-3xl mx-auto">
      <div className="dark:bg-gray-800 bg-white p-8 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-orange-600/10">
        <h2 className="text-2xl font-bold mb-8 text-center border-b border-gray-300 dark:border-gray-700 pb-4 dark:text-gray-200">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-orange-600/10"
            >
              <button
                className="w-full flex justify-between items-center p-5 bg-gray-100 dark:bg-gray-800 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 text-left"
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                aria-expanded={activeFaq === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">{faq.question}</h3>
                <ChevronDown
                  className={`ml-6 flex-shrink-0 text-orange-400 dark:text-orange-300 transition-transform duration-300 ${activeFaq === index ? 'transform rotate-180' : ''}`}
                  size={20}
                />
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  activeFaq === index
                    ? 'max-h-60 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 border-t border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-900">
                  <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-gray-300 dark:border-gray-700 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Didn't find what you're looking for?</p>
          <button
            onClick={() => setActiveTab('contact')}
            className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white font-medium rounded-xl shadow-lg hover:shadow-orange-600/30 transform hover:translate-y-1 transition-all duration-300"
          >
            Contact Our Support Team
          </button>
        </div>
      </div>
    </div>
  );

  const AboutTabContent = () => (
    <div className="max-w-4xl mx-auto">
      <div className="dark:bg-gray-800 bg-white p-8 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-orange-600/10">
        <h2 className="text-2xl font-bold mb-6 text-center border-b border-gray-300 dark:border-gray-700 pb-4 dark:text-gray-200">About Amazons Enterprises</h2>
        <div className="mb-8">
          <div className="w-full h-64 bg-gray-300 dark:bg-gray-700 rounded-xl mb-6 flex items-center justify-center overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-60 z-10"></div>
            <img src="https://i.ibb.co/b5TV3S5R/logo-1.png" alt="Amazons Enterprises" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <h3 className="text-3xl font-bold text-white">Amazons Enterprises</h3>
              <p className="text-gray-300">Established 2018</p>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg">
            Amazons Enterprises is a leading provider of gas solutions and electronics in Kisumu.
            We have grown to become one of the most trusted suppliers of various gas brands
            including K-gas, Men-gas, Pro-gas, Lake-gas, and more.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Our mission is to provide reliable, safe, and affordable energy and electronic solutions to our customers.
            We pride ourselves on our commitment to quality, customer satisfaction, and prompt delivery services.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Based in Maseno, Kenya, we serve customers across the region with our wide range of products
            including gas cylinders, gas accessories, and quality electronics.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CompanyFeature
            icon={<CheckCircle className="text-orange-400 dark:text-orange-300" size={24} />}
            title="Quality Products"
            description="We offer only genuine and high-quality products from trusted brands."
          />
          <CompanyFeature
            icon={<Truck className="text-orange-400 dark:text-orange-300" size={24} />}
            title="Fast Delivery"
            description="We ensure prompt delivery to your doorstep with our efficient logistics."
          />
          <CompanyFeature
            icon={<Phone className="text-orange-400 dark:text-orange-300" size={24} />}
            title="Customer Support"
            description="Our dedicated support team is available to assist you with any inquiries."
          />
        </div>
        <div className="mt-10 pt-6 border-t border-gray-300 dark:border-gray-700 text-center">
          <button
            onClick={() => setActiveTab('contact')}
            className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white font-medium rounded-xl shadow-lg hover:shadow-orange-600/30 transform hover:translate-y-1 transition-all duration-300"
          >
            Get In Touch With Us
          </button>
        </div>
      </div>
    </div>
  );

  const TabButton = ({ id, label, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`py-3 px-8 rounded-xl font-medium transition-all duration-300 ${
        active
          ? 'bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg transform scale-105'
          : 'text-gray-700 dark:text-gray-400 hover:text-white hover:bg-gray-300 dark:hover:bg-gray-700'
      }`}
      aria-selected={active}
      role="tab"
    >
      {label}
    </button>
  );

  const ContactInfoItem = ({ icon, title, content, isEmail }) => (
    <div className="flex items-start group">
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-orange-900 bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300">
          {icon}
        </div>
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-orange-400 dark:group-hover:text-orange-300 transition-colors duration-300">{title}</h3>
        {Array.isArray(content) ? (
          content.map((item, index) => (
            <p key={index} className="text-gray-600 dark:text-gray-400 mt-1 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
              {isEmail ? (
                <a href={`mailto:${item}`} className="hover:text-orange-400 dark:hover:text-orange-300 transition-colors duration-300">{item}</a>
              ) : (
                item
              )}
            </p>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400 mt-1 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
            {isEmail ? (
              <a href={`mailto:${content}`} className="hover:text-orange-400 dark:hover:text-orange-300 transition-colors duration-300">{content}</a>
            ) : (
              content
            )}
          </p>
        )}
      </div>
    </div>
  );

  const FormField = ({ id, name, label, type, placeholder, icon, value, onChange, required }) => (
    <div>
      <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 pl-12 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
          placeholder={placeholder}
          required={required}
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
          {icon}
        </div>
      </div>
    </div>
  );

  const CompanyFeature = ({ icon, title, description }) => (
    <div className="bg-gray-200 dark:bg-gray-900 bg-opacity-50 rounded-xl p-6 border border-gray-300 dark:border-gray-700 shadow-lg transform hover:translate-y-1 transition-all duration-300 hover:shadow-orange-600/10">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-orange-900 bg-opacity-40 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-orange-400 dark:text-orange-300">{title}</h3>
      <p className="text-gray-700 dark:text-gray-400">{description}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-12 px-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoLTZ2LTZoNnptLTYtMTJ2Nmg2di02aC02em0tMTIgMTJ2Nmg2di02aC02em02IDZ2Nmg2di02aC02em0tNi0xMnY2aDZ2LTZoLTZ6bS0xMiA2djZoNnYtNmgtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30 z-0 pointer-events-none"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-300">Get In Touch</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Have questions about our products or services? Need help with an order?
            Our team is here to help you with anything you need.
          </p>
          <div className="flex justify-center mt-8">
            <div className="inline-flex bg-gray-300 dark:bg-gray-800 rounded-2xl p-2 shadow-xl">
              <TabButton
                id="contact"
                label="Contact Us"
                active={activeTab === 'contact'}
                onClick={setActiveTab}
              />
              <TabButton
                id="faq"
                label="FAQs"
                active={activeTab === 'faq'}
                onClick={setActiveTab}
              />
              <TabButton
                id="about"
                label="About Us"
                active={activeTab === 'about'}
                onClick={setActiveTab}
              />
            </div>
          </div>
        </div>
        <div className="transition-all duration-500">
          {activeTab === 'contact' && <ContactTabContent />}
          {activeTab === 'faq' && <FaqTabContent />}
          {activeTab === 'about' && <AboutTabContent />}
        </div>
        <div className="mt-16 bg-gradient-to-r from-orange-900 to-orange-600 rounded-2xl p-8 shadow-2xl border border-orange-700 transform transition-all duration-300 hover:shadow-orange-600/30">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Need Immediate Assistance?</h3>
              <p className="text-orange-200">Our customer support team is ready to help you</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${companyInfo.phone1.replace(/\s/g, '')}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-orange-900 font-medium rounded-xl hover:bg-gray-100 transition-colors shadow-lg hover:shadow-white/20 transform hover:translate-y-1 transition-all duration-300"
              >
                <Phone className="mr-2" size={18} />
                Call Us Now
              </a>
              <a
                href={`https://wa.me/${companyInfo.phone1.replace(/\s/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors shadow-lg hover:shadow-green-600/30 transform hover:translate-y-1 transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
        
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ContactUs;
