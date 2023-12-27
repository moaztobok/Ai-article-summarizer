import React from 'react'
import {logo} from '../assets';
const Hero = () => {
  return (
    <header className='w-full flex bgè- justiify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>
        <img src={logo} alt='sumAi-logo' className='w-28 object-contain'/>
        <button type='button' onClick={()=> window.open('https://github.com/moaztobok')} className='black_btn'>
          Github
        </button>
      </nav>
      <h1 className='head_text'>
      Summarize Articles with <br className='max-md:hidden'/>
        <span className='orange_gradient'>
          OpenAi GPT-4
        </span>
      </h1>
      <h2 className='desc'>
      Summarize lenghy articles with this amazing open-source tool using Artificial Intelligence
      </h2>
    </header>
  )
}

export default Hero