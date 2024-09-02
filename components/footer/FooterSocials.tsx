import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';

import Link from 'next/link';

function FooterSocials() {
  return (
    <div className='w-[90%] flex items-center justify-between mt-12 gap-28'>
      <div className='flex flex-col items-start gap-y-6 border border-gray-600 rounded-xl px-4 py-2 w-full'>
        <p className='text-lg'>გამოგვყევით სოციალურ ქსელებზე</p>
        <div className='flex w-full gap-8'>
          <FacebookIcon fontSize='large' />
          <LinkedInIcon fontSize='large' />
          <XIcon fontSize='large' />
          <InstagramIcon fontSize='large' />
        </div>
      </div>
      <div className='flex flex-col w-full items-start gap-y-4'>
        <div className='flex border border-gray-600 rounded-xl px-4 py-2 w-full'>
          <Link href={"/"}>
            Terms and Condition
          </Link>
        </div>
        <div className='flex border border-gray-600 rounded-xl px-4 py-2 w-full'>
          <Link href={"/"}>
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FooterSocials;