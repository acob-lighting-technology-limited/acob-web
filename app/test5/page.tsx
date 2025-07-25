import { KenBurnsImageLoader } from '@/components/loader/ken-burns-image-loader'
import { LinearProgressLoader } from '@/components/loader/linear-progress-loader'
import { MaskedTextLoader } from '@/components/loader/masked-text-loader'
import { SpinnerLogoLoader } from '@/components/loader/spinner-logo-loader'
import React from 'react'

const page = () => {
  return (
    <div><SpinnerLogoLoader/></div>
  )
}

export default page