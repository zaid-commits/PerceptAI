'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

interface VideoTabsProps {
  videos?: {
    detection: string;
    tracking: string;
    counting: string;
    analysis: string;
  }
}

export default function VideoTab({ 
  videos = {
    detection: 'https://cdn.prod.website-files.com/5f6bc60e665f54545a1e52a5%2F66de5f2568b2ea306911ab8f_supervision-0190-promo%20%281%29%20%281%29-transcode.mp4',
    tracking: 'https://cdn.prod.website-files.com/5f6bc60e665f54545a1e52a5%2F66de5f2568b2ea306911ab8f_supervision-0190-promo%20%281%29%20%281%29-transcode.mp4',
    counting: 'https://cdn.prod.website-files.com/5f6bc60e665f54545a1e52a5%2F66de5f2568b2ea306911ab8f_supervision-0190-promo%20%281%29%20%281%29-transcode.mp4',
    analysis: 'https://cdn.prod.website-files.com/5f6bc60e665f54545a1e52a5%2F66de5f2568b2ea306911ab8f_supervision-0190-promo%20%281%29%20%281%29-transcode.mp4'
  } 
}: VideoTabsProps) {
  const [activeTab, setActiveTab] = useState('detection')

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <Tabs 
          defaultValue="detection" 
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="detection">Detection</TabsTrigger>
            <TabsTrigger value="tracking">Tracking</TabsTrigger>
            <TabsTrigger value="counting">Counting</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>
          <div className="mt-6 aspect-video relative rounded-lg overflow-hidden bg-muted">
            <TabsContent value="detection">
              <video
                key={`detection-${activeTab === 'detection'}`}
                className="w-full h-full object-cover"
                autoPlay={activeTab === 'detection'}
                loop
                muted
              >
                <source src={videos.detection} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </TabsContent>
            <TabsContent value="tracking">
              <video
                key={`tracking-${activeTab === 'tracking'}`}
                className="w-full h-full object-cover"
                autoPlay={activeTab === 'tracking'}
                loop
                muted
              >
                <source src={videos.tracking} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </TabsContent>
            <TabsContent value="counting">
              <video
                key={`counting-${activeTab === 'counting'}`}
                className="w-full h-full object-cover"
                autoPlay={activeTab === 'counting'}
                loop
                muted
                controls
              >
                <source src={videos.counting} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </TabsContent>
            <TabsContent value="analysis">
              <video
                key={`analysis-${activeTab === 'analysis'}`}
                className="w-full h-full object-cover"
                autoPlay={activeTab === 'analysis'}
                loop
                muted
              >
                <source src={videos.analysis} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}

