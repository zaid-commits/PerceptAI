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
    detection: 'https://videos.ctfassets.net/zi2yef4nw297/6iLyQuUsxpjyk2ijhpKu4X/76c7b2ccdb7e3fac49bd19f262ce2ab4/Home_Video_August_3.mp4',
    tracking: 'https://cdn.prod.website-files.com/5f6bc60e665f54545a1e52a5%2F66de5e8c8945e61eaf09620e_walking-trace-and-corner-and-mask%20(1)%20(2)-transcode.mp4',
    counting: 'https://cdn.prod.website-files.com/5f6bc60e665f54545a1e52a5%2F66cc83e20f0b4116036ea1b0_candy-1-transcode.mp4',
    analysis: 'https://cdn.prod.website-files.com/5f6bc60e665f54545a1e52a5%2F66de5f2568b2ea306911ab8f_supervision-0190-promo%20%281%29%20%281%29-transcode.mp4'
  } 
}: VideoTabsProps) {
  const [activeTab, setActiveTab] = useState('detection')

  return (
    <Card className="w-full max-w-4xl mx-auto bg-black border-none">
      <CardContent className="p-6">
        <Tabs 
          defaultValue="detection" 
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-4 bg-black text-white">
            <TabsTrigger 
              value="detection" 
              className={`relative ${activeTab === 'detection' ? 'bg-black text-white' : ''}`}
            >
              Detection
              {activeTab === 'detection' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-white"></div>}
            </TabsTrigger>
            <TabsTrigger 
              value="tracking" 
              className={`relative ${activeTab === 'tracking' ? 'bg-black text-white' : ''}`}
            >
              Tracking
              {activeTab === 'tracking' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-white"></div>}
            </TabsTrigger>
            <TabsTrigger 
              value="counting" 
              className={`relative ${activeTab === 'counting' ? 'bg-black text-white' : ''}`}
            >
              Counting
              {activeTab === 'counting' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-white"></div>}
            </TabsTrigger>
            <TabsTrigger 
              value="analysis" 
              className={`relative ${activeTab === 'analysis' ? 'bg-black text-white' : ''}`}
            >
              Analysis
              {activeTab === 'analysis' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-white"></div>}
            </TabsTrigger>
          </TabsList>
          <div className="mt-6 aspect-video relative rounded-lg overflow-hidden bg-muted ">
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
