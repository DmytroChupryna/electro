'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import PageWrapper, { Section, Heading, Text } from '@/components/PageWrapper';
import { MapPin, ArrowLeft, Calendar, Flag, Building2, Factory, Home, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { CMSProject, ProjectCategory } from '@/lib/payload';
import { useState } from 'react';

const categoryIcons: Record<ProjectCategory, typeof Building2> = {
  industrial: Factory,
  commercial: Building2,
  residential: Home,
};

interface ProjectDetailClientProps {
  project: CMSProject;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const t = useTranslations('Portfolio');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const Icon = categoryIcons[project.category] || Building2;
  const allImages = [project.image, ...(project.gallery || [])].filter(Boolean);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  return (
    <PageWrapper>
      {/* Back Navigation */}
      <Section variant="primary" className="py-6">
        <div className="container mx-auto px-4 lg:px-8">
          <Link 
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('viewAll')}
          </Link>
        </div>
      </Section>

      {/* Hero Image */}
      <Section variant="secondary" className="py-0">
        <div className="container mx-auto px-4 lg:px-8">
          <div 
            className="relative overflow-hidden cursor-pointer group rounded-3xl shadow-2xl shadow-orange-100/50 ring-1 ring-slate-200"
            onClick={() => openLightbox(0)}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-[50vh] md:h-[60vh] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
            
            {/* Badges */}
            <div className="absolute top-6 left-6 flex gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-white/95 backdrop-blur-md text-slate-800 shadow-lg shadow-slate-900/10">
                <Icon className="w-4 h-4 text-orange-500" />
                {t(`categories.${project.category}`)}
              </span>
            </div>
            <div className="absolute top-6 right-6">
              <span className="px-4 py-2 text-sm font-medium rounded-full bg-orange-500 text-white shadow-lg shadow-orange-500/30">
                {project.year}
              </span>
            </div>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">{project.title}</h2>
              <div className="flex items-center gap-4 mt-3 text-white/90">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {project.location}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/60" />
                <span>{project.country === 'BE' ? 'Belgium' : 'Poland'}</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Project Details */}
      <Section variant="primary" className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-12 -mt-20 relative z-10 border border-slate-100">
            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-3 bg-gradient-to-br from-orange-50 to-amber-50 px-5 py-3 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Location</p>
                  <p className="font-semibold text-slate-800">{project.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gradient-to-br from-slate-50 to-slate-100 px-5 py-3 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Year</p>
                  <p className="font-semibold text-slate-800">{project.year}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gradient-to-br from-orange-50 to-amber-50 px-5 py-3 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
                  <Flag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Country</p>
                  <p className="font-semibold text-slate-800">{project.country === 'BE' ? 'Belgium' : 'Poland'}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <Text variant="body" className="text-lg leading-relaxed text-slate-600">
              {project.description}
            </Text>
          </div>
        </div>
      </Section>

      {/* Gallery */}
      {allImages.length > 1 && (
        <Section variant="secondary" className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <Heading level={2} className="mb-8">{t('gallery')}</Heading>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allImages.map((img, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden cursor-pointer group aspect-square rounded-2xl"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={img}
                    alt={`${project.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center bg-white/50">
                    <span className="text-sm font-medium text-slate-900">View</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* CTA */}
      <Section variant="accent" className="py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <Heading level={2} className="mb-4 text-white">{t('interestedCta')}</Heading>
          <Text variant="body" className="mb-8 text-white/80 max-w-2xl mx-auto">
            {t('interestedCtaDescription')}
          </Text>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-full bg-white text-orange-600 hover:shadow-lg transition-all"
          >
            {t('getQuote')}
          </Link>
        </div>
      </Section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={closeLightbox}>
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-6 right-6 text-white hover:text-orange-400 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          
          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-6 text-white hover:text-orange-400 transition-colors"
              >
                <ChevronLeft className="w-12 h-12" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-6 text-white hover:text-orange-400 transition-colors"
              >
                <ChevronRight className="w-12 h-12" />
              </button>
            </>
          )}
          
          <img
            src={allImages[currentImageIndex]}
            alt={`${project.title} - Image ${currentImageIndex + 1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm">
            {currentImageIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
