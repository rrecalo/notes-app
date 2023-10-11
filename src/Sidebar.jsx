import React, {useEffect, useState} from 'react';
import {AiOutlineFileText, AiOutlinePlus} from 'react-icons/ai';

const Sidebar = ({initializeNewNote, renderNoteList, newNoteCooldown, ...props}) => {

  const [isHoveringAdd, setIsHoveringAdd] = useState(false);
  const [confirmAdd, setConfirmAdd] = useState(false);
  
  useEffect(()=>{
    if(confirmAdd){
      const confirmAddTimeout = setTimeout(()=>{
        setConfirmAdd(false)
      }, 2000);
      return () => clearInterval(confirmAddTimeout);
    }
  },[confirmAdd]);

  function handleNewNoteClick(event){
    event.preventDefault();
    if(!confirmAdd){
      setConfirmAdd(true);
    }
    else{
      initializeNewNote();
    }
  }

  return (
    <div id="sidebar" className='sm:w-1/4 lg:w-1/6 h-full bg-stone-50 flex flex-col justify-start items-center pt-10'>
          {/*
          !isAuthenticated ? <LoginButton /> : 
          <div id="logout_functions" className="p-2">
          <div className='text-base pb-4 font-semibold'>Logged in</div>
          <div className='text-base cursor-pointer text-center bg-stone-200 hover:bg-stone-300' onClick={() => 
            logout(
              { 
                logoutParams: {returnTo: window.location.origin}
              }
              )
            }>Logout?</div>
          </div>
          */}
          <div id="your-notes-section" className='flex flex-col justify-center items-start gap-1 mt-5 w-full'>
            <div className='flex flex-row items-center text-lg text-stone-800 text-left gap-1 pl-3'>
              <div>
                <AiOutlineFileText className='text-stone-500 w-5 h-5'/>
              </div>
              <div className='font-normal text-xl text-stone-800'>
                Your Notes
              </div>
            </div>
          {
            renderNoteList()
          }
          </div>
          <div onClick={handleNewNoteClick} 
            onMouseEnter={() => setIsHoveringAdd(true)}
            onMouseLeave={() => {setIsHoveringAdd(false); setConfirmAdd(false)}}
            className={`flex h-[20%] w-[100%] p-5 justify-center items-start ${newNoteCooldown ? 'display-none' : ''}`}>
             {
              isHoveringAdd  && !newNoteCooldown  ? 
                <AiOutlinePlus/>
                : 
                <></>
            }
          </div>
        </div>
  )
}

export default Sidebar