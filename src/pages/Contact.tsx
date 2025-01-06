'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import Header from '../components/Header'
import { EMAILJS_CONFIG, type EmailTemplateParams } from '../config/email'

export default function Contact() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 50;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          phone: formData.phone,
          message: formData.message,
        } as EmailTemplateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      )

      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      console.error('Error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="bg-white relative h-screen">
      <Header 
        isScrolled={isScrolled} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen}
      />
      
      <section className="pt-28 md:pt-48 lg:pt-32 px-8 md:px-12 lg:px-16 flex flex-col items-center justify-center">
        <motion.h1 
          className="text-2xl md:text-3xl lg:text-3xl font-light mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Let’s bring your vision to life! 
        </motion.h1>
        
        <motion.p 
          className="text-md md:text-lg lg:text-xl font-light max-w-5xl mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Share your dream project with us, and together, we’ll craft a space that speaks your style and story.
        </motion.p>

        <motion.form 
          onSubmit={handleSubmit}
          className="w-full max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full px-0 py-4 border-b border-black/20 focus:border-[#FF4D4D] bg-transparent outline-none transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full px-0 py-4 border-b border-black/20 focus:border-[#FF4D4D] bg-transparent outline-none transition-colors"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-0 py-4 border-b border-black/20 focus:border-[#FF4D4D] bg-transparent outline-none transition-colors"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <textarea
                placeholder="Tell us about your vision"
                required
                rows={3}
                className="w-full px-0 py-4 border-b border-black/20 focus:border-[#FF4D4D] bg-transparent outline-none transition-colors resize-none"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <div className="flex justify-center pt-6">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`bg-terra text-white px-12 py-4 text-sm tracking-wider hover:bg-terra/90 transition-colors flex items-center gap-3 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                {!isSubmitting && (
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M22 2L11 13"/>
                    <path d="M22 2L15 22L11 13L2 9L22 2z"/>
                  </svg>
                )}
              </motion.button>
            </div>
          </div>
        </motion.form>
      </section>

      {submitStatus === 'success' && (
        <motion.p 
          className="text-green-600 mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          We got your message. We’ll be in touch soon. <br/>Exciting ideas are on the way!
        </motion.p>
      )}
      {submitStatus === 'error' && (
        <motion.p 
          className="text-red-600 mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Uh oh! Please try again.
        </motion.p>
      )}
    </main>
  )
} 