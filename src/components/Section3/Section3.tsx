import React from 'react'
import DeveloperFeatures from './developer-features'
import GettingStartedGuide from './getting-started-guide'
import PerformanceMetrics from './performance-metrics'
import DataVisualization from './DataVisualization'

function Section3() {
  return (
    <div>
      <GettingStartedGuide />
      <DataVisualization />
      <PerformanceMetrics />
      <DeveloperFeatures />
    </div>
  )
}

export default Section3
