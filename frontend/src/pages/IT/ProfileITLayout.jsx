import React, { Fragment } from 'react'
import Header from '../../Component/IT/header/Header'

export default function ProfileITLayout({ Children }) {
  return (
    <Fragment>
        <Header />
        {Children}
    </Fragment>
  )
}
