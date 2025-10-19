import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const InfoModal = ({ isOpen, onClose, title, imageSrc, children, ctaLink, ctaText = "Learn More" }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        
        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all duration-200 shadow-md"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>

          {/* Image Section */}
          {imageSrc && (
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={imageSrc}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}

          {/* Content Section */}
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-archivo">
              {title}
            </h2>
            
            <div className="text-gray-700 leading-relaxed mb-6">
              {children}
            </div>

            {/* CTA Button */}
            {ctaLink && (
              <div className="flex justify-center">
                <a
                  href={ctaLink}
                  className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {ctaText}
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InfoModal;
