'use client';
import { ReactLenis } from 'lenis/react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { JSX } from 'react';


export default function index(): JSX.Element {
  return (
    <ReactLenis root>
      <main>
        <article>
          

          <section className='bg-[#007cbf] text-white grid place-content-center h-screen sticky top-0 rounded-tr-2xl rounded-tl-2xl overflow-hidden'>
            <div className='absolute bottom-0 left-0 right-0 top-0 '>
              <div className='flex justify-center p-20'>
                <Image src={'/tiplink_4.webp'} alt={'Tiplink Pic'} width={650} height={650} />
                <div className=' justify-center content-center'>
                  <div className='flex pb-5'>
                    <div className='outline-none rounded-2xl bg-sky-500 font-bold p-3'>TIPLINK WALLET</div>
                  </div>
                  <h1 className='text-6xl font-bold pb-5'>The world's simplest wallet</h1>
                  <h3 className='text-xl pb-5'>Create or login to your secured TipLink wallet with just 2 clicks:</h3>
                    <button 
                      className='flex justify-between items-center font-bold rounded-2xl bg-white text-[#007cbf] py-2 px-5'
                      onClick={() => {
                        signIn()
                      }}
                    > <Image src={'/google_logo.png'} alt={'Google'} width={30} height={30} /> Continue via Google</button>
                </div>
              </div>
            </div>
          </section>
          <section className='text-white  h-screen  w-full bg-[#66b0d9]  grid place-content-center sticky top-0 rounded-tr-2xl rounded-tl-2xl'>
            <div className='absolute bottom-0 left-0 right-0 top-0 '>
              <div className='flex justify-center p-20'>
                <div className=' justify-center content-center'>
                  <div className='flex pb-5'>
                    <div className='outline-none rounded-2xl bg-sky-500 font-bold p-3'>TIPLINK PRO</div>
                  </div>
                  <h1 className='text-6xl font-bold pb-5'>Send digital assets at scale, even to non-crypto users</h1>
                  <h3 className='text-xl pb-5'>TipLink makes distributing digital assets as simple as clicking a link.</h3>
                    <button 
                      className='flex justify-between items-center font-bold rounded-2xl bg-white text-[#007cbf] py-2 px-5'
                      onClick={() => {
                        signIn()
                      }}
                    > <Image src={'/google_logo.png'} alt={'Google'} width={30} height={30} /> Continue via Google</button>
                </div>
                <Image src={'/tiplink_pic-5.webp'}  alt={'Tiplink Pic'} width={700} height={700} />
              </div>
            </div>
          </section>
          <section className='text-[#007cbf]  h-screen  w-full bg-[#cce5f2]  grid place-content-center sticky top-0 rounded-tr-2xl rounded-tl-2xl'>
          <div className='absolute bottom-0 left-0 right-0 top-0 '>
              <div className='flex justify-center p-20'>
                <Image src={'/tiplink_pic6.webp'} alt={'Tiplink Pic'} width={700} height={700} />
                <div className=' justify-center content-center'>
                  <div className='flex pb-5'>
                    <div className='outline-none rounded-2xl text-[#007cbf] bg-sky-500 font-bold p-3'>TIPLINK WALLET ADAPTER</div>
                  </div>
                  <h1 className='text-6xl font-bold pb-5'>Making Solana apps consumer-ready</h1>
                  <h3 className='text-xl pb-5'>Let your users login with just a Google account and start signing transactions.</h3>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
    </ReactLenis>
  );
}