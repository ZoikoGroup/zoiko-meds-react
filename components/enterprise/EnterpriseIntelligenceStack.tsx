import React from 'react';
import { TiChartLine } from 'react-icons/ti';
import { MdSettings } from 'react-icons/md';
import { FaBook } from 'react-icons/fa';

export default function IntelligenceStack() {
  return (
    <div className="min-h-screen bg-[#F9F9FF]" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header Section */}
      <section className="w-full py-20 px-6 bg-[#F9F9FF]">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Title - Header Typography */}
          <h1
            className="font-bold mb-8"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '48px',
              fontWeight: 700,
              lineHeight: '56px',
              letterSpacing: '-0.96px',
              color: '#000615',
            }}
          >
            The Intelligence Stack
          </h1>
          {/* Subtitle - Body Typography */}
          <p
            className="max-w-3xl mx-auto"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '24px',
              letterSpacing: '0px',
              color: '#44474D',
            }}
          >
            A modular infrastructure designed for absolute visibility and governance at every layer of the pharmaceutical supply chain.
          </p>
        </div>
      </section>

      {/* Main Content Section - Using Flexbox */}
      <section className="w-full px-6 py-12 ">
        <div className="max-w-6xl mx-auto">
          {/* Top Row - Intelligence Delivery & ZoikoSignal */}
          <div className="flex flex-col lg:flex-row gap-12 mb-10">
            {/* Left Column - Intelligence Delivery Title */}
            <div className="flex-1 flex flex-col justify-center">
              <h2
                className="font-bold mb-3"
                style={{
                     fontFamily: 'Inter, sans-serif',
                        fontSize: '24px',
                        fontWeight: 600,
                        lineHeight: '32px',
                        letterSpacing: '0px',
                        color: '#000615',
                }}
              >
                Intelligence Delivery
              </h2>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '24px',
                  letterSpacing: '0px',
                  color: '#44474D',
                }}
              >
                Real-time predictive analytics and institutional dashboards.
              </p>
            </div>

            {/* Right Column - ZoikoSignal Card */}
            <div className="flex-1">
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  {/* Icon Container */}
                  <div className="bg-slate-900  rounded-lg p-3 flex-shrink-0 flex items-center justify-center w-12 h-12">
                    <TiChartLine size={24} className="text-white" />
                  </div>
                  {/* Card Title and Link */}
                  <div className="flex-1 flex items-center justify-between gap-4">
                    <h3
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '24px',
                        fontWeight: 600,
                        lineHeight: '32px',
                        letterSpacing: '0px',
                        color: '#000615',
                      }}
                    >
                      ZoikoSignal™
                    </h3>
                    <a
                      href="#"
                      className="flex-shrink-0 hover:opacity-80 transition-opacity"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '16px',
                        fontWeight: 700,
                        lineHeight: '24px',
                        letterSpacing: '0px',
                        color: '#006A65',
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Explore ZoikoSignal →
                    </a>
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '24px',
                    letterSpacing: '0px',
                    color: '#44474D',
                  }}
                >
                  Advanced analytics layer for predicting shortages and monitoring global medicine movement trends.
                </p>
              </div>
            </div>
          </div>

          {/* Middle Row - ZoikoAvail API & Availability API */}
          <div className="flex flex-col lg:flex-row gap-12 mb-10">
            {/* Left Column - ZoikoAvail API Card */}
            <div className="flex-1">
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  {/* Icon Container */}
                  <div className="bg-teal-600 rounded-lg p-3 flex-shrink-0 flex items-center justify-center w-12 h-12">
                    <MdSettings size={24} className="text-white" />
                  </div>
                  {/* Card Title and Link */}
                  <div className="flex-1 flex items-center justify-between gap-4">
                    <h3
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '24px',
                        fontWeight: 600,
                        lineHeight: '32px',
                        letterSpacing: '0px',
                        color: '#000615',
                      }}
                    >
                      ZoikoAvail™ API
                    </h3>
                    <a
                      href="#"
                      className="flex-shrink-0 hover:opacity-80 transition-opacity"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '16px',
                        fontWeight: 700,
                        lineHeight: '24px',
                        letterSpacing: '0px',
                        color: '#006A65',
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Discuss API Access →
                    </a>
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '24px',
                    letterSpacing: '0px',
                    color: '#44474D',
                  }}
                >
                  The unified access layer for querying real-time inventory and regulatory compliance status across markets.
                </p>
              </div>
            </div>

            {/* Right Column - Availability API Text */}
            <div className="flex-1 flex flex-col justify-center">
              <h2
                className="font-bold mb-3"
                style={{
                    fontFamily: 'Inter, sans-serif',
                        fontSize: '24px',
                        fontWeight: 600,
                        lineHeight: '32px',
                        letterSpacing: '0px',
                        color: '#000615',
                }}
              >
                Availability API
              </h2>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '24px',
                  letterSpacing: '0px',
                  color: '#44474D',
                }}
              >
                Connect directly to thousands of verified availability points.
              </p>
            </div>
          </div>

          {/* Bottom Row - Core Substrate & MediBase */}
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Column - Core Substrate Title */}
            <div className="flex-1 flex flex-col justify-center">
              <h2
                className="font-bold mb-3"
                style={{
                     fontFamily: 'Inter, sans-serif',
                        fontSize: '24px',
                        fontWeight: 600,
                        lineHeight: '32px',
                        letterSpacing: '0px',
                        color: '#000615',
                }}
              >
                Core Substrate
              </h2>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '24px',
                  letterSpacing: '0px',
                  color: '#44474D',
                }}
              >
                The source-of-truth for pharmaceutical identifiers and data.
              </p>
            </div>

            {/* Right Column - MediBase Card */}
            <div className="flex-1">
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  {/* Icon Container */}
                  <div className="bg-teal-700 rounded-lg p-3 flex-shrink-0 flex items-center justify-center w-12 h-12">
                    <FaBook size={20} className="text-white" />
                  </div>
                  {/* Card Title and Link */}
                  <div className="flex-1 flex items-center justify-between gap-4">
                    <h3
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '24px',
                        fontWeight: 600,
                        lineHeight: '32px',
                        letterSpacing: '0px',
                        color: '#000615',
                      }}
                    >
                      MediBase™
                    </h3>
                    <a
                      href="#"
                      className="flex-shrink-0 hover:opacity-80 transition-opacity"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '16px',
                        fontWeight: 700,
                        lineHeight: '24px',
                        letterSpacing: '0px',
                        color: '#006A65',
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Explore MediBase →
                    </a>
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '24px',
                    letterSpacing: '0px',
                    color: '#44474D',
                  }}
                >
                  The underlying data substrate containing millions of normalized medicine records and verified manufacturers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}