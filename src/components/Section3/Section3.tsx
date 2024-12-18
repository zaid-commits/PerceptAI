// import DeveloperFeatures from './developer-features'
import GettingStartedGuide from './getting-started-guide'
import PerformanceMetrics from './performance-metrics'
import DataVisualization from './DataVisualization'
// import ComputerVisionPlayground from './PlayGround'
import { InteractiveModelViewer } from './InteractiveModelViewer'
function Section3() {
  return (
    <div>
      <GettingStartedGuide />
      <DataVisualization />
      <PerformanceMetrics />
      {/* <DeveloperFeatures /> */}
      {/* <ComputerVisionPlayground /> */}
      <div>
        {window.innerWidth > 768 && <InteractiveModelViewer />}
      </div>
    </div>
  )
}

export default Section3
