// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Path: public/uploads/filename
  const uploadDir = path.join(process.cwd(), 'public/uploads');
  const filePath = path.join(uploadDir, file.name);

  fs.writeFileSync(filePath, buffer);

  return NextResponse.json({ url: `/uploads/${file.name}` });
}

// image upload handler 
import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const uploadDir = path.join(process.cwd(), 'app/uploads', category)
    const filename = `${Date.now()}-${file.name}`
    
    await writeFile(path.join(uploadDir, filename), buffer)

    return NextResponse.json({ 
      success: true,
      path: `/uploads/${category}/${filename}` 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}

//  Image Component with Fallback
import Image from 'next/image'
import { useState } from 'react'

interface ResponsiveImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
}

export default function ResponsiveImage({
  src,
  alt,
  className,
  width = 400,
  height = 300
}: ResponsiveImageProps) {
  const [error, setError] = useState(false)

  return (
    <Image
      src={error ? '/static/defaults/placeholder.png' : src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setError(true)}
      loading="lazy"
    />
  )
}

//  Configuration for Image Optimization
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.NEXT_PUBLIC_DOMAIN],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vehiculars.ng',
        pathname: '/uploads/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  async headers() {
    return [
      {
        source: '/uploads/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

// usage 
import ResponsiveImage from '@/components/ui/ResponsiveImage'

export default function VehiclePage() {
  return (
    <div>
      <ResponsiveImage
        src="/uploads/vehicles/user-car-123.jpg"
        alt="User's vehicle"
        width={800}
        height={600}
      />
    </div>
  )
}